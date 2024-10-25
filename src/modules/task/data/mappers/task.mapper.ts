import { Task } from "../../domain/entities/task";
import { TaskResponseDTO } from "../../presentation/dtos/taskResponse.dto";

export class TaskMapper {

    static fromTask(task: Task): TaskResponseDTO {

        const taskResponseDTO: TaskResponseDTO = { id: task.id, isFinish: task.isFinish, title: task.title }
        return taskResponseDTO
    }

    static fromTaskResponseDTO(taskResponseDTO: TaskResponseDTO): Task {
        const task = new Task().create({ id: taskResponseDTO.id, title: taskResponseDTO.title, isFinish: taskResponseDTO.isFinish })
        return task
    }
}