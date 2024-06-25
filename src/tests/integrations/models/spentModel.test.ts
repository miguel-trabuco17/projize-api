import "dotenv/config";
import SpentModel from "../../../models/SpentModel";
import type SpentInterface from "../../../interfaces/SpentInterface";
import MongooseService from "../../../services/MongooseService";

describe("Test spent model", () => {
	const spentData: SpentInterface = {
		amount: 100,
		date: new Date(),
		name: "Spent test",
		projectID: "projectID",
		spentID: "spentID",
	};

	const mongooseService = new MongooseService();

	beforeAll(async () => {
		await mongooseService.connectDatabase();
	});

	afterAll(async () => {
		await SpentModel.deleteMany({ name: spentData.name });
		await mongooseService.disconnectDatabase();
	});

	test("Create spent", async () => {
		const spentDocument: SpentInterface = await SpentModel.create(spentData);

		expect(spentDocument).toBeDefined();
        expect(spentDocument.amount).toEqual(spentData.amount);
        expect(spentDocument.date).toEqual(spentData.date);
        expect(spentDocument.name).toEqual(spentData.name);
        expect(spentDocument.projectID).toEqual(spentData.projectID);
        expect(spentDocument.spentID).toEqual(spentData.spentID);
	});
});
