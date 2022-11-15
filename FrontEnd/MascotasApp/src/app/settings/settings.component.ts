import { Component, OnInit } from '@angular/core';
import{ MatDialog} from '@angular/material/dialog'
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private diaalogRef :MatDialog) { }

  openDialog(){
    this.diaalogRef.open(LoginComponent);
  
    
   

  }

  ngOnInit(): void {
  }

}
