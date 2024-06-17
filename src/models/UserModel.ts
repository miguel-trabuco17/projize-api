import mongoose from "mongoose";
import type UserInterface from "../interfaces/UserInterface";

const UserSchema = new mongoose.Schema<UserInterface>({
	userID: { type: String, required: true },
	name: { type: String, required: true },
	email: { type: String, required: true },
	passwordHash: { type: String, required: true },
	sessions: { type: [String], required: false },
});

const UserModel = mongoose.model<UserInterface>("User", UserSchema);
export default UserModel;
