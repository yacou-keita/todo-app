import { InMemoryTaskRepository } from "../../../data/sources/inMemoryTaskRepository"
import { TaskRequestDTO } from "../../../presentation/dtos/taskRequest.dto"
import { TaskResponseDTO } from "../../../presentation/dtos/taskResponse.dto"
import { ITaskRepository } from "../../repositories/task.repository"
import { AddTask } from "../add-task/addTask"
import { FinishTask } from "./finishTask"

describe("finish task feature", () => {
    let taskCreated: TaskResponseDTO
    let taskRepository: ITaskRepository

    beforeEach(async () => {
        const taskRequestDTO: TaskRequestDTO = { title: "exercice de math à faire avant demain" }
        taskRepository = new InMemoryTaskRepository()
        taskCreated = await new AddTask(taskRepository).execute(taskRequestDTO)
    })

    it("should delete existence task", async () => {
        const taskFinished = await new FinishTask(taskRepository).execute({ id: taskCreated.id, isFinish: true })
        const foundTaskDeleted = await taskRepository.findById(taskFinished.id)

        
        expect(foundTaskDeleted?.id).toEqual(taskCreated.id)
        expect(foundTaskDeleted?.title).toEqual(taskCreated.title)
        expect(foundTaskDeleted?.isFinish).toBeTrue()
    })
})