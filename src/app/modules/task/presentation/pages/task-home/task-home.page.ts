import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { AddTaskComponent } from '../../components/add-task/add-task.component';
import { TaskHeaderComponent } from '../../components/task-header/task-header.component';
import { TaskBodyComponent } from '../../components/task-body/task-body.component';

@Component({
  selector: 'app-task-home',
  standalone: true,
  imports: [
    HeaderComponent,
    AddTaskComponent,
    TaskHeaderComponent,
    TaskBodyComponent
  ],
  templateUrl: './task-home.page.html',
  styleUrl: './task-home.page.css'
})
export class TaskHomeComponent {

}
