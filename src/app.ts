import express from "express";
import type { Application } from "express";
import cors from "cors";
import "dotenv/config";

//app configuration
const app: Application = express();
app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => {
	res.status(200).json({
		status: "working",
	});
});

const PORT: string = process.env.PORT as string;
const server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

export default server;
