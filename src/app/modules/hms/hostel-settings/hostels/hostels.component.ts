import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import {  HttpReturnStatus } from 'src/app/core/enums/globalEnum';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { BaseStatus } from 'src/app/core/models/hms/hostel-settings/baseStatus';
import { Hostels } from 'src/app/core/models/hms/hostel-settings/hostels';
import { BaseStatusDataService } from 'src/app/core/services/hms/hostel-settings/base-status';
import { HostelsService } from 'src/app/core/services/hms/hostel-settings/hostels.service';
@Component({
  selector: 'app-hostels',
  templateUrl: './hostels.component.html',
  styleUrls: ['./hostels.component.css'],
})
export class HostelsComponent implements OnInit {

  @ViewChild("modalHostels") modalHostels: TemplateRef<any>;

  lstHostels: Hostels[] = new Array<Hostels>();
  lstStatus: BaseStatus[] = new Array<BaseStatus>();
  objHostels: Hostels = new Hostels();
  selectedHostels: Hostels = new Hostels();

  public pageModel: PageModel;

  private gridApi;
  private gridColumnApi;
  columnDefs = dataColumnDefs;
  gridOptions: GridOptions = {
    pagination: true,
    rowSelection: 'single',
    suppressDragLeaveHidesColumns: true,
    suppressPropertyNamesCheck: true,
    suppressRowDrag: false,
    rowDragManaged: true,
    getRowHeight: () => 40,
    defaultColDef: dataDefaultColDef,
  }


  constructor(
    private hostelsService: HostelsService,
    private baseStatusDataService: BaseStatusDataService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal,
    private datePipe: DatePipe
  ) {
    this.lstStatus = this.baseStatusDataService.BaseStatusData;
   }

  ngOnInit() {
    this.getAll();
    
    
    // this.objHostels.establishedDateStr = this.datePipe.transform(this.objHostels.establishedDate, 'dd-MM-yyyy HH:mm:ss', '+0600');
    // this.objHostels.establishedDateStr = new Date(this.objHostels.establishedDateStr).toString().split(' ')[0];
  }

  getAll() {
    this.lstHostels = [];
    this.hostelsService.getAll().subscribe((response) => {
      if (response) {
        this.lstHostels = Object.assign(this.lstHostels, response);
        this.lstHostels = [...this.lstHostels];
        this.gridOptions.api.redrawRows();
      }
    }
    );
  }

  add() {
    this.objHostels = new Hostels();
    this.objHostels.status = 1;
    this.gridApi.deselectAll();
    this.modalService.open(this.modalHostels, { size: 'md', backdrop: 'static' });
  }

  modalClose() {
    this.modalService.dismissAll(this.modalHostels);
    this.gridApi.deselectAll();
  }

  async save() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.objHostels.establishedDate = new Date(this.objHostels.establishedDateStr);
      this.hostelsService.save(this.objHostels).subscribe(
        (response: HttpResponse<any>) => {
        if (response.status == HttpReturnStatus.Success) { 
        // (response) => {
        //   if (response) {
            this.modalClose();
            this.swal.message(response.body.message, SweetAlertEnum.success);
            this.getAll();
          } else {
            this.swal.message(response.body.message, SweetAlertEnum.error)
            this.modalClose();
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        }
      );
    }
  }

  edit() {
    this.objHostels = this.selectedHostels;
    // this.objHostels.establishedDateStr = new Date(this.objHostels.establishedDate).toISOString().split('T')[0];
    // this.objHostels.establishedDateStr = this.datePipe.transform(this.objHostels.establishedDate, 'dd-MM-yyyy HH:mm:ss', '+0600');
    let uttcDate = this.datePipe.transform(this.objHostels.establishedDate, 'yyyy-MM-dd HH:mm:ss', '+0600')
    this.objHostels.establishedDateStr = uttcDate.toString().split(' ')[0];
    // this.objHostels.establishedDateStr = new Date(this.datePipe.transform(this.objHostels.establishedDate, 'dd-MM-yyyy HH:mm:ss', '+0600')).toISOString().split(' ')[0];
    this.modalService.open(this.modalHostels, { size: 'md' });
  }

  async update() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.objHostels.establishedDate = new Date(this.objHostels.establishedDateStr);
      this.hostelsService.update(this.objHostels).subscribe(
        (response: HttpResponse<any>) => {
        if (response.status == HttpReturnStatus.Success) { 
        // (response) => {
        //   if (response) {
            this.modalClose();
            this.swal.message(response.body.message, SweetAlertEnum.success);
            this.getAll();
          } else {
            this.swal.message(response.body.message, SweetAlertEnum.error)
            this.modalClose();
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        }
      );
    }
  }

  async deleteData() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.hostelsService.deleteByID(this.selectedHostels.hostelId).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status == HttpReturnStatus.Success) { 
            this.swal.message(response.body.message, SweetAlertEnum.success);
            this.getAll();
          }else{
            this.swal.message(response.body.message, SweetAlertEnum.error);
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        }
      );
    }
  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let nodes = this.gridApi.getRenderedNodes();
    if (nodes.length) {
      nodes[0].setSelected(true); //selects the first row in the rendered view
    }
  }

  onSelect() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows && selectedRows.length == 1) {
      this.selectedHostels = selectedRows[0];
    }
    else {
      this.selectedHostels = new Hostels();
    }
  }

  onChangeColName(colDef: ColDef) {
    const columns = this.gridOptions.columnApi.getColumns();
    const valueColumn = columns.filter(column => column.getColDef().headerName === colDef.headerName)[0];
    const newState = !valueColumn.isVisible();
    this.gridOptions.columnApi.setColumnVisible(valueColumn, newState);
    this.gridOptions.api.sizeColumnsToFit();
  }

  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }
}

const dataDefaultColDef: ColDef = {
  resizable: true,
  sortable: true,
  suppressMovable: false,
  filter: true,
  cellClass: 'suppress-movable-col'
};

const dataColumnDefs = [
  {
    isVisible: true, field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left',
    suppressMovable: true, valueGetter: "node.rowIndex + 1", resizable: false, width: 80
  } as ColDef,
  { isVisible: true, lockPosition: true, pinned: 'left', field: "hostelName", headerName: 'Hostel Name' } as ColDef,
  { isVisible: true, field: "contactNumber", headerName: 'Contact No' } as ColDef,
  { isVisible: true, field: "email", headerName: 'Email' } as ColDef,
  { isVisible: true, field: "description", headerName: 'Description' } as ColDef,
  {
    isVisible: true, field: "establishedDate",
    valueFormatter: (params) => {
      const date = new Date(params.value);
      const datePipe = new DatePipe('en-US');
      const cDate = datePipe.transform(params.value, 'dd-MM-yyyy HH:mm:ss', '+0600');
      return cDate.toString().split(' ')[0];
    }, headerName: 'Esteblish Date'
  } as ColDef,
  { isVisible: true, field: "website", headerName: 'Website' } as ColDef,
  { isVisible: true, field: "address", headerName: 'Address' } as ColDef,
  { isVisible: true, field: "totalBranches", headerName: 'Total Branches' } as ColDef,
  { isVisible: true, field: "hostelManager", headerName: 'Hostel Manager' } as ColDef,
];
