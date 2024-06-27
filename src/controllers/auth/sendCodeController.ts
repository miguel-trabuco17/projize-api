import lodash from "lodash";
import type { Request, Response } from "express";
import UserModel from "../../models/UserModel";
import VerificationCodeModel from "../../models/VerificationCodeModel";
import sendEmailService from "../../services/sendEmailService";
import type UserInterface from "../../interfaces/UserInterface";
import type VerificationCodeInterface from "../../interfaces/VerificationCodeInterface";

export default class SendCodeController {
	public async handle(req: Request, res: Response): Promise<Response> {
		const { email }: { email: string } = req.body;

		if (!email) {
			return res.status(400).json({ message: "Email is required" });
		}

		const userDocument: UserInterface | null = await UserModel.findOne({
			email,
		});

		if (userDocument) {
			return res.status(400).json({ message: "Email already used" });
		}

		const verificationCodeDocument: VerificationCodeInterface | null =
			await VerificationCodeModel.findOne({ email });

		const code: string = lodash.random(100000, 999999).toString();

		if (verificationCodeDocument) {
			await VerificationCodeModel.updateOne({ email }, { code });
		} else {
			await VerificationCodeModel.create({ email, code });
		}

		sendEmailService();

		return res.status(200).json({ message: "Code sent" });
	}
}
