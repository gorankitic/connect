export const parseCookies = (cookieHeader?: string): Record<string, string> => {
    const output: Record<string, string> = {};

    if (!cookieHeader) return output;

    for (const part of cookieHeader.split(";")) {
        const [key, ...rest] = part.trim().split("=");
        if (!key) continue;
        output[key] = decodeURIComponent(rest.join("=") ?? "");
    }

    return output;
}