import { Component, OnInit } from '@angular/core';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import {
  AdminDashboard, AdminDashboardFileListUserWise,
  AdminDashboardFileTypeWise, AdminDashboardFileUserWise
} from 'src/app/core/models/cda/adminDashboard';
import { QueryObject } from 'src/app/core/models/core/queryObject';
import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  adminDashboard: AdminDashboard = new AdminDashboard();
  objAdminApplicationType: AdminDashboardFileTypeWise = new AdminDashboardFileTypeWise();
  selectedApplicationType: AdminDashboardFileTypeWise = new AdminDashboardFileTypeWise();

  isVisible: string;

  transactions: Array<[]>;
  statData: Array<[]>;

  isActive: string;
  activeClass: number;


  constructor( private swal: SweetAlertService) { }


  ngOnInit() {
    
  }

}
