import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';

@Component({
    selector: 'app-update-task',
    templateUrl: './update-task.component.html',
    styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
    task: Task = {
        title: '',
        description: '',
        status: ''
    };

    constructor(
        private route: ActivatedRoute, 
        private router: Router,
        private taskService: TaskService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id'); 
        if (id) {
        this.taskService.getTask(id).subscribe((task) => {
            this.task = task; 
        });
        }
    }

    updateTask() {
        const id = this.route.snapshot.paramMap.get('id'); 
        if (id) {
        this.taskService.updateTask(id, this.task).subscribe((task) => {
            console.log('Task updated:', task); 
            this.router.navigate(['/']);
        });
        }
    }
    
    cancel() {
        this.router.navigate(['/']);
    }
}
