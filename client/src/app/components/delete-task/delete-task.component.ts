import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
    selector: 'app-delete-task',
    templateUrl: './delete-task.component.html',
    styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private taskService: TaskService
    ) { }

    ngOnInit(): void {
        this.deleteTask();
    }

    deleteTask(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.taskService.deleteTask(id).subscribe(() => {
                this.router.navigate(['/']);
            });
        }
    }
}
