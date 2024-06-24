import express from "express";
import type { Application } from "express";
import cors from "cors";
import "dotenv/config";
import { connectDatabase } from "./services/mongooseService";

//import routes
import authRoutes from "./routes/authRoutes";

//app configuration
const app: Application = express();
app.use(cors());
app.use(express.json());

//database connection
connectDatabase();

//routes
app.get("/", (req, res) => {
	res.status(200).json({
		status: "working",
	});
});

app.use("/auth", authRoutes);

const PORT: string = process.env.PORT as string;
const server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

export default server;
