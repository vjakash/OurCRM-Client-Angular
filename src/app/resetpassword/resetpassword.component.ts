import { Component, OnInit, OnDestroy } from '@angular/core';
import {ServService} from '../services/serv.service';
import { ToastServiceService } from '../services/toast-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder,FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit,OnDestroy {
passwords;
displayLoader=false;
passwordResetToken;
  constructor(private fb:FormBuilder,private serv:ServService,private toastService:ToastServiceService,private router:Router,private activeRoute:ActivatedRoute) { 
    document.body.className="body-class";
    this.passwords=this.fb.group({
      password:this.fb.control('',[Validators.required]),
      confirm_password:this.fb.control('',[Validators.required]),
      passwordResetToken:this.activeRoute.snapshot.params.token,
      email:this.activeRoute.snapshot.params.email
    })
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    document.body.className="";
  }
  reset(){
    if(this.passwords.valid && this.passwords.value.password===this.passwords.value.confirm_password){
      this.displayLoader=true;
      this.serv.resetPassword(this.passwords.value).subscribe((data)=>{
        this.displayLoader=false;
        this.showSuccess(data['message']);
        this.router.navigate(['/']);
      },(err)=>{
        this.displayLoader=false;
        if(err.error){
          this.showDanger(err.error['message']);
          this.router.navigate(['/forgotpassword']);
        }
        else
        console.log(err);
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
