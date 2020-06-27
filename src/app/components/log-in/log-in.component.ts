import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  public formLogin : any = {
    email: null,
    password: null
  };

  public formError : any = {
    email: null,
    password: null,
    message: null
  };

  constructor(
    public api: ApiService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.formError = { email: null, password: null, message: null };
    this.api.post('login', this.formLogin)
    .then( (success: any) => {
      this.formError.message = success.message;
      this.auth.login(success.data.profile, success.data.token);
    }, (fail: any) => {
      if(fail.status == 403) {
        this.formError = fail.errors;
      }
      this.formError.message = fail.message;
    });
  }

}
