import { Component, OnInit } from '@angular/core';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {



  isVisible: string;

  transactions: Array<[]>;
  statData: Array<[]>;

  isActive: string;
  activeClass: number;


  constructor( private swal: SweetAlertService) { }


  ngOnInit() {
    
  }

}
