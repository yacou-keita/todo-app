import { Feature } from "../../../../../core/feature";
import { TaskMapper } from "../../../data/mappers/task.mapper";
import { TaskResponseDTO } from "../../../presentation/dtos/taskResponse.dto";
import { UpdateTaskRequestDTO } from "../../../presentation/dtos/updateTaskRequest.dto";
import { ITaskRepository } from "../../repositories/task.repository";

export class UpdateTask implements Feature<TaskResponseDTO, UpdateTaskRequestDTO> {

    constructor(private readonly taskRepository: ITaskRepository) { }

    async execute(params: UpdateTaskRequestDTO): Promise<TaskResponseDTO> {
       const taskUpdate = await this.taskRepository.update(params)
       if(!taskUpdate) throw new Error()
       return TaskMapper.fromTask(taskUpdate)
    }

}