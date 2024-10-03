import { Component } from '@angular/core';
import { TaskBodyItemComponent } from '../task-body-item/task-body-item.component';

@Component({
  selector: 'app-task-body',
  standalone: true,
  imports: [
    TaskBodyItemComponent
  ],
  templateUrl: './task-body.component.html',
  styleUrl: './task-body.component.css'
})
export class TaskBodyComponent {
  taskList = [
    {
      title: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio, qui?",
      isFinish: false
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio, qui?ddd",
      isFinish: true
    }
  ]

  onDelete(title: any) {
    console.log("title",title)
  }

  onUpdate() {
    console.log("update title")
  }

}
