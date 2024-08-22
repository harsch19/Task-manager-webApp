import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { TaskService } from '../../services/task.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification-service.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  taskForm: FormGroup;

  constructor(
    private formService: FormService,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<AddTaskComponent>,
    private notificationService: NotificationService
  ) {
    this.taskForm = this.formService.createTaskForm();
  }

  async addTask() {
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value).subscribe((task) => {
        console.log('Task added:', task);
        this.notificationService.notifyTaskAdded();
      });
      this.dialogRef.close();
    }
  } 

  cancel() {
    this.dialogRef.close(); 
  }
}
