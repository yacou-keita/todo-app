import { Component } from '@angular/core';
import { AppState, selectStartTaskListLength, selectTaskListLength } from '../../states-management/task.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-task-footer',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './task-footer.component.html',
  styleUrl: './task-footer.component.css'
})
export class TaskFooterComponent {

  constructor(private readonly store: Store<AppState>) { }

  filterOption?: boolean
  taskListLength$: Observable<number> = this.store.select(selectTaskListLength)
  startTaskListLength$: Observable<number> = this.store.select(selectStartTaskListLength)

}
