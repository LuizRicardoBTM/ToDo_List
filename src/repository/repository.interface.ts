import type BaseInterface from "../entity/entity.interface.js";

export default interface taskRepository {
    create(task: BaseInterface): Promise<null>;
    update(task: BaseInterface): Promise<null>;
    delete(id: string): Promise<null>;
    findById(id: string): Promise<BaseInterface | null>;
}