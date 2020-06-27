import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskAddComponent } from '../task-add/task-add.component';

export interface Task {
  id: String;
  name: String;
  description: String;
  priority: String;
  expires: Number;
  date: String;
  status: Boolean;
  status_lavel: String
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'priority', 'date', 'status', 'id'];
  dataSource: Task[] = [];

  milisecunds = new Date().getTime();

  date = new Date();

  constructor(
    public api: ApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.listTask();
    }, 1000);
  }

  listTask() {
    this.api.get('task')
    .then( (success: any) => {
      let tasks : Task[] = [];
      success.data.forEach(function (task) {
        tasks.push({
          id: task.id,
          name: task.name,
          description: task.description,
          priority: task.priority,
          expires: task.expires,
          date: new Date(task.expires).toLocaleString(),
          status_lavel: task.status ? 'Hecho' : 'Pendiente',
          status: task.status,
        });
      }); 
      this.dataSource = tasks;
    });
  }

  showAdd(task = null) {
    const dialogRef = this.dialog.open(TaskAddComponent, { data: task });
    dialogRef.afterClosed().subscribe( result => {
      this.listTask();
    });
  }

}
