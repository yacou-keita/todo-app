import { createReducer, on } from "@ngrx/store";
import { TaskState } from "./task.state";
import { addTask, getTaskList, searchTaskList, setTaskList } from "./task.action";


export const initState: TaskState = { list: [], countTask: 0, countStartingTask: 0, filterOption: undefined }


export const taskReducer = createReducer(
    initState,
    on(addTask, (task) => task),
    on(getTaskList, (task, { isFinish }) => ({ ...task, filterOption: isFinish })),
    on(searchTaskList, (task) => ({ ...task, taskList: task.list })),
    on(setTaskList, (task, { taskList, startingTaskLength }) => ({
        ...task,
        list: taskList,
        countTask: taskList.length,
        countStartingTask: startingTaskLength
    })),
)