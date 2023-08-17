import nodemailer from "nodemailer"

import User from "@/models/userModel"

import bcryptjs from "bcryptjs"

export const sendMail = async ({ email, emailType, userId }: any) => {
    try {
        // create hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        const obj = {}
        const tokenExpiry = Date.now() + 3600000
        if (emailType === "VERIFY") {
            obj["verifyToken"] = hashedToken
            obj["verifyTokenExpiry"] = tokenExpiry
        } else if (emailType === "RESET") {
            obj["forgotPasswordToken"] = hashedToken
            obj["forgotPasswordTokenExpiry"] = tokenExpiry
        }

        await User.findOneAndUpdate(userId, { ...obj })

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "bf37a63b100c3b",
                pass: "89ca12b5ae661a"
            }
        });

        const mailOptions = {
            from: "umershuja12@gmail.com",
            to: email,
            subject: emailType === "RESET" ? "Reset your password" : "Verify your email",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "RESET" ? "Reset your password" : "Verify your email"}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions)

        return mailResponse

    } catch (error: any) {
        throw new Error(error.message)

    }

}

