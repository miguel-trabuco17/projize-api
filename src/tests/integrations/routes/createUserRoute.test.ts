import request from "supertest";
import UserModel from "../../../models/UserModel";
import VerificationCodeModel from "../../../models/VerificationCodeModel";
import type UserInterface from "../../../interfaces/UserInterface";
import MongooseService from "../../../services/MongooseService";
import server from "../../../app";

describe("Test /create-user route", () => {
	const mongooseService = new MongooseService();

	const email: string = "user@email.com";

	beforeAll(async () => {
		await VerificationCodeModel.create({
			email,
			code: "123456",
			verified: true,
		});
	});

	afterEach(async () => {
		await UserModel.deleteMany({ email });
	});

	afterAll(async () => {
		await UserModel.deleteMany({ email });
		await VerificationCodeModel.deleteMany({ email });
		await mongooseService.disconnectDatabase();
		server.close();
	});

	test("POST /create-user", async () => {
		const response = await request(server).post("/user/create-user").send({
			email,
			name: "User",
			password: "password",
		});

		const userDocument: UserInterface = (await UserModel.findOne({
			email,
		})) as UserInterface;

		expect(response.status).toBe(201);
		expect(response.body.token).toBeDefined();
		expect(userDocument).toBeDefined();
		expect(userDocument.email).toBe(email);
		expect(userDocument.name).toBe("User");
		expect(userDocument.passwordHash).not.toBe("password");
	});

	test("POST /create-user without email", async () => {
		const response = await request(server).post("/user/create-user").send({
			name: "User",
			password: "password",
		});

		expect(response.status).toBe(400);
		expect(response.body.message).toBe("Email, name and password are required");
	});

	test("POST /create-user with unverified email", async () => {
		await VerificationCodeModel.updateOne({ email }, { verified: false });

		const response = await request(server).post("/user/create-user").send({
			email,
			name: "User",
			password: "password",
		});

		expect(response.status).toBe(400);
		expect(response.body.message).toBe("Email not verified");

		await VerificationCodeModel.updateOne({ email }, { verified: true });
	});

	test("POST /create-user with short password", async () => {
		const response = await request(server).post("/user/create-user").send({
			email,
			name: "User",
			password: "123",
		});

		expect(response.status).toBe(400);
		expect(response.body.message).toBe(
			"Password must have at least 8 characters",
		);
	});

	test("POST /create-user with existing email", async () => {
		await UserModel.create({
			email,
			name: "User",
			passwordHash: "password",
			userID: "123",
			sessions: ["token"],
		});

		const response = await request(server).post("/user/create-user").send({
			email,
			name: "User",
			password: "password",
		});

		expect(response.status).toBe(400);
		expect(response.body.message).toBe("Email already used");
	});
});
