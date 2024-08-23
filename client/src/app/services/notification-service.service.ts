import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private taskEventSource = new Subject<string>();

  taskEvent$ = this.taskEventSource.asObservable();

  notifyTaskEvent(event: string) {
    this.taskEventSource.next(event);
  }
}
