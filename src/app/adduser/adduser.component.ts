import { Component, OnInit } from '@angular/core';
import {ServService} from '../services/serv.service';
import { ToastServiceService } from '../services/toast-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder,FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  details;
  displayLoader=true;
  managers;
    constructor(private fb:FormBuilder,public serv:ServService,private toastService:ToastServiceService,private router:Router,private activeRoute:ActivatedRoute) { 
      this.serv.getAllManagers().subscribe((data)=>{
        this.displayLoader=false;
        this.managers=data['managers'];
      },(err)=>{
        this.displayLoader=false;
        console.log(err);
      })
      this.details=this.fb.group({
        email:this.fb.control('',[Validators.required,Validators.email]),
        firstName:this.fb.control('',[Validators.required]),
        lastName:this.fb.control(''),
        phone:this.fb.control(''),
        mobile:this.fb.control('',[Validators.required]),
        userType:this.fb.control('',[Validators.required]),
        accessRights:this.fb.control(['view'],[]),
        dob:this.fb.control(''),
        manager:this.fb.control('',[])
      })
    }
  
    ngOnInit(): void {
    }
    addAccessRights(accessRight){
      let index=this.details.value.accessRights.indexOf(accessRight)
      if(index>-1){
        this.details.value.accessRights.splice(index,1);
      }else{
        this.details.value.accessRights.push(accessRight);
      }
      console.log( this.details.value.accessRights);
    }
    register(){
      if(this.details.valid){
        let company = this.details.value.email.split("@");
        company = company[1].split(".")[0];
        console.log(company,this.serv.getUserData().company)
        if(company!==this.serv.getUserData().company){
          alert("Enter a company Email Id");
          return;
        }
        this.managers.forEach(item=>{
          if(item.email===this.details.value.manager){
            this.details.value.managerName=`${item.firstName} ${item.lastName}`
          }
        })
          this.displayLoader=true;
          this.serv.addUser(this.details.value).subscribe((data)=>{
            this.displayLoader=false;
            this.showSuccess(data['message']);
            this.router.navigate(['/dashboard/users']);
          },(err)=>{
            this.displayLoader=false;
            if(err.error){
              this.showDanger(err.error['message']);
            }
            else
            console.log(err);
          })
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
