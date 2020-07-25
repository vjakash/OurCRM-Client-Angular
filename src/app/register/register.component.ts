import { Component, OnInit, OnDestroy } from '@angular/core';
import {ServService} from '../services/serv.service';
import { ToastServiceService } from '../services/toast-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder,FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {
details;
displayLoader=false;
  constructor(private fb:FormBuilder,private serv:ServService,private toastService:ToastServiceService,private router:Router,private activeRoute:ActivatedRoute) { 
    document.body.className="body-class";
    this.details=this.fb.group({
      email:this.fb.control('',[Validators.required,Validators.email]),
      firstName:this.fb.control('',[Validators.required]),
      lastName:this.fb.control(''),
      phone:this.fb.control(''),
      mobile:this.fb.control('',[Validators.required]),
      userType:this.fb.control('',[Validators.required]),
      password:this.fb.control('',[Validators.required]),
      confirmPassword:this.fb.control('',[Validators.required]),
      dob:this.fb.control(''),
      employeeId:this.fb.control('',[Validators.required])
    })
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    document.body.className="";
  }
  register(){
    if(this.details.valid){
      if(this.details.value.password===this.details.value.confirmPassword){
        this.displayLoader=true;
        this.serv.register(this.details.value).subscribe((data)=>{
          this.displayLoader=false;
          this.showSuccess(data['message']);
          this.router.navigate(['/']);
        },(err)=>{
          this.displayLoader=false;
          if(err.error){
            this.showDanger(err.error['message']);
          }
          else
          console.log(err);
        })
      }else{
        alert("Password does not match");
      }
    }else{
      alert("Fill all fileds");
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
