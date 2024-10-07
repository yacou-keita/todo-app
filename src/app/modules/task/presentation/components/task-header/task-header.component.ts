import { Component } from '@angular/core';
import { AppState, selectTaskList, selectTaskListLength } from '../../states-management/task.selector';
import { Store } from '@ngrx/store';
import { getTaskList } from '../../states-management/task.action';
import { AsyncPipe, NgClass } from '@angular/common';
import { TaskResponseDTO } from '../../dtos/taskResponse.dto';
import { Observable } from 'rxjs';

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
