import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http:HttpClient) { }
  login(){
    this.http.get<any>('http://localhost:3000');
  }
}
