import { Feature } from "../../../../../core/feature";
import { TaskMapper } from "../../../data/mappers/task.mapper";
import { TaskResponseDTO } from "../../../presentation/dtos/taskResponse.dto";
import { Task } from "../../entities/task";
import { ITaskRepository } from "../../repositories/task.repository";

export class SearchTaskByTitle implements Feature<TaskResponseDTO[], string> {

    constructor(private readonly taskRepository: ITaskRepository) { }

    async execute(title: string): Promise<TaskResponseDTO[]> {
        let taskList: Task[] = []
        if (title) {
            taskList = await this.taskRepository.searchTaskByTitle(title)
        } else {
            taskList = await this.taskRepository.list()
        }
        return taskList.map(task => TaskMapper.fromTask(task))
    }
}