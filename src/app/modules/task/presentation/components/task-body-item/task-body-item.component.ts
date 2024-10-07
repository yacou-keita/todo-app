import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { deleteTask, finishTask, getTaskList, updateTask } from '../../states-management/task.action';
import { AppState, selectfilterOption } from '../../states-management/task.selector';
import { Store } from '@ngrx/store';
import { TaskResponseDTO } from '../../dtos/taskResponse.dto';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-task-body-item',
  standalone: true,
  imports: [
    NgClass,
    TooltipModule,
    CheckboxModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  templateUrl: './task-body-item.component.html',
  styleUrl: './task-body-item.component.css'
})
export class TaskBodyItemComponent {

  constructor(
    private readonly store: Store<AppState>,
    private readonly confirmationService: ConfirmationService
  ) {

  }

  @Input({ required: true }) task: TaskResponseDTO = {} as TaskResponseDTO

  checkboxFrom = new FormControl<boolean>(false, { nonNullable: true })
  filterOption$: Observable<boolean | undefined> = this.store.select(selectfilterOption)
  isEditModaleVisible: boolean = false
  updateTaskFrom = new FormControl<string>("", { nonNullable: true, validators: [Validators.required] })


  openDeletePopUp(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Êtes-vous sûr de vouloir supprimer des cette tâche ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel: "Oui",
      rejectLabel: "Non",
      rejectButtonStyleClass: "text-red-default mr-10",
      acceptButtonStyleClass: "text-green-default",
      accept: () => this.runDeleteTask()
    });
  }

  openModal() {
    this.isEditModaleVisible = true
    this.updateTaskFrom.patchValue(this.task.title)
  }

  closeModal() {
    this.isEditModaleVisible = false
  }

  runUpdateTask() {
    this.store.dispatch(updateTask({ title: this.updateTaskFrom.value, id: this.task.id }))
    this.handleFilterOption()
    this.closeModal()
  }

  runDeleteTask() {
    this.store.dispatch(deleteTask({ id: this.task.id }))
    this.handleFilterOption()
  }

  runFinishTask() {
    this.store.dispatch(finishTask({ id: this.task.id, isFinish: this.checkboxFrom.value }))
    this.handleFilterOption()
  }

  runGetTaskList(filterOption: { isFinish?: boolean }) {
    this.store.dispatch(getTaskList(filterOption))
  }

  handleFilterOption(): void {
    this.filterOption$.subscribe((filterOption) => this.runGetTaskList({ isFinish: filterOption }))
  }

}
