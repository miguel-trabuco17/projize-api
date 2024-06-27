import request from "supertest";
import MongooseService from "../../../services/MongooseService";
import VerificationCodeModel from "../../../models/VerificationCodeModel";
import server from "../../../app";
import UserModel from "../../../models/UserModel";
import type UserInterface from "../../../interfaces/UserInterface";

describe("Test send code route", () => {
	const mongooseService = new MongooseService();

	const email: string = "user@email.com";

	beforeAll(async () => {
		await mongooseService.connectDatabase();
	});

	afterAll(async () => {
		await VerificationCodeModel.deleteMany({ email });
		await UserModel.deleteMany({ email });
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

	test("POST /send-code without email", async () => {
		const response = await request(server).post("/auth/send-code");

		expect(response.status).toBe(400);
		expect(response.body.message).toBe("Email is required");
	});

	test("POST /send-code with email already used", async () => {
		const userData: UserInterface = {
			email,
			name: "User",
			passwordHash: "password",
			userID: "userID",
			sessions: [],
		};

		await UserModel.create(userData);

		const response = await request(server)
			.post("/auth/send-code")
			.send({ email });

		expect(response.status).toBe(400);
		expect(response.body.message).toBe("Email already used");
	});
});
