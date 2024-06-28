import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import UserModel from "../../models/UserModel";
import VerificationCodeModel from "../../models/VerificationCodeModel";
import type { Request, Response } from "express";
import type UserInterface from "../../interfaces/UserInterface";
import type VerificationCodeInterface from "../../interfaces/VerificationCodeInterface";
import JwtService from "../../services/JwtService";

export default class CreateUserController {
	public async handle(request: Request, response: Response): Promise<Response> {
		const {
			email,
			name,
			password,
		}: { email: string; name: string; password: string } = request.body;

		if (!email || !name || !password) {
			return response.status(400).json({
				message: "Email, name and password are required",
			});
		}

		const verificationCodeDocument: VerificationCodeInterface | null =
			await VerificationCodeModel.findOne({
				email,
			});

		if (
			!verificationCodeDocument ||
			verificationCodeDocument.verified === false
		) {
			return response.status(400).json({
				message: "Email not verified",
			});
		}

		const userDocument: UserInterface | null = await UserModel.findOne({
			email,
		});

		if (userDocument) {
			return response.status(400).json({
				message: "Email already used",
			});
		}

		if (password.length < 8) {
			return response.status(400).json({
				message: "Password must have at least 8 characters",
			});
		}

		const passwordHash: string = await bcrypt.hash(password, 10);
		const userID = uuid();

		const jwtService = new JwtService();
		const token: string = jwtService.createToken(userID);

		const userData: UserInterface = {
			email,
			name,
			passwordHash,
			userID,
			sessions: [token],
		};

		await UserModel.create(userData);
		await VerificationCodeModel.updateOne({ email }, { userID });

		return response.status(201).json({
			token,
		});
	}
}
