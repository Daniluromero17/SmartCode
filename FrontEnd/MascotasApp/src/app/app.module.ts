import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { ProductsComponent } from './products/products.component';
import { SettingsComponent } from './settings/settings.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { HeaderComponent } from './header/header.component';
//angular material imports
import {OverlayModule} from '@angular/cdk/overlay'
import {CdkMenuModule} from '@angular/cdk/menu'
import {MatCardModule} from '@angular/material/card'
import {MatFormFieldModule} from '@angular/material/form-field';
import { SigninComponent } from './signin/signin.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component'
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
 
  declarations: [
    AppComponent,
    BodyComponent,
    DashboardComponent,
    PagesComponent,
    ProductsComponent,
    SettingsComponent,
    SidenavComponent,
    StatisticsComponent,
    HeaderComponent,
    SigninComponent,
    LoginComponent,
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OverlayModule,
    CdkMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule
   
   
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
