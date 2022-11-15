import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import{AuthService} from '../service/auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  constructor(public http:HttpClient) { }


  login(){
    console.log('ha iniciado session')
    this.http.get<any>('http://localhost:3000');
  }


  ngOnInit(): void {
  }

}
