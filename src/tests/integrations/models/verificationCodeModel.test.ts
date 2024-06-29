import "dotenv/config";
import VerificationCodeModel from "../../../models/VerificationCodeModel";
import type VerificationCodeInterface from "../../../interfaces/VerificationCodeInterface";
import MongooseService from "../../../services/MongooseService";

describe("Test verification code model", () => {
	const verificationCodeData: VerificationCodeInterface = {
		code: "code",
		email: "email",
	};

	const mongooseService = new MongooseService();

	beforeAll(async () => {
		await mongooseService.connectDatabase();
	});

	afterAll(async () => {
		await VerificationCodeModel.deleteMany({
			email: verificationCodeData.email,
		});
		await mongooseService.disconnectDatabase();
	});

	test("Create code", async () => {
		const verificationCodeDocument: VerificationCodeInterface =
			await VerificationCodeModel.create(verificationCodeData);

		expect(verificationCodeDocument).toBeDefined();
		expect(verificationCodeDocument.code).toEqual(verificationCodeData.code);
		expect(verificationCodeDocument.email).toEqual(verificationCodeData.email);
		expect(verificationCodeDocument.verified).toBeFalsy();
	});
});
