import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-renderer',
  templateUrl: './button-renderer.component.html',
  styleUrls: ['./button-renderer.component.scss']
})
export class ButtonRendererComponent implements ICellRendererAngularComp {

  params : any;
  label: string;
  class: string;
  icon: string;
  type: string;

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
    this.class = this.params.class || null;
    this.icon = this.params.icon || null;
    this.type = this.params.type || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);
    }
  }
}