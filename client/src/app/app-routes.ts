import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { DeleteTaskComponent } from './components/delete-task/delete-task.component';

const routes: Routes = [
    { path: '', component: TaskListComponent },
    { path: 'add-task', component: AddTaskComponent },
    { path: 'update-task/:id', component: UpdateTaskComponent },
    { path: 'delete-task/:id', component: DeleteTaskComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
