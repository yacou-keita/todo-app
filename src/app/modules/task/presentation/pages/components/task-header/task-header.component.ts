import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgClass } from '@angular/common';
import { Observable } from 'rxjs';
import { AppState, selectTaskListLength } from '../../../states-management/task.selector';
import { getTaskList } from '../../../states-management/task.action';

@Component({
  selector: 'app-task-header',
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass,
  ],
  templateUrl: './task-header.component.html',
  styleUrl: './task-header.component.css'
})
export class TaskHeaderComponent {

  constructor(private readonly store: Store<AppState>) { }

  filterOption?: boolean
  taskListLength$: Observable<number> = this.store.select(selectTaskListLength)
  

  runGetTaskList(isFinish?: boolean) {
    this.filterOption = isFinish
    this.store.dispatch(getTaskList({ isFinish }))
  }

  isActiveItem(filterOption?:boolean) {
    return this.filterOption === filterOption
  }

}
