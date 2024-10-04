import { Feature } from "../../../../../core/feature";
import { TaskMapper } from "../../../data/mappers/task.mapper";
import { DeleteTaskRequestDTO } from "../../../presentation/dtos/deleteTaskRequest.dto";
import { TaskResponseDTO } from "../../../presentation/dtos/taskResponse.dto";
import { ITaskRepository } from "../../repositories/task.repository";

export class FinishTask implements Feature<TaskResponseDTO,DeleteTaskRequestDTO>{

    constructor(private readonly taskRepository: ITaskRepository) { }

    async execute(params: DeleteTaskRequestDTO): Promise<TaskResponseDTO> {
        const taskFinished = await this.taskRepository.finish(params)
        if(!taskFinished) throw new Error()
        return TaskMapper.fromTask(taskFinished)
    }
}