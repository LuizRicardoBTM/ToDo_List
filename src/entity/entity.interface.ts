export default interface BaseInterface {
    get id():string;
     
}

export enum Priority {
    high = "high",
    medium = "medium",
    low = "low"
}

export interface TaskInterface extends BaseInterface {
    get title(): string,
    get description(): string,
    get done(): boolean,
    get createdAt(): Date,
    get dueDate(): Date,
    get priority(): Priority
}

export interface TaskDTO {
    id: string;
    title: string,
    description: string,
    createdAt?: Date,
    done?: boolean,
    dueDate: Date
}

export interface UserInterface extends BaseInterface {
    get name(): string,
    get email(): string,
    get password(): string
}

export interface UserDTO {
    id: string;
    name: string,
    email: string,
    password: string
}