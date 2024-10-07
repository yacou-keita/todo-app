import { IStorage, saveParams } from "./storage"

export class storageRepository {

    constructor(private readonly storage: IStorage) { }

    save(params: saveParams): void {
        this.storage.save(params)
    }

    read<T>(key: string): T {
        return this.storage.read<T>(key)
    }

    remove(key: string): void {
        this.storage.remove(key)
    }

    removeAll(): void {
        this.storage.removeAll()
    }

}