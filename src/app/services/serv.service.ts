import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ServService {
  constructor(private http: HttpClient, private router: Router) { }
  login(credentials){
    return this.http.post(`${environment.serv_url}/login`,credentials);
  }
  forgotPassword(email){
    return this.http.post(`${environment.serv_url}/forgotpassword`,{email});
  }
  resetPassword(password){
    return this.http.post(`${environment.serv_url}/resetpassword`,password);
  }
  register(details){
    return this.http.post(`${environment.serv_url}/register`,details);
  }
  verifyAccount(details){
    return this.http.post(`${environment.serv_url}/accountverification`,details);
  }

//leads
getAllLeads(){
  return this.http.get(`${environment.serv_url}/listlead`,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    }),
  });
}
getLeadById(id){
  return this.http.get(`${environment.serv_url}/listlead/${id}`,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    }),
  });
}
createLead(details){
  return this.http.post(`${environment.serv_url}/createlead`,details,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    }),
  });
}
updateLead(details){
  return this.http.put(`${environment.serv_url}/updatelead`,details,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    }),
  });
}
updateLeadStatus(details){
  return this.http.put(`${environment.serv_url}/updateleadstatus`,details,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    }),
  });
}
confirmLead(details){
  return this.http.put(`${environment.serv_url}/leadconfirmed`,details,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    }),
  });
}
deleteLead(id){
  return this.http.delete(`${environment.serv_url}/deletelead/${id}`,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    }),
  });
}
//final-part
confirmOrder(details){
  return this.http.post(`${environment.serv_url}/orderconfirmed`,details,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    }),
  });
}
cancelOrder(details){
  return this.http.post(`${environment.serv_url}/ordercancelled`,details,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    }),
  });
}
managerConfirmed(details){
  return this.http.post(`${environment.serv_url}/managerconfirmed`,details,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    }),
  });
}
managerCancelled(details){
  return this.http.post(`${environment.serv_url}/managercancelled`,details,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    }),
  });
}
// contacts
getAllContacts(){
  return this.http.get(`${environment.serv_url}/listcontacts`,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    }),
  });
}
getContactById(id){
  return this.http.get(`${environment.serv_url}/listcontacts/${id}`,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    }),
  });
}
createContact(details){
  return this.http.post(`${environment.serv_url}/createcontact`,details,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    }),
  });
}
updateContact(details){
  return this.http.put(`${environment.serv_url}/updatecontact`,details,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    }),
  });
}
deleteContact(id){
  return this.http.delete(`${environment.serv_url}/deletecontact/${id}`,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    }),
  });
}
//users
getAllUsers(){
  return this.http.get(`${environment.serv_url}/getallusers`,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    }),
  });
}
getAllEmployees(){
  return this.http.get(`${environment.serv_url}/getallusers/employees`,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    }),
  });
}
getAllManagers(){
  return this.http.get(`${environment.serv_url}/getallusers/managers`,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    }),
  });
}
addUser(details){
  return this.http.post(`${environment.serv_url}/register/adduser`,details,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    })
  });
}
updateAccesRights(details){
  return this.http.put(`${environment.serv_url}/updateaccessrights`,details,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    }),
  });
}
updateUserType(details){
  return this.http.put(`${environment.serv_url}/updateusertype`,details,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    }),
  });
}
updateProfile(details){
  return this.http.put(`${environment.serv_url}/updateprofile`,details,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    }),
  });
}
deleteUser(id){
  return this.http.delete(`${environment.serv_url}/deleteuser/${id}`,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    }),
  });
}
changePassword(details){
  details.email=this.getEmail();
  return this.http.post(`${environment.serv_url}/changepassword`,details,{
    headers: new HttpHeaders({
      authorization: this.getToken(),
    })
  });
}


//localStorage
  setToken(token){
    localStorage.setItem("token",window.btoa(token));
  }
  getToken(){
    return window.atob(localStorage.getItem('token'))
  }
  removeToken(){
    localStorage.removeItem('token');
  }
  setEmail(email){
    localStorage.setItem("email", window.btoa(email));
  }
  getEmail(){
    return window.atob(localStorage.getItem('email'))
  }
  removeEmail(){
    localStorage.removeItem('email');
  }
  setUserData(details){
    details=JSON.stringify(details);
      localStorage.setItem('userData',window.btoa(details));
  }
  getUserData(){
    return JSON.parse(window.atob(localStorage.getItem('userData')));
  }
  removeUserDetails(){
    localStorage.removeItem('userData');
  }
  signOut(){
    this.removeToken();
    this.removeEmail();
    this.removeUserDetails();
    this.router.navigate(['/']);
  }


}
