import type { Request, Response, NextFunction } from "express";
import VerificationCodeModel from "../models/VerificationCodeModel";
import type VerificationCodeInterface from "../interfaces/VerificationCodeInterface";

export default async function verifyEmailVerification(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const userID: string = req.body.userID;

	if (!userID) {
		return res.status(401).send("Unauthorized");
	}

	const verificationCodeDocument: VerificationCodeInterface | null =
		await VerificationCodeModel.findOne({
			userID,
		});

    if (!verificationCodeDocument || verificationCodeDocument.verified === false) {
        return res.status(400).json({
            message: "Email not verified",
        });
    }

    next();
}
