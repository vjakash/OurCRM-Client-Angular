import { Component, OnInit } from '@angular/core';
import {ServService} from '../services/serv.service';
import { ToastServiceService } from '../services/toast-service.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {
id;
displayLoader=true;
leadData;
company;
message='';
constructor(public serv:ServService,private toastService:ToastServiceService,private router:Router,private activeRoute:ActivatedRoute) { 
  this.id=this.activeRoute.snapshot.params.id;
  this.company=this.activeRoute.snapshot.params.company;
  console.log(this.id);
  this.serv.getLeadById(this.id).subscribe((data)=>{
    this.displayLoader=false;
    this.leadData=data['lead'][0];
  },(err)=>{
    console.log(err);
    this.showDanger(err.error['message']);
  })
}


  ngOnInit(): void {
  }
  confirm(){
    let details={
      leadId:this.id, 
      company:this.company
    };
    this.displayLoader=true;
    this.serv.confirmOrder(details).subscribe((data)=>{
      this.displayLoader=false;
      this.showSuccess(data['message']);
      this.message=data['message'];
    },(err)=>{
      this.displayLoader=false;
      console.log(err);
      this.showDanger(err.error['message']);
      this.message=err.error['message'];
    })
  }
  cancel(){
        let details={
          leadId:this.id, 
          company:this.company
        };
        let cnfrm=confirm("Do you really want to cancel?");
        if(cnfrm){
          this.displayLoader=true;
          this.serv.cancelOrder(details).subscribe((data)=>{
            this.displayLoader=false;
            this.showSuccess(data['message']);
            this.message=data['message'];
          },(err)=>{
            this.displayLoader=false;
            console.log(err);
            this.showDanger(err.error['message']);
            this.message=err.error['message'];
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
