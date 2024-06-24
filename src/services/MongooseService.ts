import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
	try {
		await mongoose.connect(process.env.DATABASE_URL as string);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error(error);
	}
};

export const disconnectDatabase = async (): Promise<void> => {
	try {
		await mongoose.disconnect();
		console.log("Disconnected from MongoDB");
	} catch (error) {
		console.error(error);
	}
};
