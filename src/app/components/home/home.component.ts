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
  status_lavel: String,
  warn: Boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'description', 'priority', 'date', 'status', 'id'];
  public dataSource: Task[] = [];

  public notification: Boolean = false;

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
      let milisecunds = new Date().getTime();
      let notification: Boolean = false;
      success.data.forEach(function (task) {
        let warn: Boolean = false;
        if(task.expires - milisecunds <= 3600 * 2 * 1000 && task.status == false){
          warn = true;
          notification = true;
        }
        tasks.push({
          id: task.id,
          name: task.name,
          description: task.description,
          priority: task.priority,
          expires: task.expires,
          date: new Date(task.expires).toLocaleString(),
          status_lavel: task.status ? 'Hecho' : 'Pendiente',
          status: task.status,
          warn: warn
        });
      });
      this.notification = notification;
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
