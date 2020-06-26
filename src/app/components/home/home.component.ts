import { Component, OnInit } from '@angular/core';

export interface Task {
  name: string;
  description: String;
  priority: String;
  expires: Number;
  status: Boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: Task[] = [
    { name: 'Tarea', description: 'Esto es una tarea', priority: 'Alta', expires: 87987987, status: false },
  ];

  displayedColumns: string[] = ['name', 'description', 'priority', 'expires', 'status'];
  dataSource = this.data;

  constructor() { }

  ngOnInit(): void {
  }

}
