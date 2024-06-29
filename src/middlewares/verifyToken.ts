const SECRET: string = process.env.SECRET as string;
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function verifyToken(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const token: string = req.body.token;

	if (!token) {
		return res.status(401).send("Unauthorized");
	}

	jwt.verify(token, SECRET, (err, userID) => {
		if (err) {
			return res.status(401).send("Unauthorized");
		}

		req.body.userID = userID;
		next();
	});
}
