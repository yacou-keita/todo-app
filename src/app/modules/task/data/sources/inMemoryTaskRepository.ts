import { Task } from "../../domain/entities/task";
import { ITaskRepository } from "../../domain/repositories/task.repository";

export class InMemoryTaskRepository implements ITaskRepository {


    private taskList: Task[] = []

    add(task: Task): Promise<Task> {
        const taskCreated = task.create({ id: this.taskList.length + 1, title: task.title })
        this.taskList.push(taskCreated)
        return Promise.resolve(taskCreated)
    }

    update(params: { id: number; title: string; }): Promise<Task | undefined> {
        const taskFound = this.taskList.find(task => task.id === params.id)
        taskFound?.create({ title: params.title, id: params.id })
        return Promise.resolve(taskFound)
    }

    delete(id: number): Promise<Task | undefined> {
        const taskFound = this.taskList.find(task => task.id === id)
        if (taskFound) {
            const newTaskList = this.taskList.filter(task => task.id !== id)
            this.taskList = [...newTaskList]
        }
        return Promise.resolve(taskFound)
    }

    findById(id: number): Promise<Task | undefined> {
        const taskFound = this.taskList.find(task => task.id === id)
        return Promise.resolve(taskFound)
    }

    finish(params: { id: number; isFinish: boolean; }): Promise<Task | undefined> {
        const taskFound = this.taskList.find(task => task.id === params.id)
        if (taskFound) taskFound?.create({ isFinish: params.isFinish, id: params.id, title: taskFound.title })
        return Promise.resolve(taskFound)
    }

    list(isFinish: boolean): Promise<Task[]> {

        if (isFinish === true) {
            return Promise.resolve(this.taskList.filter(task => task.isFinish === isFinish))
        }
        if (isFinish == false) {
            return Promise.resolve(this.taskList.filter(task => task.isFinish === isFinish))
        }

        return Promise.resolve(this.taskList)
    }

    countStarting(): Promise<number> {
        const startingTask = this.taskList.filter(task => task.isFinish === false)
        return Promise.resolve(startingTask.length)
    }

}