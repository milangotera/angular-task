import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public api: string = `http://localhost:8080/api`;
  public headers: any;

  constructor(
    private http: HttpClient,
    public router: Router,
    public auth: AuthService
  ) { }

  setHeaders(){
    this.headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
  }

  post(path, data) {
    this.setHeaders();
    return new Promise((resolve, reject) => {
      this.http.post(`${this.api}/${path}`, data, { headers: this.headers })
      .subscribe(data => {
        resolve(data);
      }, error => {
        if(error.status == 401){
          this.auth.logout();
        }
        reject(error.error);
      });
    });
  }

  get(path) {
    this.setHeaders();
    return new Promise((resolve, reject) => {
      this.http.get(`${this.api}/${path}`, { headers: this.headers })
      .subscribe(data => {
        resolve(data);
      }, error => {
        if(error.status == 401){
          if(error.status == 401){
            this.auth.logout();
          }
        }
        reject(error.error);
      });
    });
  }

  put(path, data) {
    this.setHeaders();
    return new Promise((resolve, reject) => {
      this.http.put(`${this.api}/${path}`, data, { headers: this.headers })
      .subscribe(data => {
        resolve(data);
      }, error => {
        if(error.status == 401){
          if(error.status == 401){
            this.auth.logout();
          }
        }
        reject(error.error);
      });
    });
  }

  delete(path) {
    this.setHeaders();
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.api}/${path}`, { headers: this.headers })
      .subscribe(data => {
        resolve(data);
      }, error => {
        if(error.status == 401){
          if(error.status == 401){
            this.auth.logout();
          }
        }
        reject(error.error);
      });
    });
  }

}
