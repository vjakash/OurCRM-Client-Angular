import { Component, OnInit } from '@angular/core';
import { ServService } from '../services/serv.service';
import { ToastServiceService } from '../services/toast-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public serv:ServService,private toastService:ToastServiceService) { }

  ngOnInit(): void {
  }
signOut(){
  this.serv.signOut();
  this.showSuccess('Logged out')
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
