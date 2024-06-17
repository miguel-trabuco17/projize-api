export default interface ProjectInterface {
    projectID: string;
    ownerID: string;
    usersID?: string[];
    name: string;
    description?: string;
    budget?: number;
}
