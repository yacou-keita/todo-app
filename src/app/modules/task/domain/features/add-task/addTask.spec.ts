import { InMemoryTaskRepository } from "../../../data/sources/inMemoryTaskRepository"
import { TaskRequestDTO } from "../../../presentation/dtos/taskRequest.dto"
import { AddTask } from "./addTask"

describe("add task feature", () => {

    it("should add task", async () => {

        const taskRequestDTO: TaskRequestDTO = { title: "exercice de math à faire avant demain" }

        const taskRepository = new InMemoryTaskRepository()
        const response = await new AddTask(taskRepository).execute(taskRequestDTO)

        expect(response.id).toBeTruthy()
        expect(response.title).toEqual("exercice de math à faire avant demain")
        expect(response.isFinish).toBeFalse()
    })

})