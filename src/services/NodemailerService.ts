import type { Transporter } from "nodemailer";
import { createTransport } from "nodemailer";

export default class NodemailerService {
	private transporter: Transporter = createTransport({
		host: "smtp.mailgun.org",
		port: 587,
		secure: false,
		auth: {
			user: process.env.MAILGUN_USER as string,
			pass: process.env.MAILGUN_PASSWORD as string,
		},
	});

	public async sendEmail({
		body,
		subject,
		email,
	}: { body: string; subject: string; email: string }) {
		try {
			await this.transporter.sendMail({
				from: '"Projize" <noreply@projize.me>',
				to: email,
				subject: subject,
				html: body,
			});
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
}
