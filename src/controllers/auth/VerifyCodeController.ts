import VerificationCodeModel from "../../models/VerificationCodeModel";
import type VerificationCodeInterface from "../../interfaces/VerificationCodeInterface";
import type { Request, Response } from "express";

export default class VerifyCodeController {
	public async handle(req: Request, res: Response): Promise<Response> {
		const code: string = req.body.code;

		if (!code) {
			return res.status(400).json({ message: "Code is required" });
		}

		const verificationCodeDocument: VerificationCodeInterface | null =
			await VerificationCodeModel.findOne({ code });

		if (!verificationCodeDocument) {
			return res.status(400).json({ message: "Invalid code" });
		}

		if (verificationCodeDocument.verified) {
			return res.status(200).json({ message: "Verified" });
		}

		await VerificationCodeModel.updateOne({ code }, { verified: true });

		return res.status(200).json({ message: "Verified" });
	}
}
