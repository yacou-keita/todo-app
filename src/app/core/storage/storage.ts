export type saveParams = { key: string, data: unknown }
export interface IStorage {
    save(params: saveParams): void
    read<T>(key: string): T
    remove(key: string): void
    removeAll(): void
}