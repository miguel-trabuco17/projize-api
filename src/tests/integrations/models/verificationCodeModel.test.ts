import MongooseService from "../../../services/MongooseService";
import VerificationCodeModel from "../../../models/VerificationCodeModel";
import "dotenv/config";
import type VerificationCodeInterface from "../../../interfaces/VerificationCodeInterface";

describe("Test verification code model", () => {
	beforeAll(() => {
		MongooseService.connect();
	});

	afterAll(() => {
		MongooseService.disconnect();
	});

	const verificationCode = {
		code: "123456",
		email: "user@email.com",
	};

	const updatedVerificationCode = {
		code: "123457",
	};

	test("Create a verification code", async () => {
		const verificationCodeData =
			await VerificationCodeModel.create(verificationCode);

		expect(verificationCodeData.code).toBe(verificationCode.code);
		expect(verificationCodeData.email).toBe(verificationCode.email);
	});

	test("Find a verification code", async () => {
		const verificationCodeData = (await VerificationCodeModel.findOne({
			email: verificationCode.email,
		})) as VerificationCodeInterface;

		expect(verificationCodeData.code).toBe(verificationCode.code);
		expect(verificationCodeData.email).toBe(verificationCode.email);
	});

	test("Update a verification code", async () => {
		const verificationCodeData = (await VerificationCodeModel.findOneAndUpdate(
			{
				email: verificationCode.email,
			},
			updatedVerificationCode,
			{ new: true },
		)) as VerificationCodeInterface;
	});

	test("Delete a verification code", async () => {
		const verificationCodeData = (await VerificationCodeModel.findOneAndDelete({
			email: verificationCode.email,
		})) as VerificationCodeInterface;
	});
});
