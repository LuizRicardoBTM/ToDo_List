import type { UserDTO, UserInterface } from "./entity.interface.js";

export class UserEntity implements UserInterface{
    private _id: string
    private _name: string
    private _email: string
    private _password: string

    constructor(user: UserDTO) {
        this._id = user.id;
        this._name = user.name;
        this._email = user.email;
        this._password = user.password;
    }

    toJSON() {
        return {
            id: this._id,
            name: this._name,
            email: this._email
        }
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get password(): string {
        return this._password;
    }
}