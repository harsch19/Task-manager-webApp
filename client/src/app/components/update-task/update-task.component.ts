import { Component, Inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormService } from 'src/app/services/form.service';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification-service.service';

@Component({
    selector: 'app-update-task',
    templateUrl: './update-task.component.html',
    styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
    taskForm: FormGroup;
    taskId: number;

    constructor(
        private taskService: TaskService,
        private formService: FormService,
        private dialogRef: MatDialogRef<UpdateTaskComponent>,
        private notificationService: NotificationService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.taskForm = this.formService.createTaskForm();
        this.taskId = data.taskId;
    }

    ngOnInit(): void {
        if (this.taskId) {
            this.taskService.getTask(this.taskId).subscribe((task) => {
                this.taskForm.patchValue(task);
            });
        }
    }

    updateTask() {
        if (this.taskId && this.taskForm.valid) {
            this.taskService.updateTask(this.taskId, this.taskForm.value).subscribe(() => {
                this.dialogRef.close();
                this.notificationService.notifyTaskEvent("Updated");
            });
        }
    }

    cancel() {
        this.dialogRef.close(); 
    }
}
