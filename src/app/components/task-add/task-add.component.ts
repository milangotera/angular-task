import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit {

  public formTask : any = {
    id: null,
    name: null,
    description: null,
    priority: null,
    expires: null,
    status: false,
  };

  public formError : any = {
    id: null,
    name: null,
    description: null,
    priority: null,
    expires: null,
    status: null,
    message: null
  };

  public expires: string = null;

  

  constructor(
    public api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TaskAddComponent>,
  ) { }

  ngOnInit(): void {
    let date = new Date();
    if (this.data) {
      date = new Date(this.data.expires);
      this.formTask = {
        id: this.data.id,
        name: this.data.name,
        description: this.data.description,
        priority: this.data.priority,
        status: this.data.status,
      };
    }
    this.formTask.expires = this.dateFormat(date);
  }

  create() {
    this.api.post('task',{
      name: this.formTask.name,
      description: this.formTask.description,
      priority:  this.formTask.priority,
      expires: new Date(this.formTask.expires).getTime(),
      status: this.formTask.status,
    })
    .then( (success: any) => {
      this.close();
    }, (fail: any) => {
      if(fail.status == 403) {
        this.formError = fail.errors;
      }
      this.formError.message = fail.message;
    });
  }

  edit () {
    this.api.put('task',{
      id: this.formTask.id,
      name: this.formTask.name,
      description: this.formTask.description,
      priority:  this.formTask.priority,
      expires: new Date(this.formTask.expires).getTime(),
      status: this.formTask.status,
    })
    .then( (success: any) => {
      this.close();
    }, (fail: any) => {
      if(fail.status == 403) {
        this.formError = fail.errors;
      }
      this.formError.message = fail.message;
    });
  }

  save() {
    this.formError = {
      id: null,
      name: null,
      description: null,
      priority: null,
      expires: null,
      status: null,
      message: null
    };
    if(this.data) {
      this.edit();
    } else {
      this.create();
    }
  }

  delete() {
    this.api.delete(`task/${this.formTask.id}`)
    .then( (success: any) => {
      this.close();
    }, (fail: any) => {
      if(fail.status == 403) {
        this.formError = fail.errors;
      }
      this.formError.message = fail.message;
    });
  }

  close() {
    this.dialogRef.close();
  }

  dateFormat(date){
    let Y = date.getFullYear();
    let M = date.getMonth() + 1;
    let D = date.getDate();
    let H = date.getHours();
    let S = date.getMinutes();
    if(M < 10) {
      M = "0"+M;
    }
    if(H < 10) {
      H = "0"+H;
    }
    if(S < 10) {
      S = "0"+S;
    }
    return `${Y}-${M}-${D}T${H}:${S}`;
  }

}
