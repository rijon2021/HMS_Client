import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { HttpReturnStatus } from 'src/app/core/enums/globalEnum';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { Bed } from 'src/app/core/models/hms/hostel-settings/bed';
import { Room } from 'src/app/core/models/hms/hostel-settings/room';
import { BedService } from 'src/app/core/services/hms/hostel-settings/bed.service';
import { RoomService } from 'src/app/core/services/hms/hostel-settings/room.service';
@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.scss']
})
export class BedComponent implements OnInit {

  @ViewChild("modalBed") modalBed: TemplateRef<any>;

  lstBed: Bed[] = new Array<Bed>();
  lstRoom: Room[] = new Array<Room>();
  objBed: Bed = new Bed();
  selectedBed: Bed = new Bed();
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
    private bedService: BedService,
    private roomService: RoomService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.getAll();
    this.getAllRoom();
  }

  getAll() {
    this.lstBed = [];
    this.bedService.getAll().subscribe((response) => {
      if (response) {
        this.lstBed = Object.assign(this.lstBed, response);
        this.lstBed = [...this.lstBed];
        this.gridOptions.api.redrawRows();
      }
    }
    );
  }
  getAllRoom() {
    this.lstRoom = [];
    this.roomService.getAll().subscribe((response) => {
      if (response) {
        this.lstRoom = Object.assign(this.lstRoom, response);
        this.lstRoom = [...this.lstRoom];
        this.gridOptions.api.redrawRows();
      }
    }
    );
  }

  add() {
    this.objBed = new Bed();
    this.gridApi.deselectAll();
    this.modalService.open(this.modalBed, { size: 'md', backdrop: 'static' });
  }

  modalClose() {
    this.modalService.dismissAll(this.modalBed);
    this.gridApi.deselectAll();
  }

  async save() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.bedService.save(this.objBed).subscribe(
        (response: HttpResponse<any>) => {
        if (response.status == HttpReturnStatus.Success) { 
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
    this.objBed = this.selectedBed;
    this.modalService.open(this.modalBed, { size: 'md' });
  }

  async update() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.bedService.update(this.objBed).subscribe(
        (response: HttpResponse<any>) => {
        if (response.status == HttpReturnStatus.Success) { 
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
      this.bedService.deleteByID(this.selectedBed.bedId).subscribe(
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
      this.selectedBed = selectedRows[0];
    }
    else {
      this.selectedBed = new Bed();
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
  { isVisible: true, lockPosition: true, pinned: 'left', field: "bedNumber", headerName: 'Bed Name' } as ColDef,
];
