export class Task {
    private _id: number = 0
    private _title: string = ""
    private _isFinish: boolean = false

    get id() { return this._id }
    get title() { return this._title }
    get isFinish() { return this._isFinish }
    

    create(params: { title: string, id?: number, isFinish?: boolean }) {
        this._title = params.title;
        this._id = params.id ?? 0;
        this._isFinish = params.isFinish ?? false;
        return this
    }

}