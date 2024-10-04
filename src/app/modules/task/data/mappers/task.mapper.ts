import { Task } from "../../domain/entities/task";
import { TaskResponseDTO } from "../../presentation/dtos/taskResponse.dto";

export class TaskMapper {

    static fromTask(task: Task): TaskResponseDTO {
        
        const taskResponseDTO: TaskResponseDTO = {id:task.id, isFinish:task.isFinish, title:task.title}
        return taskResponseDTO
    }
}