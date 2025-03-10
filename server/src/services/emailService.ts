import dotenv from "dotenv";
import nodemailer from 'nodemailer';

dotenv.config();

export class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: Number(process.env.MAILTRAP_PORT),
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });
    }

    async sendConfirmationEmail(email: string, fullName: string): Promise<void> {
        const mailOptions = {
            from: '"Patient Registration" <noreply@patients.com>',
            to: email,
            subject: "Patient Registration Successful",
            text: `Hello ${fullName},\n\nYour patient registration was successful!`,
            html: `<p>Hello <strong>${fullName}</strong>,</p><p>Your patient registration was successful!</p>`
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Confirmation email sent to ${email}`);
        } catch (error) {
            console.error("Error sending email:", error);
        }
    }
};
