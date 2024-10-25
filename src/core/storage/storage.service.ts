import { LocalStorage } from "./localStorage"
import { saveParams } from "./storage"
import { storageRepository } from "./storage.repository"


export class StorageService {

    storage = new storageRepository(new LocalStorage())

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