import "dotenv/config";
import JwtService from "../../services/JwtService";

describe("Test token functions of jsonwebtoken service", () => {
	let token: string;
	const payload = "test";
	const jwtService = new JwtService();

	test("Create token", () => {
		token = jwtService.createToken(payload);
		expect(token).toBeDefined();
	});

	test("Decode token", () => {
		const decoded: string = jwtService.decodeToken(token);
		expect(decoded).toBeDefined();
		expect(decoded).toEqual(payload);
	});
});
