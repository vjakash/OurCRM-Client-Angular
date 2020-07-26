import { Component, OnInit } from '@angular/core';
import { faPencilAlt  } from '@fortawesome/free-solid-svg-icons';
import {ServService} from '../services/serv.service';
import { ToastServiceService } from '../services/toast-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder,FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-updatelead',
  templateUrl: './updatelead.component.html',
  styleUrls: ['./updatelead.component.css']
})
export class UpdateleadComponent implements OnInit {
  displayLoader=true;
  obj;
  leadDetails;
  employees=[];
  id;
  constructor(private fb:FormBuilder,private serv:ServService,private toastService:ToastServiceService,private router:Router,private activeRoute:ActivatedRoute) {
    
    this.id=this.activeRoute.snapshot.params.id;
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
    });
    this.serv.getLeadById(this.id).subscribe((data)=>{
      this.obj=data['lead'][0];
      delete this.obj['_id'];
      delete this.obj['ownerName'];
      delete this.obj['createdOn'];
      // console.log(this.obj);
      this.serv.getAllUsers().subscribe((data)=>{
        this.displayLoader=false;
        this.employees=data['users'];
        this.obj['owner']=this.employees.findIndex(item=>item.email===this.obj['owner']);
        this.leadDetails.setValue(this.obj);
      },(err)=>{
        this.displayLoader=false;
        console.log(err);
        this.showDanger(err.error['message']);
      });
    },(err)=>{
      console.log(err);
      this.showDanger(err.error['message']);
    })
   }

  ngOnInit(): void {
  }
  updateLead(){
    if(this.leadDetails.valid){
      this.displayLoader=true;
      this.leadDetails.value.ownerName=this.employees[this.leadDetails.value.owner].firstName+" "+this.employees[this.leadDetails.value.owner].lastName;
      this.leadDetails.value.owner=this.employees[this.leadDetails.value.owner].email;
      this.leadDetails.value['leadId']=this.id;
      // console.log(this.leadDetails.value);
      // console.log("createLead function",this.leadDetails);
      this.serv.updateLead(this.leadDetails.value).subscribe((data)=>{
        this.displayLoader=false;
        this.showSuccess(data['message']);
        this.router.navigate(['/dashboard/leads']);
      },(err)=>{
        this.displayLoader=false;
        console.log(err)
        this.showDanger(err.error['message']);
      });
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
