import { TaskResponseDTO } from "../dtos/taskResponse.dto"

export type TaskState = {
    list: TaskResponseDTO[]
    countTask: number
    countStartingTask: number
    filterOption?: boolean
}