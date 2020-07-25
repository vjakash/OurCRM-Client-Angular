import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { RegisterComponent } from './register/register.component';
import { VerifyaccountComponent } from './verifyaccount/verifyaccount.component';
import { AuthGuard } from './guards/auth.guard';


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
  canActivate:[AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
