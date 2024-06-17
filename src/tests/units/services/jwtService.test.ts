import "dotenv/config";
import JwtService from "../../../services/JwtService";
import { v4 as uuid } from "uuid";
import type { JwtPayload } from "jsonwebtoken";

describe("Test jwt service", () => {
	let token: string | null;
	const userID: string = uuid();

	test("Generate token", () => {
		token = JwtService.generateToken(userID);
		expect(token).not.toBeNull();
	});

	test("Decode token", () => {
		const decodedToken: JwtPayload | null = JwtService.decodeToken(
			token as string,
		);
		expect(decodedToken).not.toBeNull();
	});

	test("Decode invalid token", () => {
		const decodedToken = JwtService.decodeToken("invalid token");
		expect(decodedToken).toBeNull();
	});
});
