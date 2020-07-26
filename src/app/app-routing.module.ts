import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { RegisterComponent } from './register/register.component';
import { VerifyaccountComponent } from './verifyaccount/verifyaccount.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LeadsComponent } from './leads/leads.component';
import { AddleadComponent } from './addlead/addlead.component';
import { UpdateleadComponent } from './updatelead/updatelead.component';


const routes: Routes = [{
  path:'',
  // path:'dashboard',
  component:LoginComponent
},{
  path:'forgotpassword',
  component:ForgotpasswordComponent
},{
  path:'resetpassword/:token/:email',
  component:ResetpasswordComponent
},{
  path:'register',
  component:RegisterComponent
},{
  path:'verifyaccount/:token/:email',
  component:VerifyaccountComponent
},{
  path:'dashboard',
  component:DashboardComponent,
  canActivate:[AuthGuard],
  children:[{
    path:'',
    component:HomeComponent
  },{
    path:'leads',
    component:LeadsComponent
  },{
  path:'addlead',
  component:AddleadComponent
},{
  path:'updatelead/:id',
  component:UpdateleadComponent
}]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
