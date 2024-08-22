import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { NotificationService } from 'src/app/services/notification-service.service';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {
    tasks: Task[] = [];

    constructor(
        private taskService: TaskService,
        private dialogRef: MatDialog,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.displayTasks();

        this.notificationService.taskAdded$.subscribe(() => {
            this.displayTasks();
        });

        this.notificationService.taskUpdated$.subscribe(() => {
            this.displayTasks();
        });
      
        this.notificationService.taskDeleted$.subscribe(() => {
            this.displayTasks();
        });
    }

    displayTasks(): void {
        this.taskService.getTasks().subscribe((tasks) => {
            this.tasks = tasks;
        });
    }

    openUpdateTaskDialog(task: Task) {
        this.dialogRef.open(UpdateTaskComponent, {
          data: { taskId: task.id }
        });
    }

    deleteTask(task: Task): void {
        if (task.id) {
            this.taskService.deleteTask(task.id).subscribe(() => {
                this.notificationService.notifyTaskDeleted();
            });
        }
    }
    
}