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
import { LoginGuardGuard } from './guards/login-guard.guard';
import { ContactsComponent } from './contacts/contacts.component';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { UpdatecontactComponent } from './updatecontact/updatecontact.component';
import { AdduserComponent } from './adduser/adduser.component';
import { UsersGuardGuard } from './guards/users-guard.guard';
import { UsersComponent } from './users/users.component';
import { UsershomeComponent } from './usershome/usershome.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { ManagerClosingLeadComponent } from './manager-closing-lead/manager-closing-lead.component';
import { ServiceRequestsComponent } from './service-requests/service-requests.component';


const routes: Routes = [{
  path:'',
  // path:'dashboard',
  component:LoginComponent,
  canActivate:[LoginGuardGuard]
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
    path:'profile',
    component:ProfileComponent
  },{
    path:'leads',
    component:LeadsComponent
  },{
    path:'addlead',
    component:AddleadComponent
  },{
    path:'updatelead/:id',
    component:UpdateleadComponent
  },{
    path:'contacts',
    component:ContactsComponent
  },{
    path:'addcontact',
    component:AddcontactComponent
  },{
    path:'updatecontact/:id',
    component:UpdatecontactComponent
  },{
    path:'users',
    component:UsershomeComponent,
    children:[{
      path:'',
      component:UsersComponent,
    },{
      path:'adduser',
      component:AdduserComponent,
    }],
    canActivate:[UsersGuardGuard]
  },{
    path:'servicerequests',
    component:ServiceRequestsComponent
  }]
},{
  path:'confirmorder/:company/:id',
  component:ConfirmOrderComponent
},{
  path:'verifyorder/:company/:id',
  component:ManagerClosingLeadComponent,
  canActivate:[AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
