import { Feature } from "../../../../../core/feature";
import { TaskMapper } from "../../../data/mappers/task.mapper";
import { TaskResponseDTO } from "../../../presentation/dtos/taskResponse.dto";
import { ITaskRepository } from "../../repositories/task.repository";

export class DeleteTask implements Feature<TaskResponseDTO, number> {

    constructor(private readonly taskRepository: ITaskRepository) { }

    async execute(id: number): Promise<TaskResponseDTO> {
        const taskDeleted = await this.taskRepository.delete(id)
        if (!taskDeleted) { throw new Error() }
        return TaskMapper.fromTask(taskDeleted)
    }

}