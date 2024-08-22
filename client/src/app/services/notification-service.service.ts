import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private taskAddedSource = new Subject<void>();
  private taskUpdatedSource = new Subject<void>();
  private taskDeletedSource = new Subject<void>();

  taskAdded$ = this.taskAddedSource.asObservable();
  taskUpdated$ = this.taskUpdatedSource.asObservable();
  taskDeleted$ = this.taskDeletedSource.asObservable();

  notifyTaskAdded() {
    this.taskAddedSource.next();
  }

  notifyTaskUpdated() {
    this.taskUpdatedSource.next();
  }

  notifyTaskDeleted() {
    this.taskDeletedSource.next();
  }
}
