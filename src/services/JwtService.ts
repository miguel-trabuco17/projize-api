import jwt from "jsonwebtoken";
const SECRET: string = process.env.SECRET as string;

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export default class JwtService {
	public static generateToken(id: string): string | null {
		try {
			return jwt.sign({ id }, SECRET);
		} catch (e) {
			return null;
		}
	}

	public static decodeToken(token: string): jwt.JwtPayload | null {
		try {
			return jwt.decode(token) as jwt.JwtPayload;
		} catch (e) {
			return null;
		}
	}
}
