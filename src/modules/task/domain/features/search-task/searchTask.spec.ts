import { InMemoryTaskRepository } from "../../../data/sources/inMemoryTaskRepository"
import { TaskRequestDTO } from "../../../presentation/dtos/taskRequest.dto"
import { TaskResponseDTO } from "../../../presentation/dtos/taskResponse.dto"
import { ITaskRepository } from "../../repositories/task.repository"
import { AddTask } from "../add-task/addTask"
import { SearchTaskByTitle } from "./searchTask"


describe("search task  feature", () => {
    let taskCreated1: TaskResponseDTO
    let taskCreated2: TaskResponseDTO
    let taskCreated3: TaskResponseDTO
    let taskRepository: ITaskRepository

    beforeEach(async () => {
        const taskRequestDTO1: TaskRequestDTO = { title: "exercice de math à faire avant demain" }
        const taskRequestDTO2: TaskRequestDTO = { title: "faire du sport demain" }
        const taskRequestDTO3: TaskRequestDTO = { title: "faire du sport samedi" }
        taskRepository = new InMemoryTaskRepository()
        taskCreated1 = await new AddTask(taskRepository).execute(taskRequestDTO1)
        taskCreated2 = await new AddTask(taskRepository).execute(taskRequestDTO2)
        taskCreated3 = await new AddTask(taskRepository).execute(taskRequestDTO3)
    })

    it("should return taskList where title contain <<faire du sport>>", async () => {
        const taskList = await new SearchTaskByTitle(taskRepository).execute("faire du sport")

        expect(taskList.length).toEqual(2)
        expect(taskList[0].title).toEqual("faire du sport demain")
        expect(taskList[1].title).toEqual("faire du sport samedi")
     
    })

    it("should return taskList where title contain <<exercice>>", async () => {
        const taskList = await new SearchTaskByTitle(taskRepository).execute("exercice")

        expect(taskList.length).toEqual(1)
        expect(taskList[0].title).toEqual("exercice de math à faire avant demain")
    })

    it("should return empty taskList when title is empty", async () => {
        const taskList = await new SearchTaskByTitle(taskRepository).execute("")

        expect(taskList.length).toEqual(3)
        expect(taskList[0].title).toEqual("exercice de math à faire avant demain")
        expect(taskList[1].title).toEqual("faire du sport demain")
        expect(taskList[2].title).toEqual("faire du sport samedi")
    })

})