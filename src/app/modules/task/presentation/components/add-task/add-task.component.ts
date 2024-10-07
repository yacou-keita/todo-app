import { Component, EventEmitter, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { AppState } from '../../states-management/task.selector';
import { addTask, getTaskList, updateTask } from '../../states-management/task.action';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {

  constructor(private readonly store: Store<AppState>) { }

  addTaskFrom = new FormControl<string>("", { nonNullable: true, validators: [Validators.required] })

  runAddTask() {
    this.store.dispatch(addTask({ title: this.addTaskFrom.value }))
    this.addTaskFrom.reset()
    this.runGetTaskList()
  }

  runGetTaskList() {
    this.store.dispatch(getTaskList({}))
  }

}
