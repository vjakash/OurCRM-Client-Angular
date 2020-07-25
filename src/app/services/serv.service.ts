import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
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
