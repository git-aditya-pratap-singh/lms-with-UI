import nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer';
import { readFileSync, existsSync } from 'fs';
import dotenv from "dotenv";

interface Attachment{
    PATH: string;
    NAME: string;
}
dotenv.config();

class NewMailFunctions {

    newSmtpMail = async(
        ToEmail: string,
        subject: string,
        MessageHTML: string,
        ToCCMail: string | null = null,
        Attach: Attachment[] | null = null,
        FromNm: string | null = null,
        testing: boolean = false
    ): Promise<boolean> =>{
        
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.NOTIFICATION_USERNAME || '',
                pass: process.env.NOTIFICATION_PASSWORD || ''
            }
        });

        let mailOptions: nodemailer.SendMailOptions = {
            from: FromNm ? `"${FromNm}" <singhadityapratap272@gmail.com>` : '"elearn" <singhadityapratap272@gmail.com>',
            subject: subject,
            html: MessageHTML
        };

        if (testing) {
            ToEmail = 'aps08072001@gmail.com';
            ToCCMail = '';
            mailOptions.subject = `(Testing Mail) : ${subject}`;
            mailOptions.html = `
                <div style='border: #cccccc thin solid;'>
                    <p>This part will not be included in the Original Mail.</p>
                    This email would be sent to: ${ToEmail}<br>
                    CcMail to: ${ToCCMail}
                </div>
                <br>--------------------------------------------------------------------------------------------------------<br><br><br>
                ${MessageHTML}`;
            mailOptions.to = 'aps08072001@gmail.com';
        } else {
            mailOptions.to = ToEmail.split(',').map(email => email.trim());

            if (ToCCMail) {
                mailOptions.cc = ToCCMail.split(',').map(email => email.trim());
            }
        }

        if (Attach && Array.isArray(Attach)) {
            mailOptions.attachments = Attach.map(file => {
                if (!existsSync(file.PATH)) {
                    console.error(`File Does not Exist: ${file.PATH} => ${file.NAME}`);
                }
                return {
                    filename: file.NAME,
                    path: file.PATH
                };
            });
        }

        try {
            const info: SentMessageInfo = await transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            return false;
        }
    }
}

export default NewMailFunctions;
