import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskHomeComponent } from './modules/task/presentation/pages/task-home/task-home.page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TaskHomeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'to-do-app';
}
