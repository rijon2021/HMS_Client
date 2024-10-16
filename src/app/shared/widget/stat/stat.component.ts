import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {

  @Input() title: string;
  @Input() total: string;
  @Input() inspectionCompleted: string;
  @Input() inspectionIncompleted: string;
  @Input() icon: string;
  @Input() count: number;

  constructor() { }

  ngOnInit() {
    
  }
  cardLink(id:number){

  }

}
