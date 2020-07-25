import { Component, OnInit, OnDestroy } from '@angular/core';
import {ServService} from '../services/serv.service';
import { ToastServiceService } from '../services/toast-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit,OnDestroy {
email='';
displayLoader=false;
  constructor(private serv:ServService,private toastService:ToastServiceService,private router:Router) {
    document.body.className="body-class";
   }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    document.body.className="";
  }
  reset(){
    if(this.email!==''){
      this.displayLoader=true;
      this.serv.forgotPassword(this.email).subscribe((data)=>{
        this.displayLoader=false;
        this.showSuccess(data['message']);
        this.router.navigate(['/']);
      },(err)=>{
        this.displayLoader=false;
        this.showDanger(err.error['message'])
      })
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
