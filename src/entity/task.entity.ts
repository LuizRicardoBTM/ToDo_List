import type { TaskInput, TaskInterface } from "./entity.interface.js";
import { Priority } from "./entity.interface.js";


export class TaskEntity implements TaskInterface{
    private _id: string
    private _title: string
    private _description: string
    private _createdAt: Date
    private _done: boolean
    private _dueDate: Date


    constructor(task: TaskInput) {
        this._id = task.id;
        this._title = task.title;
        this._description = task.description;
        this._createdAt = task.createdAt;
        this._done = task.done;
        this._dueDate = task.dueDate;
    }

    toJSON() {
        return {
            id: this._id,
            title: this._title,
            description: this._description,
            createdAt: this._createdAt,
            done: this._done,
            dueDate: this._dueDate,
            priority: this.priority
        }
    }

    get id(): string {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get description(): string {
        return this._description;
    }

    get priority(): Priority {
        let priority: Priority;
        let today = new Date();

        let fiveDaysFromNow = new Date();
        fiveDaysFromNow.setDate(today.getDate() + 5)

        let twoDaysFromNow = new Date();
        twoDaysFromNow.setDate(today.getDate() + 2)
        
        priority = Priority.medium;
        
        if(this._dueDate <= twoDaysFromNow){
            priority = Priority.high;
        }

        if(this._dueDate > fiveDaysFromNow){
            priority = Priority.low;
        }

        return priority;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get done(): boolean {
        return this._done;
    }

    get dueDate(): Date {
        return this._dueDate;
    }
}

