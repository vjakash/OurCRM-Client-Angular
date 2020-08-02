import { Component, OnInit } from '@angular/core';
import { faPencilAlt  } from '@fortawesome/free-solid-svg-icons';
import {ServService} from '../services/serv.service';
import { ToastServiceService } from '../services/toast-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder,FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  displayLoader=true;
  obj;
  userData;
  edit=false;
  changePassword=false;
  employees=[];
  id;
  managers;
  details;
  password;
  constructor(private fb:FormBuilder,public serv:ServService,private toastService:ToastServiceService,private router:Router,private activeRoute:ActivatedRoute) {
    this.password=this.fb.group({
      password:this.fb.control('',[Validators.required]),
      confirmPassword:this.fb.control('',[Validators.required]),
    })
    this.details=this.fb.group({
      email:this.fb.control('',[Validators.required,Validators.email]),
      _id:this.fb.control('',[Validators.required]),
      // company:this.fb.control('',[Validators.required]),
      accountVerified:this.fb.control('',[]),
      firstName:this.fb.control('',[Validators.required]),
      lastName:this.fb.control(''),
      phone:this.fb.control(''),
      mobile:this.fb.control('',[Validators.required]),
      userType:this.fb.control('',[Validators.required]),
      accessRights:this.fb.control(['view'],[]),
      dob:this.fb.control(''),
      manager:this.fb.control('',[])
    });
    this.serv.getAllManagers().subscribe((data)=>{
      this.displayLoader=false;
      this.managers=data['managers'];
      this.userData=this.serv.getUserData();
      // console.log(this.userData);
      if(this.userData.data.userType!=='employee'){
        this.userData.data.accessRights=[];
        this.userData.data.manager='';
      }
      delete this.userData.data.company;
      delete this.userData.data.totalRevenue;
      delete this.userData.data.revenues;
      this.details.setValue(this.userData.data);
    },(err)=>{
      this.displayLoader=false;
      console.log(err);
    });
    
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
  updateProfile(){
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
        if( this.details.value.userType!=='employee'){
         delete this.details.value.accessRights;
         delete this.details.value.manager;
        }
        this.serv.updateProfile(this.details.value).subscribe((data)=>{
          this.displayLoader=false;
          this.showSuccess(data['message']);
          this.edit=false;
          this.router.navigate(['/dashboard/profile']);
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
  updatePassword(){
    if(this.password.valid){
      if(this.password.value.password===this.password.value.confirmPassword){
        delete this.password.value.confrimPassword;
        this.changePassword=false;
        this.serv.changePassword(this.password.value).subscribe((data)=>{
          this.showSuccess(data['message']);
        },(err)=>{
          console.log(err);
          this.showDanger(err.error['message']);
        })
      }else{
        this.showDanger('Password Didn"t match');
      }
    }else{
      this.showDanger('Fill the fields to change Password');
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
