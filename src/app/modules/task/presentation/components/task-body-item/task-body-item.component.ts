import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, output } from '@angular/core';

@Component({
  selector: 'app-task-body-item',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './task-body-item.component.html',
  styleUrl: './task-body-item.component.css'
})
export class TaskBodyItemComponent {

  @Input({ required: true }) title: string = ""
  @Input({ required: true }) isFinish: boolean = false
  @Output() onDelete = new EventEmitter<string>()
  @Output() onUpdate = new EventEmitter<void>()

  handlerDelete() {
    this.onDelete.emit(this.title)
  }

  handlerUpdate() {
    this.onUpdate.emit()
  }

}
