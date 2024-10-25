import { InMemoryTaskRepository } from "../../../data/sources/inMemoryTaskRepository"
import { TaskRequestDTO } from "../../../presentation/dtos/taskRequest.dto"
import { TaskResponseDTO } from "../../../presentation/dtos/taskResponse.dto"
import { ITaskRepository } from "../../repositories/task.repository"
import { AddTask } from "../add-task/addTask"
import { DeleteTask } from "./deleteTask"

describe("delete task feature", () => {
    let taskCreated: TaskResponseDTO
    let taskRepository: ITaskRepository
    beforeEach(async () => {
        const taskRequestDTO: TaskRequestDTO = { title: "exercice de math à faire avant demain" }
        taskRepository = new InMemoryTaskRepository()
        taskCreated = await new AddTask(taskRepository).execute(taskRequestDTO)
    })

    it("should delete existence task", async () => {
        const taskDeleted = await new DeleteTask(taskRepository).execute(taskCreated.id)
        const foundTaskDeleted = await taskRepository.findById(taskDeleted.id)
        
        expect(foundTaskDeleted).toBeFalsy()
        expect(taskDeleted.id).toEqual(taskCreated.id)
        expect(taskDeleted.title).toEqual(taskCreated.title)
        expect(taskDeleted.isFinish).toEqual(taskCreated.isFinish)
    })
})