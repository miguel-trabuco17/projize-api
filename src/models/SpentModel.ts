import mongoose from "mongoose";
import type SpentInterface from "../interfaces/SpentInterface";

const SpentSchema = new mongoose.Schema<SpentInterface>({
	spentID: { type: String, required: true },
	projectID: { type: String, required: true },
	amount: { type: Number, required: true },
	name: { type: String, required: true },
	date: { type: Date, required: true },
});

const SpentModel = mongoose.model<SpentInterface>("Spent", SpentSchema);
export default SpentModel;
