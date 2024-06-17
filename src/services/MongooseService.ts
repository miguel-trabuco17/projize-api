import mongoose from "mongoose";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export default class MongooseService {
	public static connect(): void {
		try {
			mongoose.connect(process.env.DABASE_URL as string);
			console.log("Connected to MongoDB");
		} catch (error) {
			console.error(error);
		}
	}

	public static async disconnect(): Promise<void> {
		try {
			mongoose.disconnect();
		} catch (error) {
			console.error(error);
		}
	}
}
