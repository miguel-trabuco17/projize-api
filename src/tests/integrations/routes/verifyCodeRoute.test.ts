import request from "supertest";
import MongooseService from "../../../services/MongooseService";
import server from "../../../app";
import VerificationCodeModel from "../../../models/VerificationCodeModel";
import type VerificationCodeInterface from "../../../interfaces/VerificationCodeInterface";

describe("Test verify code route", () => {
	const mongooseService = new MongooseService();

	const email: string = "user@email.com";
	const code: string = "123456";

	const codeData: VerificationCodeInterface = {
		email,
		code,
	};

	beforeAll(async () => {
		await mongooseService.connectDatabase();
		await VerificationCodeModel.create(codeData);
	});

	afterAll(async () => {
		await VerificationCodeModel.deleteMany({ email });
		await mongooseService.disconnectDatabase();
		server.close();
	});

	test("POST /verify-code", async () => {
		const response = await request(server)
			.post("/auth/verify-code")
			.send({ code });

		const verificationCodeDocument: VerificationCodeInterface =
			(await VerificationCodeModel.findOne({
				email,
			})) as VerificationCodeInterface;

		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Verified");
		expect(verificationCodeDocument.verified).toBe(true);
	});

	test("POST /verify-code without code", async () => {
		const response = await request(server).post("/auth/verify-code");

		expect(response.status).toBe(400);
		expect(response.body.message).toBe("Code is required");
	});

	test("POST /verify-code with invalid code", async () => {
		const response = await request(server)
			.post("/auth/verify-code")
			.send({ code: "654321" });

		expect(response.status).toBe(400);
		expect(response.body.message).toBe("Invalid code");
	});

	test("POST /verify-code with already verified code", async () => {
		const response = await request(server)
			.post("/auth/verify-code")
			.send({ code });

		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Verified");
	});
});
