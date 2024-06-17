import MongooseService from "../../../services/MongooseService";
import UserModel from "../../../models/UserModel";
import type UserInterface from "../../../interfaces/UserInterface";
import "dotenv/config";
import { v4 as uuid } from "uuid";

describe("Testing user model", () => {
	beforeAll(() => {
		MongooseService.connect();
	});

	afterAll(() => {
		MongooseService.disconnect();
	});

	const user: UserInterface = {
		userID: uuid(),
		name: "User Name",
		email: "username@email.com",
		passwordHash: "password",
		sessions: ["session1", "session2"],
	};

	const updatedUser = { name: "Updated User Name" };

	test("Create user", async () => {
		const userData: UserInterface = await UserModel.create(user);

		expect(userData.userID).toBe(user.userID);
		expect(userData.name).toBe(user.name);
		expect(userData.email).toBe(user.email);
		expect(userData.passwordHash).toBe(user.passwordHash);
		expect(userData.sessions).toEqual(user.sessions);
	});

	test("Get user by ID", async () => {
		const userData: UserInterface = (await UserModel.findOne({
			userID: user.userID,
		})) as UserInterface;

		expect(userData.userID).toBe(user.userID);
		expect(userData.name).toBe(user.name);
		expect(userData.email).toBe(user.email);
		expect(userData.passwordHash).toBe(user.passwordHash);
		expect(userData.sessions).toEqual(user.sessions);
	});

	test("Update user by UD", async () => {
		const userData: UserInterface = (await UserModel.findOneAndUpdate(
			{ userID: user.userID },
			updatedUser,
			{ new: true },
		)) as UserInterface;

		expect(userData.userID).toBe(user.userID);
		expect(userData.name).toBe(updatedUser.name);
		expect(userData.email).toBe(user.email);
		expect(userData.passwordHash).toBe(user.passwordHash);
		expect(userData.sessions).toEqual(user.sessions);
	});

	test("Delete user by ID", async () => {
		const userData: UserInterface = (await UserModel.findOneAndDelete({
			userID: user.userID,
		})) as UserInterface;

		expect(userData.userID).toBe(user.userID);
	});
});
