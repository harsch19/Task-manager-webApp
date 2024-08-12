import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
    task: Task = {
        title: '',
        description: '',
        status: ''
    };

    constructor (
        private taskService: TaskService, 
        private router: Router
    ) { }

    addTask() {
        this.taskService.addTask(this.task).subscribe((task) => {
            console.log('Task added:', task);
            this.router.navigate(['/']);
        });
    }

    cancel() {
        this.router.navigate(['/']);
    }
}
