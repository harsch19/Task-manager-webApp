import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { NotificationService } from 'src/app/services/notification-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  alert: string | null = null;

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.notificationService.taskAdded$.subscribe(() => {
      this.showAlert('Success! Task Added.');
    });

    this.notificationService.taskUpdated$.subscribe(() => {
      this.showAlert('Success! Task Updated.');
    });

    this.notificationService.taskDeleted$.subscribe(() => {
      this.showAlert('Success! Task Deleted.');
    });
  }

  openAddTaskDialog() {
    this.dialog.open(AddTaskComponent);
  }

  closeAlert() {
    this.alert = null;
  }

  private showAlert(message: string) {
    this.alert = message;
    setTimeout(() => this.alert = null, 3000);
  }
}
