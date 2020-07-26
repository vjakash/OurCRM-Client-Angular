import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ServService {
userType='';
  constructor(private http:HttpClient) { }
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
deleteLead(id){
  return this.http.delete(`${environment.serv_url}/deletelead/${id}`,{
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
  setToken(token){
    localStorage.setItem("token",token);
  }
  getToken(){
    return localStorage.getItem('token')
  }
  removeToken(){
    localStorage.removeItem('token');
  }
  setEmail(email){
    localStorage.setItem("email",email);
  }
  getEmail(){
    return localStorage.getItem('email')
  }
  removeEmail(){
    localStorage.removeItem('email');
  }



}
