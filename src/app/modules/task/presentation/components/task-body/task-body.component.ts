import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { TaskBodyItemComponent } from '../task-body-item/task-body-item.component';
import { TaskResponseDTO } from '../../dtos/taskResponse.dto';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectTaskList } from '../../states-management/task.selector';
import { AsyncPipe } from '@angular/common';
import { getTaskList } from '../../states-management/task.action';

type CallBack = (message: string) => void

@Component({
  selector: 'app-task-body',
  standalone: true,
  imports: [
    TaskBodyItemComponent,
    AsyncPipe
  ],
  templateUrl: './task-body.component.html',
  styleUrl: './task-body.component.css'
})
export class TaskBodyComponent implements OnInit {

  constructor(
    private readonly store: Store<AppState>
  ) { }

  taskList$: Observable<TaskResponseDTO[]> = this.store.select(selectTaskList)
  

  ngOnInit(): void {
    this.runGetTaskList()
  }


  runGetTaskList(){
    this.store.dispatch(getTaskList({}))
  }


}
