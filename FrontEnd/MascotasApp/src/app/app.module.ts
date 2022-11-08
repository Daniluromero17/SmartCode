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
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OverlayModule,
    CdkMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
