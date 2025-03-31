"use server"

import nodemailer from "nodemailer";

export const Emailhandler = async (
    name: string,
    email: string,
    phoneNumber: number | string,
    service: string,
    message: string
) => {
    if (!name || !email || !message || !phoneNumber) {
        return { message: "Please fill in all fields" };
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from:  `"Emacs Creation" - <${email}>`,
            to: "emmazwagmuchui@gmail.com",
            replyTo: email,
            subject: "New Contact Request",
            text: `You have a new contact request:\n\nName: ${name}\nEmail: ${email}\nPhone Number: +254${phoneNumber}\nService: ${service}\nMessage: ${message}`,
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Phone Number:</strong> +254${phoneNumber}</p>
                   <p><strong>Service:</strong> ${service}</p>
                   <p><strong>Message:</strong> ${message}</p>`,
        });

        console.log("Email sent successfully!");
        return { status: "success", message: "Email sent successfully!" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { status: "error", message: "Failed to send email" };
    }
};