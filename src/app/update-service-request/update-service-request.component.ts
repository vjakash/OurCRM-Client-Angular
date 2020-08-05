import { Component, OnInit } from '@angular/core';
import { faPencilAlt  } from '@fortawesome/free-solid-svg-icons';
import {ServService} from '../services/serv.service';
import { ToastServiceService } from '../services/toast-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder,FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-update-service-request',
  templateUrl: './update-service-request.component.html',
  styleUrls: ['./update-service-request.component.css']
})
export class UpdateServiceRequestComponent implements OnInit {
  serviceRequestDetail;
  displayLoader=true;
  contacts=[];
  selectedContact=0;
  serviceRequest;
  id;
  constructor(private fb:FormBuilder,private serv:ServService,private toastService:ToastServiceService,private router:Router,private activeRoute:ActivatedRoute) {
    this.id=this.activeRoute.snapshot.params.id;
    
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
    this.serv.getServiceRequestById(this.id).subscribe((data)=>{
      this.serviceRequest=data['serviceRequest'][0];
      delete this.serviceRequest['_id'];
      delete this.serviceRequest['createdOn'];
      // console.log(this.serviceRequest)
      this.serviceRequestDetail.setValue(this.serviceRequest);
      this.serv.getAllContacts().subscribe((data)=>{
        this.contacts=data['contacts'];
        this.contacts.forEach((item,index)=>{
          if(item.email===this.serviceRequest.contact.email){
            // console.log(item.email,this.serviceRequest.contact.email)
            this.selectedContact=Number(index);
          }
        });
        // console.log(this.selectedContact)
        this.displayLoader=false;
      },(err)=>{
        this.displayLoader=false;
        this.showDanger(err.error['message']);
      })
    })
   }
   Update(){
    if(this.serviceRequestDetail.valid){
      this.displayLoader=true;
      this.serviceRequestDetail.value.serviceRequestsId=this.id;
      // console.log(this.serviceRequestDetail.value);
      this.serv.updateServiceRequest(this.serviceRequestDetail.value).subscribe((data)=>{
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
  ngOnInit(): void {
  }
  setContactValue(){
    this.serviceRequestDetail.controls.contact.setValue(this.contacts[this.selectedContact]);
    // console.log(this.serviceRequestDetail.controls.contact)
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
