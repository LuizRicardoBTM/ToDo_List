export default interface BaseInterface {
    get id():string;
    get done():boolean;
    get createdAt():Date;
    get dueDate():Date;
    validate():void 
}

export interface TaskInterface extends BaseInterface {
    get title(): string,
    get description(): string,
    validateTask(): void,
}