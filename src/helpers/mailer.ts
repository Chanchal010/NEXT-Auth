import User from "@/models/user.models";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({email, emailType, userId}:any) => {
    
    try {

        // configure mail for usage

        const hashedToken = await bcryptjs.hashSync(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordExpiry: Date.now() + 3600000
                }
            })
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "f905de59777e45",
              pass: "ab797bb28d5d7d"
            }
          });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: emailType === "VERIFY" ? "Verify your Email" : "Forgot Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail ? token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste this link in your browser.
            <br> ${process.env.DOMAIN}/verifyemail ? token=${hashedToken}
            </p>`
        };

        const mailResponse =  await transport.sendMail(mailOptions);

        return mailResponse
    } catch (error) {
        console.log(error);
    }
}