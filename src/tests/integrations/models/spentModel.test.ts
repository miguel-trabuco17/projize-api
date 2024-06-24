import type SpentInterface from "../../../interfaces/SpentInterface";
import SpentModel from "../../../models/SpentModel";
import {
	connectDatabase,
	disconnectDatabase,
} from "../../../services/mongooseService";
import { v4 as uuid } from "uuid";
import "dotenv/config";

describe("Testing spent model", () => {
	beforeAll(() => {
		connectDatabase();
	});

	const spent: SpentInterface = {
		spentID: uuid(),
		projectID: uuid(),
		amount: 100,
		name: "Test Spent",
		date: new Date(),
	};

	const updatedSpent = {
		name: "Updated Test Spent",
	};

	test("Create spent", async () => {
		const spentData: SpentInterface = await SpentModel.create(spent);

		expect(spentData.spentID).toBe(spent.spentID);
		expect(spentData.projectID).toBe(spent.projectID);
		expect(spentData.amount).toBe(spent.amount);
		expect(spentData.name).toBe(spent.name);
		expect(spentData.date).toEqual(spent.date);
	});

	test("Get spent by ID", async () => {
		const spentData: SpentInterface = (await SpentModel.findOne({
			spentID: spent.spentID,
		})) as SpentInterface;

		expect(spentData.spentID).toBe(spent.spentID);
		expect(spentData.projectID).toBe(spent.projectID);
		expect(spentData.amount).toBe(spent.amount);
		expect(spentData.name).toBe(spent.name);
		expect(spentData.date).toEqual(spent.date);
	});

	test("Update spent by ID", async () => {
		const spentData: SpentInterface = (await SpentModel.findOneAndUpdate(
			{
				spentID: spent.spentID,
			},
			updatedSpent,
			{ new: true },
		)) as SpentInterface;

		expect(spentData.spentID).toBe(spent.spentID);
		expect(spentData.projectID).toBe(spent.projectID);
		expect(spentData.amount).toBe(spent.amount);
		expect(spentData.name).toBe(updatedSpent.name);
		expect(spentData.date).toEqual(spent.date);
	});

	test("Delete spent by ID", async () => {
		const spentData: SpentInterface = (await SpentModel.findOneAndDelete({
			spentID: spent.spentID,
		})) as SpentInterface;

		expect(spentData.spentID).toBe(spent.spentID);
		expect(spentData.projectID).toBe(spent.projectID);
		expect(spentData.amount).toBe(spent.amount);
		expect(spentData.name).toBe(updatedSpent.name);
		expect(spentData.date).toEqual(spent.date);
	});

	afterAll(async () => {
		await SpentModel.deleteMany({
			spentID: spent.spentID,
		});
		disconnectDatabase();
	});
});
