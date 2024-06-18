import MongooseService from "../../../services/MongooseService";
import TaskModel from "../../../models/TaskModel";
import type TaskInterface from "../../../interfaces/TaskInterface";
import { v4 as uuid } from "uuid";
import "dotenv/config";

describe("Testing task model", () => {
	beforeAll(() => {
		MongooseService.connect();
	});

	const task: TaskInterface = {
		taskID: uuid(),
		projectID: uuid(),
		name: "Test Task",
		isDone: false,
	};

	const updatedTask = {
		name: "Updated Test Task",
		isDone: true,
	};

	test("Create task", async () => {
		const taskData: TaskInterface = await TaskModel.create(task);

		expect(taskData.taskID).toBe(task.taskID);
		expect(taskData.projectID).toBe(task.projectID);
		expect(taskData.name).toBe(task.name);
		expect(taskData.isDone).toBe(task.isDone);
	});

	test("Get task by ID", async () => {
		const taskData: TaskInterface = (await TaskModel.findOne({
			taskID: task.taskID,
		})) as TaskInterface;

		expect(taskData.taskID).toBe(task.taskID);
		expect(taskData.projectID).toBe(task.projectID);
		expect(taskData.name).toBe(task.name);
		expect(taskData.isDone).toBe(task.isDone);
	});

	test("Update task by ID", async () => {
		const taskData: TaskInterface = (await TaskModel.findOneAndUpdate(
			{
				taskID: task.taskID,
			},
			updatedTask,
			{ new: true },
		)) as TaskInterface;

		expect(taskData.taskID).toBe(task.taskID);
		expect(taskData.projectID).toBe(task.projectID);
		expect(taskData.name).toBe(updatedTask.name);
		expect(taskData.isDone).toBe(updatedTask.isDone);
	});

	test("Delete task by ID", async () => {
		const taskData: TaskInterface = (await TaskModel.findOneAndDelete({
			taskID: task.taskID,
		})) as TaskInterface;

		expect(taskData.taskID).toBe(task.taskID);
		expect(taskData.projectID).toBe(task.projectID);
		expect(taskData.name).toBe(updatedTask.name);
		expect(taskData.isDone).toBe(updatedTask.isDone);
	});

	afterAll( async () => {
		await TaskModel.deleteMany({
			taskID: task.taskID,
		});
		MongooseService.disconnect();
	});
});
