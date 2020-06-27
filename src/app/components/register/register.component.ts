import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formRegister : any = {
    sex: null,
    firstname: null,
    lastname: null,
    phone: null,
    email: null,
    password: null,
    password_repeat: null,
  };

  public formError : any = {
    sex: null,
    firstname: null,
    lastname: null,
    phone: null,
    email: null,
    password: null,
    password_repeat: null,
    message: null
  };

  constructor(
    public api: ApiService,
    public auth: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  register() {
    this.formError = {
      sex: null,
      firstname: null,
      lastname: null,
      phone: null,
      email: null,
      password: null,
      password_repeat: null,
      message: null
    };
    this.api.post('signin', this.formRegister)
    .then( (success: any) => {
      console.log(success);
      this.login();
    }, (fail: any) => {
      if(fail.status == 403) {
        this.formError = fail.errors;
      }
      this.formError.message = fail.message;
    });
  }

  login() {
    this.api.post('login', this.formRegister)
    .then( (success: any) => {
      console.log(success);
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
