import mongoose from "mongoose";

export default class MongooseService {
	private DATABASE_URL: string;

	public async connectDatabase(): Promise<void> {
		try {
			await mongoose.connect(this.DATABASE_URL);
			console.log("Database connected");
		} catch (error) {
			console.error(error);
		}
	}

	public async disconnectDatabase(): Promise<void> {
		try {
			await mongoose.disconnect();
			console.log("Database disconnected");
		} catch (error) {
			console.error(error);
		}
	}

	constructor() {
		this.DATABASE_URL = process.env.DATABASE_URL as string;
	}
}
