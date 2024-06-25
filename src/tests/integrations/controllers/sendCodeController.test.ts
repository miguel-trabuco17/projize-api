import request from "supertest";
import MongooseService from "../../../services/MongooseService";
import VerificationCodeModel from "../../../models/VerificationCodeModel";
import server from "../../../app";

describe("Test send code controller", () => {
	const mongooseService = new MongooseService();

	const email: string = "user@email.com";

	beforeAll(async () => {
		await mongooseService.connectDatabase();
	});

	afterAll(async () => {
		await VerificationCodeModel.deleteMany({ email });
		await mongooseService.disconnectDatabase();
		server.close();
	});

	test("POST /send-code", async () => {
		const response = await request(server)
			.post("/auth/send-code")
			.send({ email });

		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Code sent");
	});
});
