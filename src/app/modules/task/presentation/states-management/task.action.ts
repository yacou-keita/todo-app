import { createAction, props } from "@ngrx/store";
import { TaskRequestDTO } from "../dtos/taskRequest.dto";
import { FinishTaskRequestDTO } from "../dtos/deleteTaskRequest.dto";
import { UpdateTaskRequestDTO } from "../dtos/updateTaskRequest.dto";
import { TaskResponseDTO } from "../dtos/taskResponse.dto";



export const addTask = createAction("add task", props<TaskRequestDTO>())
export const setTask = createAction("set task", props<{ task: TaskResponseDTO }>())
export const getTaskList = createAction("get task list", props<{ isFinish?: boolean }>())
export const searchTaskList = createAction("search task list", props<{ title: string }>())
export const setTaskList = createAction("set task list", props<{ taskList: TaskResponseDTO[], countStartingTask?: number }>())
export const updateTask = createAction("update task", props<UpdateTaskRequestDTO>())
export const deleteTask = createAction("delete task", props<{ id: number }>())
export const finishTask = createAction("finish task", props<FinishTaskRequestDTO>())