import { Component, OnInit } from '@angular/core';
import { faPencilAlt  } from '@fortawesome/free-solid-svg-icons';
import { faCheck   } from '@fortawesome/free-solid-svg-icons';
import {ServService} from '../services/serv.service';
import { ToastServiceService } from '../services/toast-service.service';
import { Router } from '@angular/router';
import {FormBuilder,FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  faPencilAlt = faPencilAlt;
  faCheck=faCheck;
  contacts=[];
  contactsOriginal=[];
  displayLoader=true;
  selectedContact=[];
  selectAllContacts=false;
  updateLeadStatus=false;
  activeLeadStatus='';
  activeLead='';
  searchString='';
  sortType='asc';
  sortBy='firstName';
  constructor(private fb:FormBuilder,private serv:ServService,private toastService:ToastServiceService,private router:Router) { 
    this.loadContacts();
  }

  ngOnInit(): void {
  }
  loadContacts(){
    this.serv.getAllContacts().subscribe((data)=>{
      this.displayLoader=false;
      this.contacts=data['contacts'].reverse().map(lead=>{lead.selected=false;return lead});
      this.contactsOriginal=[...this.contacts];
      // console.log(this.leads);
    },(err)=>{
      this.displayLoader=false;
      console.log(err);
    });
  }
  getSelectedContacts(){
    this.selectedContact=this.contacts.filter(item=>{if(item.selected)return item['_id']});
    // console.log(this.selectedLead);
  }
  selectAll(){
    if(this.selectAllContacts){
      this.contacts=this.contacts.map(lead=>{lead.selected=true;return lead});
      this.getSelectedContacts();
    }else{
      this.contacts=this.contacts.map(lead=>{lead.selected=false;return lead});
      this.getSelectedContacts();
    }
  }
  deleteContact(){
    let cnfrm=confirm("Do you really want to delete the selected leads?");
    if(cnfrm){
      if(this.selectedContact.length!=0){
        for(let i of this.selectedContact){
          this.displayLoader=true;
          this.serv.deleteContact(i['_id']).subscribe((data)=>{
            this.showSuccess(data['message']);
            this.selectAllContacts=false;
            this.selectedContact=[];
            this.loadContacts();
          },(err)=>{
            console.log(err);
            this.showDanger(err.error['message']);
            this.loadContacts();
          })
        }
      }
    }
  }
  sort(){
    if(this.sortType=='asc'){
      if(this.sortBy=='creationTime'){
        this.contacts=this.contactsOriginal;
      }else{
        this.contacts=this.contacts.sort((a,b)=>{
          if(a[this.sortBy].toLowerCase()>b[this.sortBy].toLowerCase()){
            return 1;
          }
          if(a[this.sortBy].toLowerCase()<b[this.sortBy].toLowerCase()){
            return -1;
          }
            return 0;
          });
      }
    }else{
      if(this.sortBy=='creationTime'){
        this.contacts=[...this.contactsOriginal];
        this.contacts=this.contacts.reverse();
      }else{
        this.contacts=this.contacts.sort((a,b)=>{
          if(a[this.sortBy].toLowerCase()>b[this.sortBy].toLowerCase()){
            return -1;
          }
          if(a[this.sortBy].toLowerCase()<b[this.sortBy].toLowerCase()){
            return 1;
          }
            return 0;
          });
      }
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
