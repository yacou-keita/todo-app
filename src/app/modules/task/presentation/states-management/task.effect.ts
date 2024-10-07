import { Injectable } from "@angular/core";
import { TaskService } from "../task.service";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { addTask, deleteTask, finishTask, getcountStartingTask, getTaskList, setcountStartingTask, setTask, setTaskList, updateTask } from "./task.action";
import { concatMap, exhaustMap } from "rxjs";

@Injectable()
export class TaskEffect {

    constructor(
        private readonly taskService: TaskService,
        private readonly actions$: Actions
    ) { }

    loadTaskList$ = createEffect(() => this.actions$.pipe(
        ofType(getTaskList),
        exhaustMap(async (task) => {
            const taskList = await this.taskService.taskList(task.isFinish)
            const countStartingTask = await this.taskService.countStartingTask()
            return setTaskList({ taskList, startingTaskLength: countStartingTask })
        })
    ))

    addTask$ = createEffect(() => this.actions$.pipe(
        ofType(addTask),
        exhaustMap(async (task) => {
            const taskAdded = await this.taskService.addtask({ title: task.title })
            return setTask({ task: taskAdded })
        })
    ))

    updateTask$ = createEffect(() => this.actions$.pipe(
        ofType(updateTask),
        exhaustMap(async (task) => {
            const taskUpdated = await this.taskService.updateTask({ title: task.title, id: task.id })
            return setTask({ task: taskUpdated })
        })
    ))

    deleteTask$ = createEffect(() => this.actions$.pipe(
        ofType(deleteTask),
        exhaustMap(async (task) => {
            const taskDeleted = await this.taskService.deleteTask(task.id)
            return setTask({ task: taskDeleted })
        })
    ))

    finishTask$ = createEffect(() => this.actions$.pipe(
        ofType(finishTask),
        exhaustMap(async (task) => {
            const taskFinished = await this.taskService.finishTask({ id: task.id, isFinish: task.isFinish })
            return setTask({ task: taskFinished })
        })
    ))

    countStartingTask$ = createEffect(() => this.actions$.pipe(
        ofType(getcountStartingTask),
        exhaustMap(async () => {
            const countStartingTask = await this.taskService.countStartingTask()
            return setcountStartingTask({ countStartingTask })
        })
    ))
}