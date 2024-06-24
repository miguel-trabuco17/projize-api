import server from "../../app";
import request from "supertest";
import { disconnectDatabase } from "../../services/mongooseService";

describe("Testing app.ts", () => {
	test("Testing app.ts", async () => {
		const response = await request(server).get("/");
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ status: "working" });
	});

	afterAll((done) => {
		server.close(done);
		disconnectDatabase();
	});
});
