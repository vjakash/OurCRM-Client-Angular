import { Component, OnInit } from '@angular/core';
import { faPencilAlt  } from '@fortawesome/free-solid-svg-icons';
import {ServService} from '../services/serv.service';
import { ToastServiceService } from '../services/toast-service.service';
import { Router } from '@angular/router';
import {FormBuilder,FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-addlead',
  templateUrl: './addlead.component.html',
  styleUrls: ['./addlead.component.css']
})
export class AddleadComponent implements OnInit {
leadDetails;
displayLoader=true;
employees=[];
  constructor(private fb:FormBuilder,private serv:ServService,private toastService:ToastServiceService,private router:Router) {

    this.serv.getAllEmployees().subscribe((data)=>{
      this.displayLoader=false;
        this.employees=data['users'];
    },(err)=>{
      this.displayLoader=false;
      this.showDanger(err.error['message']);
    })
    this.leadDetails=this.fb.group({
      owner:this.fb.control('',[Validators.required]),
      company:this.fb.control('',[Validators.required]),
      firstName:this.fb.control('',[Validators.required]),
      lastName:this.fb.control(''),
      email:this.fb.control('',[Validators.required,Validators.email]),
      title:this.fb.control('',[Validators.required]),
      phone:this.fb.control(''),
      mobile:this.fb.control('',[Validators.required]),
      leadSource:this.fb.control('',[Validators.required]),
      leadStatus:this.fb.control('',[Validators.required]),
      secondaryEmail:this.fb.control('',[]),
    })
   }

  ngOnInit(): void {
  }
  createLead(){
    if(this.leadDetails.valid){
      this.displayLoader=true;
      this.leadDetails.value.ownerName=this.employees[this.leadDetails.value.owner].firstName+" "+this.employees[this.leadDetails.value.owner].lastName;
      this.leadDetails.value.owner=this.employees[this.leadDetails.value.owner].email;
      console.log("createLead function",this.leadDetails);
      this.serv.createLead(this.leadDetails.value).subscribe((data)=>{
        this.displayLoader=false;
        this.showSuccess(data['message']);
        this.router.navigate(['/dashboard/leads']);
      },(err)=>{
        this.displayLoader=false;
        this.showDanger(err.error['message']);
      })
    }else{
      this.showDanger('Enter all required details');
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
