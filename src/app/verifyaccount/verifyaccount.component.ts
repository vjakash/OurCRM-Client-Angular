import { Component, OnInit, OnDestroy } from '@angular/core';
import {ServService} from '../services/serv.service';
import { ToastServiceService } from '../services/toast-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verifyaccount',
  templateUrl: './verifyaccount.component.html',
  styleUrls: ['./verifyaccount.component.css']
})
export class VerifyaccountComponent implements OnInit,OnDestroy {
  verificationToken;
  email;
  verificationDone=false;
  constructor(private serv:ServService,private toastService:ToastServiceService,private router:Router,private activeRoute:ActivatedRoute) { 
    document.body.className="body-class";
    this.verificationToken=this.activeRoute.snapshot.params.token;
    this.email=this.activeRoute.snapshot.params.email;
    this.serv.verifyAccount({verificationToken:this.verificationToken,email:this.email}).subscribe((data)=>{
      this.showSuccess(data['message']);
      this.verificationDone=true;
    },(err)=>{
      if(err.error){
        this.showDanger(err.error['message']);
      }
      else
      console.log(err);
    });
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    document.body.className="";
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
