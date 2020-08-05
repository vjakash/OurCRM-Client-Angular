import { Component, OnInit } from '@angular/core';
import { faPencilAlt  } from '@fortawesome/free-solid-svg-icons';
import {ServService} from '../services/serv.service';
import { ToastServiceService } from '../services/toast-service.service';
import { Router } from '@angular/router';
import {FormBuilder,FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-addservicerequests',
  templateUrl: './addservicerequests.component.html',
  styleUrls: ['./addservicerequests.component.css']
})
export class AddservicerequestsComponent implements OnInit {
  serviceRequestDetail;
  displayLoader=true;
  employees=[];
  contacts=[];
  selectedContact=0;
    constructor(private fb:FormBuilder,private serv:ServService,private toastService:ToastServiceService,private router:Router) {
      this.serviceRequestDetail=this.fb.group({
        contact:this.fb.group({
          _id:this.fb.control('',[Validators.required]),
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
          ownerName:this.fb.control('',[]),
          createdOn:this.fb.control('',[])
        }),
        description:this.fb.control('',[Validators.required]),
        requestTitle:this.fb.control('',[Validators.required]),
        requestStatus:this.fb.control('New',[Validators.required]),
      })
      this.serv.getAllContacts().subscribe((data)=>{
        this.contacts=data['contacts'];
        this.setContactValue();
        console.log(this.serviceRequestDetail.controls);
        this.displayLoader=false;
      },(err)=>{
        this.displayLoader=false;
        this.showDanger(err.error['message']);
      })
     }
  
    ngOnInit(): void {
    }
    createRequest(){
      if(this.serviceRequestDetail.valid){
        // console.log(this.serviceRequestDetail.value);
        this.displayLoader=true;
        this.serv.createServiceRequest(this.serviceRequestDetail.value).subscribe((data)=>{
          this.displayLoader=false;
          this.showSuccess(data['message']);
          this.router.navigate(['/dashboard/servicerequests']);
        },(err)=>{
          this.displayLoader=false;
          this.showDanger(err.error['message']);
        })
      }else{
        this.showDanger('Enter all required details');
      }
    }

    setContactValue(){
      // console.log(this.selectedContact);
      this.serviceRequestDetail.controls.contact.setValue(this.contacts[this.selectedContact]);
      // console.log(this.serviceRequestDetail.controls.contact.value)
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
