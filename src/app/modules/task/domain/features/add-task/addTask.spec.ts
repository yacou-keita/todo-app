import { InMemoryTaskRepository } from "../../../data/sources/inMemoryTaskRepository"
import { TaskRequestDTO } from "../../../presentation/dtos/taskRequest.dto"
import { AddTask } from "./addTask"

describe("add task feature", () => {

    it("should add task", async () => {

        const taskRequestDTO: TaskRequestDTO = { title: "exercice de math à faire avant demain" }

        const taskRepository = new InMemoryTaskRepository()
        const taskAdded = await new AddTask(taskRepository).execute(taskRequestDTO)
        const foundTask = await taskRepository.findById(taskAdded.id)

        expect(foundTask?.id).toBeTruthy()
        expect(taskAdded.title).toEqual(foundTask?.title ?? "")
        expect(foundTask?.isFinish).toBeFalse()
    })

})