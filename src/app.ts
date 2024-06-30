import express from "express";
import type { Application } from "express";
import "dotenv/config";
import cors from "cors";
import MongooseService from "./services/MongooseService";
import type { CorsOptions } from "cors";

//import routes
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

//cors configuration
const corsOptions: CorsOptions = {
	origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	allowedHeaders: ["Content-Type", "Authorization"],
};

//app configuration
const app: Application = express();
app.use(cors(corsOptions));
app.use(express.json());

//database connection
const mongooseService = new MongooseService();
mongooseService.connectDatabase();

//routes
app.get("/", (req, res) => {
	res.status(200).json({
		status: "working",
	});
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

const PORT: string = process.env.PORT as string;
const server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

export default server;
