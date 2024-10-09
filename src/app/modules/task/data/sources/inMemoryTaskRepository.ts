import { environment } from "../../../../../environments/environment.development";
import { StorageService } from "../../../../core/storage/storage.service";
import { Task } from "../../domain/entities/task";
import { ITaskRepository } from "../../domain/repositories/task.repository";
import { TaskResponseDTO } from "../../presentation/dtos/taskResponse.dto";
import { TaskMapper } from "../mappers/task.mapper";

export class InMemoryTaskRepository implements ITaskRepository {

    storageService = new StorageService()


    private taskList: Task[] = []

    add(task: Task): Promise<Task> {
        const taskCreated = task.create({ id: this.taskList.length + 1, title: task.title })
        this.taskList.push(taskCreated)
        this.formatTaskListToLocalStorage();
        return Promise.resolve(taskCreated)
    }


    update(params: { id: number; title: string; }): Promise<Task | undefined> {
        const taskFound = this.taskList.find(task => task.id === params.id)
        taskFound?.create({ title: params.title, id: params.id })
        this.formatTaskListToLocalStorage()
        return Promise.resolve(taskFound)
    }

    delete(id: number): Promise<Task | undefined> {
        const taskFound = this.taskList.find(task => task.id === id)
        if (taskFound) {
            const newTaskList = this.taskList.filter(task => task.id !== id)
            this.taskList = [...newTaskList]
            this.formatTaskListToLocalStorage()
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
        this.formatTaskListToLocalStorage()
        return Promise.resolve(taskFound)
    }

    list(isFinish: boolean): Promise<Task[]> {
        this.formatTaskListDTOtoTaskList()
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

    searchTaskByTitle(title: string): Promise<Task[]> {
        const taskList = this.taskList.filter(task => task.title.includes(title))
        return Promise.resolve(taskList)
    }

    private formatTaskListToLocalStorage() {
        const taskListDTO = this.taskList.map(task => TaskMapper.fromTask(task));
        this.storageService.save({ key: environment.localStorageKey, data: taskListDTO });
    }

    private formatTaskListDTOtoTaskList() {
        const taskListDTO = this.storageService.read<TaskResponseDTO[]>(environment.localStorageKey)
        if (taskListDTO) {
            const newTaskList = taskListDTO.map(taskDTO => TaskMapper.fromTaskResponseDTO(taskDTO));
            this.taskList = newTaskList
        }
    }

}