// modules
import { Resend } from "resend";
import chalk from "chalk";
// constants
import { RESEND_API_KEY } from "@/config/env";

export const resend = new Resend(RESEND_API_KEY);

export const connectResend = async () => {
    const { error } = await resend.domains.list();
    if (error) {
        console.log(chalk.bgRed.bold("Resend initialization failed:", error.message));
    } else {
        console.log(chalk.bgGreen.bold("Resend is ready to send emails."));
    }
};