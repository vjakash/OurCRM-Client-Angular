import { Component, OnInit,ViewChild } from '@angular/core';
import { faPencilAlt  } from '@fortawesome/free-solid-svg-icons';
import { faCheck   } from '@fortawesome/free-solid-svg-icons';
import {ServService} from '../services/serv.service';
import { ToastServiceService } from '../services/toast-service.service';
import { Router } from '@angular/router';
import {FormBuilder,FormControl, Validators} from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-service-requests',
  templateUrl: './service-requests.component.html',
  styleUrls: ['./service-requests.component.css']
})
export class ServiceRequestsComponent implements OnInit {
  @ViewChild('content') content: any;
  faPencilAlt = faPencilAlt;
  faCheck=faCheck;
  leads=[];
  displayLoader=true;
  selectedService=[];
  // selectedLead=[];
  selectAllLeads=false;
  updateLeadStatus=false;
  activeLeadStatus='';
  activeLead='';
  activeIndex;
  closeResult = '';
  revenue=null;
  constructor(private modalService: NgbModal,private fb:FormBuilder,public serv:ServService,private toastService:ToastServiceService,private router:Router) { 
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
    this.selectedService=this.leads.filter(item=>{if(item.selected)return item['_id']});
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
      if(this.selectedService.length!=0){
        for(let i of this.selectedService){
          this.displayLoader=true;
          this.serv.deleteLead(i['_id']).subscribe((data)=>{
            this.showSuccess(data['message']);
            this.selectAllLeads=false;
            this.selectedService=[];
            this.loadLeads();
          },(err)=>{
            console.log(err);
            this.showDanger(err.error['message']);
          })
        }
      }
    }
  }
  updateStatus(index, leadId, leadStatus,currentStatus){
    this.activeIndex=index;
    if(leadStatus!==currentStatus){
      if(leadStatus==='Confirmed'){
        this.open(this.content);
        return;
      }
        this.sendStatus(index, leadId, leadStatus,currentStatus);
    }else{
      this.activeLead='';
      this.activeLeadStatus='';
      this.activeIndex=null;
      this.revenue==null;
    }
  }
  sendStatus(index, leadId, leadStatus,currentStatus){
      // this.displayLoader=true;
      let oldStatus=this.leads[index]['leadStatus'];
      this.leads[index]['leadStatus']=leadStatus;
      this.updateLeadStatus=!this.updateLeadStatus;
      this.activeLead='';
      this.activeLeadStatus='';
      this.activeIndex=null;
      this.serv.updateLeadStatus({ leadId, leadStatus}).subscribe((data)=>{
          this.showSuccess(data['message']);
            this.loadLeads();
      },(err)=>{
        console.log(err);
            this.showDanger(err.error['message']);
            this.leads[index]['leadStatus']=oldStatus;
        })
  }
  leadConfirmed(){
    let index =this.activeIndex;
    let leadId=this.activeLead;
    let leadStatus=this.activeLeadStatus;
    if(this.revenue!==0){
      let oldStatus=this.leads[index]['leadStatus'];
      this.leads[index]['leadStatus']=leadStatus;
      this.updateLeadStatus=!this.updateLeadStatus;
      this.activeLead='';
      this.activeLeadStatus='';
      this.activeIndex=null;
      this.serv.confirmLead({ leadId, leadStatus ,revenue:this.revenue}).subscribe((data)=>{
          this.showSuccess(data['message']);
            this.loadLeads();
            this.revenue=null;
      },(err)=>{
        console.log(err);
            this.showDanger(err.error['message']);
            this.leads[index]['leadStatus']=oldStatus;
            this.revenue=null;
        })
    }else{
      this.open(this.content);
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
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
