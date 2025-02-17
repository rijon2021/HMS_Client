import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { HttpReturnStatus } from 'src/app/core/enums/globalEnum';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { Branch } from 'src/app/core/models/hms/hostel-settings/branch';
import { Room } from 'src/app/core/models/hms/hostel-settings/room';
import { RoomCategory } from 'src/app/core/models/hms/hostel-settings/roomCategory';
import { BranchService } from 'src/app/core/services/hms/hostel-settings/branch.service';
import { RoomCategoryService } from 'src/app/core/services/hms/hostel-settings/room-category.service';
import { RoomService } from 'src/app/core/services/hms/hostel-settings/room.service';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  @ViewChild("modalRoom") modalRoom: TemplateRef<any>;

  lstRoom: Room[] = new Array<Room>();
  lstRoomCategory: RoomCategory[] = new Array<RoomCategory>();
  lstBranch: Branch[] = new Array<Branch>();
  objRoom: Room = new Room();
  selectedRoom: Room = new Room();
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
    private roomService: RoomService,
    private roomCategoryService: RoomCategoryService,
    private branchService: BranchService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.getAll();
    this.getAllBranch();
    this.getAllRoomCategory();
  }

  getAll() {
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
  getAllBranch() {
    this.lstBranch = [];
    this.branchService.getAll().subscribe((response) => {
      if (response) {
        this.lstBranch = Object.assign(this.lstBranch, response);
        this.lstBranch = [...this.lstBranch];
        this.gridOptions.api.redrawRows();
      }
    }
    );
  }
  getAllRoomCategory() {
    this.lstRoomCategory = [];
    this.roomCategoryService.getAll().subscribe((response) => {
      if (response) {
        this.lstRoomCategory = Object.assign(this.lstRoomCategory, response);
        this.lstRoomCategory = [...this.lstRoomCategory];
        this.gridOptions.api.redrawRows();
      }
    }
    );
  }

  add() {
    this.objRoom = new Room();
    this.gridApi.deselectAll();
    this.modalService.open(this.modalRoom, { size: 'md', backdrop: 'static' });
  }

  modalClose() {
    this.modalService.dismissAll(this.modalRoom);
    this.gridApi.deselectAll();
  }

  async save() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.roomService.save(this.objRoom).subscribe(
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
    this.objRoom = this.selectedRoom;
    this.modalService.open(this.modalRoom, { size: 'md' });
  }

  async update() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.roomService.update(this.objRoom).subscribe(
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
      this.roomService.deleteByID(this.selectedRoom.roomId).subscribe(
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
      this.selectedRoom = selectedRows[0];
    }
    else {
      this.selectedRoom = new Room();
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
  { isVisible: true, lockPosition: true, pinned: 'left', field: "branchId", headerName: 'Branch' } as ColDef,
  { isVisible: true, lockPosition: true, pinned: 'left', field: "roomCategoryId", headerName: 'Room Category' } as ColDef,
  { isVisible: true, lockPosition: true, pinned: 'left', field: "roomNumber", headerName: 'Room Number' } as ColDef,
  { isVisible: true, lockPosition: true, pinned: 'left', field: "capacity", headerName: 'Bed Capacity' } as ColDef,
];
