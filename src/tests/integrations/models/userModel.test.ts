import "dotenv/config";
import UserModel from "../../../models/UserModel";
import type UserInterface from "../../../interfaces/UserInterface";
import MongooseService from "../../../services/MongooseService";

describe("Test user model", () => {
	const userData: UserInterface = {
		email: "user@email.com",
		name: "User test",
		passwordHash: "passwordHash",
		userID: "userID",
		sessions: ["session1", "session2"],
	};

	const mongooseService = new MongooseService();

	beforeAll(async () => {
		await mongooseService.connectDatabase();
	});

	afterAll(async () => {
		await UserModel.deleteMany({ name: userData.name });
		await mongooseService.disconnectDatabase();
	});

	test("Create user", async () => {
		const userDocument: UserInterface = await UserModel.create(userData);

		expect(userDocument).toBeDefined();
		expect(userDocument.email).toEqual(userData.email);
		expect(userDocument.name).toEqual(userData.name);
		expect(userDocument.passwordHash).toEqual(userData.passwordHash);
		expect(userDocument.userID).toEqual(userData.userID);
		expect(userDocument.sessions).toEqual(userData.sessions);
	});
});
