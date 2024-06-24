import "dotenv/config";
import { createToken, verifyToken } from "../../../services/jwtService";
import { v4 as uuid } from "uuid";
import type { JwtPayload } from "jsonwebtoken";

describe("Test jwt service", () => {
	let token: string | null;
	const userID: string = uuid();

	test("Generate token", () => {
		token = createToken(userID);
		expect(token).not.toBeNull();
	});

	test("Decode token", () => {
		let decodedToken: JwtPayload | string = "";

		try {
			decodedToken = verifyToken(token as string);
		} catch (error) {
			decodedToken = "";
		}

		expect(decodedToken).not.toBe("");
	});

	test("Decode invalid token", () => {
		let decodedToken: JwtPayload | string = "";

		try {
			decodedToken = verifyToken("invalid token");
		} catch (error) {
			decodedToken = "";
		}

		expect(decodedToken).toBe("");
	});
});
