export default interface BaseInterface {
    get id():string;
     
}

export interface TaskInterface extends BaseInterface {
    get title(): string,
    get description(): string,
    get done():boolean,
    get createdAt():Date,
    get dueDate():Date,
    validateTask(): void
}