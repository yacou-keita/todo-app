import { IStorage, saveParams } from "./storage";

export class LocalStorage implements IStorage {

    save(params: saveParams): void {
        localStorage.setItem(params.key, JSON.stringify(params.data))
    }

    read<T>(key: string): T {
        let value!: T
        const getValue = localStorage.getItem(key);
        if (getValue) value = JSON.parse(getValue);
        return value
    }

    remove(key: string): void {
        localStorage.removeItem(key)
    }

    removeAll(): void {
        localStorage.clear()
    }
}


