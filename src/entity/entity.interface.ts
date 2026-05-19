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

export interface TaskInput {
    id: string;
    title: string,
    description: string,
    createdAt: Date,
    done: boolean,
    dueDate: Date,
}