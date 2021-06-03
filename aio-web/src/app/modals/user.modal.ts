export class User {
    private _name: string;
    private _email: string;
    private _status: number;
    private _id: number;



    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    public get status(): number {
        return this._status;
    }
    public set status(value: number) {
        this._status = value;
    }
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    constructor(
        name: string,
        email: string,
        status: number=1,
        id: number,

    ) {
        this._name = name;
        this._email=email;
        this._status = status;
        this._id = id;        
    }
}

