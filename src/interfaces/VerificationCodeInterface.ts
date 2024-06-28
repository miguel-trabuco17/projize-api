export default interface VerificationCodeInterface {
	code: string;
	email: string;
	verified?: boolean;
	userID?: string;
}
