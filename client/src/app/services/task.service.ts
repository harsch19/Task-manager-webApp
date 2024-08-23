import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private apiUrl = 'http://localhost:5000/api/task';

    constructor(private http: HttpClient) { }

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.apiUrl}/getall`);
    }

    getTask(id: number): Observable<Task> {
        return this.http.get<Task>(`${this.apiUrl}/getbyid/${id}`);
    }

    addTask(task: Task): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/add`, task);
    }

    updateTask(id: number, task: Task): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/update/${id}`, task);
    }

    deleteTask(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }
}
