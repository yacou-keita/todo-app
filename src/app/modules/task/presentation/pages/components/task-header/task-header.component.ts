import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgClass } from '@angular/common';
import { Observable } from 'rxjs';
import { AppState, selectTaskListLength } from '../../../states-management/task.selector';
import { getTaskList, searchTaskList } from '../../../states-management/task.action';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-header',
  standalone: true,
  imports: [
    DropdownModule,
    AsyncPipe,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './task-header.component.html',
  styleUrl: './task-header.component.css'
})
export class TaskHeaderComponent {

  constructor(private readonly store: Store<AppState>) { }

  filterOptionFrom = new FormControl<boolean | undefined>(undefined, { nonNullable: true })
  searchOptionFrom = new FormControl<string>("", { nonNullable: true })
  filterOptionList = [
    { value: undefined, label: "Toutes les tâches" },
    { value: true, label: "Tâches terminées" },
    { value: false, label: "Tâches Incomplètes" },
  ]
  taskListLength$: Observable<number> = this.store.select(selectTaskListLength)

  runSearchTask() {
    this.store.dispatch(searchTaskList({ title: this.searchOptionFrom.value }))
  }

  runGetTaskList() {
    const isFinish = this.filterOptionFrom.value
    this.store.dispatch(getTaskList({ isFinish }))
  }

  isActiveItem(filterOption?: boolean) {
    return this.filterOptionFrom.value === filterOption
  }

}
