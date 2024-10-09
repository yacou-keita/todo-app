import { Injectable } from "@angular/core";
import { InMemoryTaskRepository } from "../data/sources/inMemoryTaskRepository";
import { AddTask } from "../domain/features/add-task/addTask";
import { TaskRequestDTO } from "./dtos/taskRequest.dto";
import { CountStartingTask } from "../domain/features/count-starting-task/countStartingTask";
import { DeleteTask } from "../domain/features/delete-task/deleteTask";
import { FinishTask } from "../domain/features/finish-task/finishTask";
import { FinishTaskRequestDTO } from "./dtos/deleteTaskRequest.dto";
import { TaskList } from "../domain/features/task-list/taskList";
import { UpdateTask } from "../domain/features/update-task/updateTask";
import { UpdateTaskRequestDTO } from "./dtos/updateTaskRequest.dto";
import { SearchTaskByTitle } from "../domain/features/search-task/searchTask";

@Injectable({ providedIn: "root" })
export class TaskService {

   taskRepository = new InMemoryTaskRepository()

   async addtask(params: TaskRequestDTO) {
      return await new AddTask(this.taskRepository).execute(params)
   }

   async countStartingTask() {
      return await new CountStartingTask(this.taskRepository).execute()
   }

   async deleteTask(id: number) {
      return await new DeleteTask(this.taskRepository).execute(id)
   }

   async finishTask(params: FinishTaskRequestDTO) {
      return await new FinishTask(this.taskRepository).execute(params)
   }

   async taskList(isFinish?: boolean) {
      return await new TaskList(this.taskRepository).execute(isFinish)
   }

   async searchTaskByTitle(title: string) {
      return await new SearchTaskByTitle(this.taskRepository).execute(title)
   }

   async updateTask(params: UpdateTaskRequestDTO) {
      return await new UpdateTask(this.taskRepository).execute(params)
   }

}