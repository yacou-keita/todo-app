import { Feature } from "../../../../../core/feature";
import { TaskMapper } from "../../../data/mappers/task.mapper";
import { TaskResponseDTO } from "../../../presentation/dtos/taskResponse.dto";
import { ITaskRepository } from "../../repositories/task.repository";

export class TaskList implements Feature<TaskResponseDTO[], boolean | undefined> {

    constructor(private readonly repository: ITaskRepository) { }

    async execute(isFinish?: boolean): Promise<TaskResponseDTO[]> {
        const taskList = await this.repository.list(isFinish)
        return taskList.map(task => TaskMapper.fromTask(task))
    }
}