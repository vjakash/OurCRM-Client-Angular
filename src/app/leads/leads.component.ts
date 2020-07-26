import { Component, OnInit } from '@angular/core';
import { faPencilAlt  } from '@fortawesome/free-solid-svg-icons';
import { faCheck   } from '@fortawesome/free-solid-svg-icons';
import {ServService} from '../services/serv.service';
import { ToastServiceService } from '../services/toast-service.service';
import { Router } from '@angular/router';
import {FormBuilder,FormControl, Validators} from '@angular/forms';
import { build$ } from 'protractor/built/element';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {
  faPencilAlt = faPencilAlt;
  faCheck=faCheck;
  leads=[];
  displayLoader=true;
  selectedLead=[];
  selectAllLeads=false;
  updateLeadStatus=false;
  activeLeadStatus='';
  activeLead='';
  constructor(private fb:FormBuilder,private serv:ServService,private toastService:ToastServiceService,private router:Router) { 
    this.loadLeads();
  }

  ngOnInit(): void {
  }
  loadLeads(){
    this.serv.getAllLeads().subscribe((data)=>{
      this.displayLoader=false;
      this.leads=data['leads'].reverse().map(lead=>{lead.selected=false;return lead});
      // console.log(this.leads);
    },(err)=>{
      this.displayLoader=false;
      console.log(err);
    });
  }
  getSelectedLeads(){
    this.selectedLead=this.leads.filter(item=>{if(item.selected)return item['_id']});
    // console.log(this.selectedLead);
  }
  selectAll(){
    if(this.selectAllLeads){
      this.leads=this.leads.map(lead=>{lead.selected=true;return lead});
      this.getSelectedLeads();
    }else{
      this.leads=this.leads.map(lead=>{lead.selected=false;return lead});
      this.getSelectedLeads();
    }
  }
  deleteLead(){
    let cnfrm=confirm("Do you really want to delete the selected leads?");
    if(cnfrm){
      if(this.selectedLead.length!=0){
        for(let i of this.selectedLead){
          this.displayLoader=true;
          this.serv.deleteLead(i['_id']).subscribe((data)=>{
            this.showSuccess(data['message']);
            this.selectAllLeads=false;
            this.selectedLead=[];
            this.loadLeads();
          },(err)=>{
            console.log(err);
            this.showDanger(err.error['message']);
          })
        }
      }
    }
  }
  updateStatus( leadId, leadStatus,currentStatus){
    if(leadStatus!==currentStatus){
        this.displayLoader=true;
        this.serv.updateLeadStatus({ leadId, leadStatus}).subscribe((data)=>{
             this.showSuccess(data['message']);
             this.updateLeadStatus=!this.updateLeadStatus;
             this.activeLead='';
             this.activeLeadStatus='';
              this.loadLeads();
        },(err)=>{
          console.log(err);
              this.showDanger(err.error['message']);
          })
    }else{
      this.activeLead='';
      this.activeLeadStatus='';
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
