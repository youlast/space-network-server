import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Mail from "nodemailer/lib/mailer";

export default class EmailHelper {
  private mail: Mail;
  private emailUser: string;

  public constructor(
    emailHost: string,
    emailPort: number,
    emailUser: string,
    emailPassword: string
  ) {
    this.emailUser = emailUser;

    this.mail = nodemailer.createTransport(
      new SMTPTransport({
        host: emailHost,
        port: emailPort,
        secure: true,
        auth: {
          user: emailUser,
          pass: emailPassword,
        },
      })
    );
  }

  public sendEmail = (
    from: string,
    to: string,
    subject: string,
    html: string
  ): Promise<void> => {
    return this.mail.sendMail({
      from,
      to,
      subject,
      html,
    });
  };

  public getEmailUsername = (): string => {
    return this.emailUser;
  };
}
