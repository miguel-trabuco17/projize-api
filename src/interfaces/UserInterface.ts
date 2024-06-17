export default interface UserInterface {
	userID: string;
	name: string;
	email: string;
	passwordHash: string;
	sessions?: string[];
}
