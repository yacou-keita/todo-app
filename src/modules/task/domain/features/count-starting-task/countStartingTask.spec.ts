import { InMemoryTaskRepository } from "../../../data/sources/inMemoryTaskRepository"
import { TaskRequestDTO } from "../../../presentation/dtos/taskRequest.dto"
import { TaskResponseDTO } from "../../../presentation/dtos/taskResponse.dto"
import { ITaskRepository } from "../../repositories/task.repository"
import { AddTask } from "../add-task/addTask"
import { FinishTask } from "../finish-task/finishTask"
import { CountStartingTask } from "./countStartingTask"


describe("count starting task  feature", () => {
    let taskCreated1: TaskResponseDTO
    let taskCreated2: TaskResponseDTO
    let taskRepository: ITaskRepository

    beforeEach(async () => {
        const taskRequestDTO1: TaskRequestDTO = { title: "exercice de math à faire avant demain" }
        const taskRequestDTO2: TaskRequestDTO = { title: "faire su sport demain" }
        taskRepository = new InMemoryTaskRepository()
        taskCreated1 = await new AddTask(taskRepository).execute(taskRequestDTO1)
        taskCreated2 = await new AddTask(taskRepository).execute(taskRequestDTO2)
        taskCreated1 = await new FinishTask(taskRepository).execute({ id: taskCreated1.id, isFinish: true })
    })

    it("should get finished task list", async () => {
        const taskStartingLength = await new CountStartingTask(taskRepository).execute()

        expect(taskStartingLength).toEqual(1)

    })



})