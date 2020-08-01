import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder,FormControl, Validators} from '@angular/forms'
import {ServService} from '../services/serv.service';
import { ToastServiceService } from '../services/toast-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
credentials;
displayLoader=false;
  constructor(private fb:FormBuilder,private serv:ServService,private toastService:ToastServiceService,private router:Router) { 
    document.body.className="body-class";
    this.credentials=this.fb.group({
      email:this.fb.control('',[Validators.email,Validators.required]),
      password:this.fb.control('',[Validators.required])
    })
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    document.body.className="";
  }
login(){
  if(this.credentials.valid){
    // console.log("hello");
    this.displayLoader=true;
    this.serv.login(this.credentials.value).subscribe((data)=>{
      this.displayLoader=false;
      // console.log(data);
      this.showSuccess(data["message"]);
      this.serv.setToken(data['token']);
      this.serv.setEmail(data['email']);
      // console.log(data);
      this.serv.setUserData(data);
      this.router.navigate(['/dashboard']);
    },(err)=>{
      this.displayLoader=false;
      console.log(err);
      this.showDanger(err.error["message"]);
    });
  }
}

showStandard(msg) {
  this.toastService.show(msg);
}

showSuccess(msg) {
  this.toastService.show(msg, { classname: 'bg-success text-light', delay: 5000 });
}

showDanger(msg) {
  this.toastService.show(msg, { classname: 'bg-danger text-light', delay: 8000 });
}
}
