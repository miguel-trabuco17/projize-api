import mongoose from "mongoose";
import type ProjectInterface from "../interfaces/ProjectInterface";

const projectSchema = new mongoose.Schema<ProjectInterface>({
	projectID: { type: String, required: true },
	ownerID: { type: String, required: true },
	usersID: { type: [String], required: false },
	name: { type: String, required: true },
	description: { type: String, required: false },
	budget: { type: Number, required: false },
});

const ProjectModel = mongoose.model<ProjectInterface>("Project", projectSchema);
export default ProjectModel;
