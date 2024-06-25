import jwt from "jsonwebtoken";

export default class JwtService {
	private SECRET: string;

	public createToken(payload: string): string {
		return jwt.sign(payload, this.SECRET);
	}

	public decodeToken(token: string): string {
		return jwt.decode(token) as string;
	}

	constructor() {
		this.SECRET = process.env.SECRET as string;
	}
}
