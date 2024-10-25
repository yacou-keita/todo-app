import { InMemoryTaskRepository } from "../../../data/sources/inMemoryTaskRepository"
import { TaskRequestDTO } from "../../../presentation/dtos/taskRequest.dto"
import { TaskResponseDTO } from "../../../presentation/dtos/taskResponse.dto"
import { ITaskRepository } from "../../repositories/task.repository"
import { AddTask } from "../add-task/addTask"
import { FinishTask } from "../finish-task/finishTask"
import { TaskList } from "./taskList"

describe("task list  feature", () => {
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
        const taskFinishedList = await new TaskList(taskRepository).execute(true)


        expect(taskFinishedList.length).toEqual(1)
        expect(taskFinishedList[0].id).toEqual(taskCreated1.id)
        expect(taskFinishedList[0].title).toEqual(taskCreated1.title)
        expect(taskFinishedList[0].isFinish).toBeTrue()
    })

    it("should get started task list", async () => {
        const taskFinishedList = await new TaskList(taskRepository).execute(false)


        expect(taskFinishedList.length).toEqual(1)
        expect(taskFinishedList[0].id).toEqual(taskCreated2.id)
        expect(taskFinishedList[0].title).toEqual(taskCreated2.title)
        expect(taskFinishedList[0].isFinish).toBeFalse()
    })

    it("should get all task", async () => {
        const taskFinishedList = await new TaskList(taskRepository).execute()

        expect(taskFinishedList.length).toEqual(2)

        expect(taskFinishedList[0].id).toEqual(taskCreated1.id)
        expect(taskFinishedList[0].title).toEqual(taskCreated1.title)
        expect(taskFinishedList[0].isFinish).toBeTrue()

        
        expect(taskFinishedList[1].id).toEqual(taskCreated2.id)
        expect(taskFinishedList[1].title).toEqual(taskCreated2.title)
        expect(taskFinishedList[1].isFinish).toBeFalse()
    })

})