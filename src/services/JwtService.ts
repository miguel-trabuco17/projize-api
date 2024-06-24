import jwt from "jsonwebtoken";
const SECRET: string = process.env.SECRET as string;

export const createToken = (payload: string) => {
	return jwt.sign(payload, SECRET);
};

export const verifyToken = (token: string) => {
	return jwt.verify(token, SECRET);
};
