import { Feature } from "../../../../../core/feature";
import { TaskMapper } from "../../../data/mappers/task.mapper";
import { FinishTaskRequestDTO } from "../../../presentation/dtos/deleteTaskRequest.dto";
import { TaskResponseDTO } from "../../../presentation/dtos/taskResponse.dto";
import { ITaskRepository } from "../../repositories/task.repository";

export class FinishTask implements Feature<TaskResponseDTO,FinishTaskRequestDTO>{

    constructor(private readonly taskRepository: ITaskRepository) { }

    async execute(params: FinishTaskRequestDTO): Promise<TaskResponseDTO> {
        const taskFinished = await this.taskRepository.finish(params)
        if(!taskFinished) throw new Error()
        return TaskMapper.fromTask(taskFinished)
    }
}