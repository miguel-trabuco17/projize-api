import "dotenv/config";
import TaskModel from "../../../models/TaskModel";
import type TaskInterface from "../../../interfaces/TaskInterface";
import MongooseService from "../../../services/MongooseService";

describe("Test task model", () => {
	const taskData: TaskInterface = {
		name: "Task test",
		projectID: "projectID",
		taskID: "taskID",
	};

	const mongooseService = new MongooseService();

	beforeAll(async () => {
		await mongooseService.connectDatabase();
	});

	afterAll(async () => {
		await TaskModel.deleteMany({ name: taskData.name });
		await mongooseService.disconnectDatabase();
	});

	test("Create task", async () => {
		const taskDocument: TaskInterface = await TaskModel.create(taskData);

		expect(taskDocument).toBeDefined();
		expect(taskDocument.name).toEqual(taskData.name);
		expect(taskDocument.projectID).toEqual(taskData.projectID);
		expect(taskDocument.taskID).toEqual(taskData.taskID);
		expect(taskDocument.isDone).toEqual(false);
	});
});
