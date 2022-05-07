import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "82c173d78a2f20",
    pass: "a4ef350a3dcb6c"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject,body}: SendMailData){
    await transport.sendMail({
      from:'Equipe Feedget <oi@feedget.com>',
      to:'Nicolas Moreno Alves Medeiros <nicolas.morenoam@outlook.com>',
      subject,
      html:body, 
    })
  }
}