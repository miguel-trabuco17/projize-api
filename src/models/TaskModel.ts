import mongoose from "mongoose";
import type TaskInterface from "../interfaces/TaskInterface";

const TaskSchema = new mongoose.Schema<TaskInterface>({
	taskID: { type: String, required: true },
	projectID: { type: String, required: true },
	name: { type: String, required: true },
	isDone: { type: Boolean, required: true, default: false },
});

const TaskModel = mongoose.model<TaskInterface>("Task", TaskSchema);
export default TaskModel;
