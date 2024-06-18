import MongooseService from "../../../services/MongooseService";
import ProjectModel from "../../../models/ProjectModel";
import type ProjectInterface from "../../../interfaces/ProjectInterface";
import { v4 as uuid } from "uuid";
import "dotenv/config";

describe("Testing Project Model", () => {
	beforeAll(async () => {
		await MongooseService.connect();
	});

	const project: ProjectInterface = {
		projectID: uuid(),
		ownerID: uuid(),
		name: "Test Project",
		description: "This is a test project",
		budget: 1000,
		usersID: [uuid(), uuid()],
	};

	const projectUpdate = {
		name: "Updated Test Project",
	};

	test("Create project", async () => {
		const projectData: ProjectInterface = await ProjectModel.create(project);

		expect(projectData.projectID).toBe(project.projectID);
		expect(projectData.ownerID).toBe(project.ownerID);
		expect(projectData.name).toBe(project.name);
		expect(projectData.description).toBe(project.description);
		expect(projectData.budget).toBe(project.budget);
		expect(projectData.usersID).toEqual(project.usersID);
	});

	test("Get project by ID", async () => {
		const projectData: ProjectInterface = (await ProjectModel.findOne({
			projectID: project.projectID,
		})) as ProjectInterface;

		expect(projectData.projectID).toBe(project.projectID);
		expect(projectData.ownerID).toBe(project.ownerID);
		expect(projectData.name).toBe(project.name);
		expect(projectData.description).toBe(project.description);
		expect(projectData.budget).toBe(project.budget);
		expect(projectData.usersID).toEqual(project.usersID);
	});

	test("Update project by ID", async () => {
		const projectData: ProjectInterface = (await ProjectModel.findOneAndUpdate(
			{
				projectID: project.projectID,
			},
			projectUpdate,
			{ new: true },
		)) as ProjectInterface;

		expect(projectData.projectID).toBe(project.projectID);
		expect(projectData.ownerID).toBe(project.ownerID);
		expect(projectData.name).toBe(projectUpdate.name);
		expect(projectData.description).toBe(project.description);
		expect(projectData.budget).toBe(project.budget);
		expect(projectData.usersID).toEqual(project.usersID);
	});

	test("Delete project by ID", async () => {
		const projectData: ProjectInterface = (await ProjectModel.findOneAndDelete({
			projectID: project.projectID,
		})) as ProjectInterface;

		expect(projectData.projectID).toBe(project.projectID);
		expect(projectData.ownerID).toBe(project.ownerID);
		expect(projectData.name).toBe(projectUpdate.name);
		expect(projectData.description).toBe(project.description);
		expect(projectData.budget).toBe(project.budget);
		expect(projectData.usersID).toEqual(project.usersID);
	});

	afterAll(async () => {
		await ProjectModel.deleteMany({
			projectID: project.projectID,
		});
		await MongooseService.disconnect();
	});
});
