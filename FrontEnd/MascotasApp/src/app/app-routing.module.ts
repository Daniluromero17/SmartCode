import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { SettingsComponent } from './settings/settings.component';
import { SigninComponent } from './signin/signin.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  {path:'', redirectTo: 'dashboard' , pathMatch:'full'},
   {path:'dashboard', component: DashboardComponent},
   {path:'products', component: ProductsComponent},
   {path:'statistics', component: StatisticsComponent},
   {path:'settings', component: SettingsComponent},
   {path:'login', component: LoginComponent},
   {path:'signin', component: SigninComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
