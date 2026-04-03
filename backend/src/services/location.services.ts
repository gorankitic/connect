import { Request } from "express";

export const getLocation = async (req: Request) => {
    console.error("HERE START: ")
    try {
        let ip =
            (req.headers["cf-connecting-ip"] as string) ||
            (req.headers["x-real-ip"] as string) ||
            (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
            req.ip || "";

        if (ip === "::1") ip = "127.0.0.1";

        console.log("Detected IP:", ip);

        // Comment this out while testing locally
        // if (ip.startsWith("127.") || ip.startsWith("10.") || ip.startsWith("192.168.")) {
        //     console.log("Skipping private IP check...");
        //     return null;
        // }

        // When testing locally, ip-api will return info for mine router's public IP
        // if you call it with a blank IP, or it might fail for 127.0.0.1.  
        // For testing locally, you can force a public IP:
        const fetchIp = (ip === "127.0.0.1") ? "31.223.129.87" : ip;
        console.log("FETCHIP: ", fetchIp);

        const response = await fetch(`http://ip-api.com/json/${fetchIp}`);
        const data = await response.json();

        const location = data.city && data.country && data.regionName ? `${data.city}, ${data.regionName}, ${data.country}` : null;

        return { location, ip };
    } catch (err) {
        console.error("Location error:", err);
        return null;
    }
};
