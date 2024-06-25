import "dotenv/config";
import request from "supertest";
import server from "../../app";
import MongooseService from "../../services/MongooseService";

describe("Test app", () => {
	afterAll(async () => {
		const mongooseService = new MongooseService();
		await mongooseService.disconnectDatabase();
		server.close();
	});

	test("GET /", async () => {
		const response = await request(server).get("/");

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			status: "working",
		});
	});
});
