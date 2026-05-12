import type { Priority } from "../../prisma/database/enums.js";
import type { TaskInterface } from "./entity.interface.js";
import type { Task } from "../../prisma/database/client.js";


export class TaskEntity implements TaskInterface{
    private _id: string
    private _title: string
    private _description: string
    private _priority: Priority
    private _createdAt: Date
    private _done: boolean
    private _dueDate: Date


    constructor(task: Task) {
        this._id = task.id;
        this._title = task.title;
        this._description = task.description;
        if(task.priority === null){
            throw new Error("priority null!");
        }
        this._priority = task.priority;
        this._createdAt = task.createdAt;
        this._done = task.done;
        this._dueDate = task.dueDate;
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
        return this._priority;
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

