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
    this.notificationService.taskEvent$.subscribe((event) => {
      this.showAlert(`Success! Task ${event}.`);
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
