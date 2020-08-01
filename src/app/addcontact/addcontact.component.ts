import { Component, OnInit } from '@angular/core';
import { faPencilAlt  } from '@fortawesome/free-solid-svg-icons';
import {ServService} from '../services/serv.service';
import { ToastServiceService } from '../services/toast-service.service';
import { Router } from '@angular/router';
import {FormBuilder,FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css']
})
export class AddcontactComponent implements OnInit {

  contactDetails;
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
      this.contactDetails=this.fb.group({
        owner:this.fb.control('',[Validators.required]),
        company:this.fb.control('',[Validators.required]),
        firstName:this.fb.control('',[Validators.required]),
        lastName:this.fb.control(''),
        email:this.fb.control('',[Validators.required,Validators.email]),
        title:this.fb.control('',[Validators.required]),
        phone:this.fb.control(''),
        mobile:this.fb.control('',[Validators.required]),
        contactSource:this.fb.control('',[Validators.required]),
        secondaryEmail:this.fb.control('',[]),
      })
     }
  
    ngOnInit(): void {
    }
    createContact(){
      if(this.contactDetails.valid){
        this.displayLoader=true;
        this.contactDetails.value.ownerName=this.employees[this.contactDetails.value.owner].firstName+" "+this.employees[this.contactDetails.value.owner].lastName;
        this.contactDetails.value.owner=this.employees[this.contactDetails.value.owner].email;
        // console.log("createLead function",this.contactDetails);
        this.serv.createContact(this.contactDetails.value).subscribe((data)=>{
          this.displayLoader=false;
          this.showSuccess(data['message']);
          this.router.navigate(['/dashboard/contacts']);
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
