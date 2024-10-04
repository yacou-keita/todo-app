import { Feature } from "../../../../../core/feature";
import { TaskMapper } from "../../../data/mappers/task.mapper";
import { TaskRequestDTO } from "../../../presentation/dtos/taskRequest.dto";
import { TaskResponseDTO } from "../../../presentation/dtos/taskResponse.dto";
import { Task } from "../../entities/task";
import { ITaskRepository } from "../../repositories/task.repository";

export class AddTask implements Feature<TaskResponseDTO, TaskRequestDTO> {

    constructor(private readonly repository: ITaskRepository) { }

    async execute(params: TaskRequestDTO): Promise<TaskResponseDTO> {
        const taskCreated = new Task().create({ title: params.title })
        const taskAdded = await this.repository.add(taskCreated)
        return TaskMapper.fromTask(taskAdded)
    }


}