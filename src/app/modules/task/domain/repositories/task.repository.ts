import { Task } from "../entities/task";

export interface ITaskRepository {
    add(task: Task): Promise<Task>
    update(params: { id: number, title: string }): Promise<Task | undefined>
    delete(id: number): Promise<Task | undefined>
    findById(id: number): Promise<Task | undefined>
    finish(params: { id: number, isFinish: boolean }): Promise<Task | undefined>
    list(isFinish?: boolean): Promise<Task[]>
    searchTaskByTitle(title: string): Promise<Task[]>
    countStarting(): Promise<number>
}