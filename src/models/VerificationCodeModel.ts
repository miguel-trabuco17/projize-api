import mongoose from "mongoose";
import type VerificationCodeInterface from "../interfaces/VerificationCodeInterface";

const verificationCodeSchema = new mongoose.Schema<VerificationCodeInterface>({
	code: { type: String, required: true },
	email: { type: String, required: true },
	verified: { type: Boolean, required: true, default: false },
});

const VerificationCodeModel = mongoose.model(
	"Verification",
	verificationCodeSchema,
);
export default VerificationCodeModel;
