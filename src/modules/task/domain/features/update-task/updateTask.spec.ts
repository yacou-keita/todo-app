import { InMemoryTaskRepository } from "../../../data/sources/inMemoryTaskRepository"
import { TaskRequestDTO } from "../../../presentation/dtos/taskRequest.dto"
import { TaskResponseDTO } from "../../../presentation/dtos/taskResponse.dto"
import { ITaskRepository } from "../../repositories/task.repository"
import { AddTask } from "../add-task/addTask"
import { UpdateTask } from "./updateTask"

describe("update task feature", () => {
    let taskCreated: TaskResponseDTO
    let taskRepository: ITaskRepository
    beforeEach(async () => {
        const taskRequestDTO: TaskRequestDTO = { title: "exercice de math à faire avant demain" }
        taskRepository = new InMemoryTaskRepository()
        taskCreated = await new AddTask(taskRepository).execute(taskRequestDTO)
    })

    it("should update existence task", async () => {
       const taskUpdated = await new UpdateTask(taskRepository).execute({ id: taskCreated.id, title: "faire du sport" })

        expect(taskUpdated.id).toEqual(taskCreated.id)
        expect(taskUpdated.title).toEqual("faire du sport")
        expect(taskUpdated.isFinish).toEqual(taskCreated.isFinish)
    })
})