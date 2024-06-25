import "dotenv/config";
import ProjectModel from "../../../models/ProjectModel";
import type ProjectInterface from "../../../interfaces/ProjectInterface";
import MongooseService from "../../../services/MongooseService";

describe("Test project model", () => {
	const projectData: ProjectInterface = {
		name: "Project test",
		ownerID: "ownerID",
		projectID: "projectID",
		budget: 1000,
		description: "Project description",
		usersID: ["user1", "user2"],
	};

	const mongooseService = new MongooseService();

	beforeAll(async () => {
		await mongooseService.connectDatabase();
	});

	afterAll(async () => {
		await ProjectModel.deleteMany({ name: projectData.name });
		await mongooseService.disconnectDatabase();
	});

	test("Create project", async () => {
		const projectDocument: ProjectInterface = await ProjectModel.create(projectData);

		expect(projectDocument).toBeDefined();
		expect(projectDocument.name).toEqual(projectData.name);
		expect(projectDocument.ownerID).toEqual(projectData.ownerID);
		expect(projectDocument.projectID).toEqual(projectData.projectID);
		expect(projectDocument.budget).toEqual(projectData.budget);
		expect(projectDocument.description).toEqual(projectData.description);
		expect(projectDocument.usersID).toEqual(projectData.usersID);
	});
});
