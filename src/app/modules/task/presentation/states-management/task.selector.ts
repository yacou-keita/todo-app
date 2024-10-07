import { createSelector, } from "@ngrx/store";
import { TaskState } from "./task.state";
import { TaskResponseDTO } from "../dtos/taskResponse.dto";

export type AppState = {
    task: TaskState
}


export const selectTaskList = createSelector((taskState: AppState) => taskState.task.list, (state: TaskResponseDTO[]) => state)
export const selectTaskListLength = createSelector((taskState: AppState) => taskState.task.countTask, (state: number) => state)
export const selectStartTaskListLength = createSelector((taskState: AppState) => taskState.task.countStartingTask, (state: number) => state)
export const selectfilterOption = createSelector((taskState: AppState) => taskState.task.filterOption, (state?: boolean) => state)