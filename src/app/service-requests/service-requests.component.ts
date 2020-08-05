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
  // @ViewChild('content1') content1: any;
  faPencilAlt = faPencilAlt;
  faCheck=faCheck;
  serviceRequests=[];
  displayLoader=true;
  selectedService=[];
  // selectedLead=[];
  requestsOriginal=[];
  selectAllRequests=false;
  updateRequestStatus=false;
  activeRequestStatus='';
  activeRequest='';
  activeIndex;
  closeResult = '';
  description='';
  searchString='';
  sortType='asc';
  sortBy='createdOn';
  revenue=null;
  constructor(private modalService: NgbModal,private fb:FormBuilder,public serv:ServService,private toastService:ToastServiceService,private router:Router) { 
    this.loadServiceRequests();
  }

  ngOnInit(): void {
  }
  loadServiceRequests(){
    this.serv.getAllServiceRequests().subscribe((data)=>{
      this.serviceRequests=data['serviceRequests'].reverse().map(lead=>{lead.selected=false;return lead});
      this.requestsOriginal=[...this.serviceRequests];
      this.sort();
      this.displayLoader=false;
      // console.log(this.leads);
    },(err)=>{
      this.displayLoader=false;
      console.log(err);
      this.showDanger(err.error['message']);
    });
  }
  getSelectedRequests(){
    this.selectedService=this.serviceRequests.filter(item=>{if(item.selected)return item['_id']});
    // console.log(this.selectedLead);
  }
  selectAll(){
    if(this.selectAllRequests){
      this.serviceRequests=this.serviceRequests.map(lead=>{lead.selected=true;return lead});
      this.getSelectedRequests();
    }else{
      this.serviceRequests=this.serviceRequests.map(lead=>{lead.selected=false;return lead});
      this.getSelectedRequests();
    }
  }
  deleteRequest(){
    let cnfrm=confirm("Do you really want to delete the selected leads?");
    if(cnfrm){
      if(this.selectedService.length!=0){
        for(let i of this.selectedService){
          this.displayLoader=true;
          this.serv.deleteServiceRequest(i['_id']).subscribe((data)=>{
            this.showSuccess(data['message']);
            this.selectAllRequests=false;
            this.selectedService=[];
            this.loadServiceRequests();
          },(err)=>{
            console.log(err);
            this.showDanger(err.error['message']);
          })
        }
      }
    }
  }
  updateStatus(index, serviceRequestsId, requestStatus,currentStatus){
    this.activeIndex=index;
    if(requestStatus!==currentStatus){
        // console.log(index, serviceRequestsId, requestStatus,currentStatus);
        this.sendStatus(index,serviceRequestsId, requestStatus,currentStatus);
    }else{
      this.activeRequest='';
      this.activeRequestStatus='';
      this.activeIndex=null;
      this.revenue==null;
    }
  }
  sendStatus(index, serviceRequestsId, requestStatus,currentStatus){
      // this.displayLoader=true;
      let oldStatus=this.serviceRequests[index]['requestStatus'];
      this.serviceRequests[index]['requestStatus']=requestStatus;
      this.updateRequestStatus=!this.updateRequestStatus;
      this.activeRequest='';
      this.activeRequestStatus='';
      this.activeIndex=null;
      this.serv.updateServiceRequestStatus({ serviceRequestsId, requestStatus}).subscribe((data)=>{
          this.showSuccess(data['message']);
            this.loadServiceRequests();
      },(err)=>{
        console.log(err);
            this.showDanger(err.error['message']);
            this.serviceRequests[index]['leadStatus']=oldStatus;
        })
  }

  showDescription(description){
    this.description=description;
    this.open(this.content);
  }
  sort(){
    let [str1,str2]=this.sortBy.split(":");
    // console.log(str1,str2,this.sortBy)
    if(this.sortType==='asc'){
      if(this.sortBy=='createdOn'){
        this.serviceRequests=this.requestsOriginal;
      }else{
        if(str1==='Contact'){
          this.serviceRequests.sort((a,b)=>{
            if(a.contact[str2].toLowerCase()<b.contact[str2].toLowerCase()){
              return -1;
            }else if(a.contact[str2].toLowerCase()>b.contact[str2].toLowerCase()){
              return 1;
            }
            return 0;
          });
        }else{
          this.serviceRequests.sort((a,b)=>{
            if(a[str1].toLowerCase()<b[str1].toLowerCase()){
              return -1;
            }else if(a[str1].toLowerCase()>b[str1].toLowerCase()){
              return 1;
            }
            return 0;
          });
        }
      }
    }else{
      if(this.sortBy=='createdOn'){
       
        this.serviceRequests=[...this.requestsOriginal];
        this.serviceRequests.reverse();;
      }else{
        if(str1==='Contact'){
          this.serviceRequests.sort((a,b)=>{
            if(a.contact[str2].toLowerCase()<b.contact[str2].toLowerCase()){
              return 1;
            }else if(a.contact[str2].toLowerCase()>b.contact[str2].toLowerCase()){
              return -1;
            }
            return 0;
          });
        }else{
          this.serviceRequests.sort((a,b)=>{
            if(a[str1].toLowerCase()<b[str1].toLowerCase()){
              return 1;
            }else if(a[str1].toLowerCase()>b[str1].toLowerCase()){
              return -1;
            }
            return 0;
          });
        }
      }
    }          
                 
                    
                
    // }else{
    //     if(str1==='Contact'){
    //       if(this.sortBy=='createdOn'){
    //         this.serviceRequests=[...this.requestsOriginal];
    //         this.serviceRequests.reverse();;
    //       }else{
            
    //   }
    // }
    // }
  
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
