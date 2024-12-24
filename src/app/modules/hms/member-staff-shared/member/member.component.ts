import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { HttpReturnStatus } from 'src/app/core/enums/globalEnum';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { BaseStatus } from 'src/app/core/models/hms/hostel-settings/baseStatus';
import { Bed } from 'src/app/core/models/hms/hostel-settings/bed';
import { Branch } from 'src/app/core/models/hms/hostel-settings/branch';
import { Room } from 'src/app/core/models/hms/hostel-settings/room';
import { Members } from 'src/app/core/models/hms/member-settings/members';
import { BaseStatusDataService } from 'src/app/core/services/hms/hostel-settings/base-status';
import { BedService } from 'src/app/core/services/hms/hostel-settings/bed.service';
import { BranchService } from 'src/app/core/services/hms/hostel-settings/branch.service';
import { RoomService } from 'src/app/core/services/hms/hostel-settings/room.service';
import { MemberService } from 'src/app/core/services/hms/member-settings/member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  @ViewChild("modalMember") modalMember: TemplateRef<any>;

  lstMember: Members[] = new Array<Members>();
  objMember: Members = new Members();
  selectedMember: Members = new Members();
  public pageModel: PageModel;
  lstStatus: BaseStatus[] = new Array<BaseStatus>();
  lstBranch: Branch[] = new Array<Branch>();
  lstRoom: Room[] = new Array<Room>();
  lstBed: Bed[] = new Array<Bed>();

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
    private memberService: MemberService,
    private branchService: BranchService,
    private roomService: RoomService,
    private bedService: BedService,
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
    this.getAllBranch();
    this.getAllRoom();
    this.getAllBed();
  }

  getAll() {
    this.lstMember = [];
    this.memberService.getAll().subscribe((response) => {
      if (response) {
        this.lstMember = Object.assign(this.lstMember, response);
        this.lstMember = [...this.lstMember];
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
  getAllBed() {
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

  add() {
    this.objMember = new Members();
    this.gridApi.deselectAll();
    this.modalService.open(this.modalMember, { size: 'lg', backdrop: 'static' });
  }

  modalClose() {
    this.modalService.dismissAll(this.modalMember);
    this.gridApi.deselectAll();
  }

  async save() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      let MemberIdGen = this.objMember.branchId+this.objMember.roomId+this.objMember.bedId+Math.random().toString(5);
      this.objMember.identityNumber = MemberIdGen.toString();
      this.objMember.dateOfBirth = new Date(this.objMember.dateOfBirth).toISOString();
      this.memberService.save(this.objMember).subscribe(
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
    this.objMember = this.selectedMember;
    this.modalService.open(this.modalMember, { size: 'lg' });
  }

  async update() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.memberService.update(this.objMember).subscribe(
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
      this.memberService.deleteByID(this.selectedMember.memberId).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status == HttpReturnStatus.Success) {
            this.swal.message(response.body.message, SweetAlertEnum.success);
            this.getAll();
          } else {
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
      this.selectedMember = selectedRows[0];
    }
    else {
      this.selectedMember = new Members();
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
  { isVisible: true, lockPosition: true, pinned: 'left', field: "fullName", headerName: 'Member Name' } as ColDef,
  { isVisible: true, field: "gender", headerName: 'Gender' } as ColDef,
  { isVisible: true, field: "dateOfBirth", headerName: 'Date Of Birth' } as ColDef,
  { isVisible: true, field: "mobile", headerName: 'Mobile' } as ColDef,
  { isVisible: true, field: "email", headerName: 'Emial' } as ColDef,
  { isVisible: true, field: "address", headerName: 'Address' } as ColDef,
  { isVisible: true, field: "branchId", headerName: 'Branch Name' } as ColDef,
  { isVisible: true, field: "roomId", headerName: 'Room Name' } as ColDef,
  { isVisible: true, field: "bedId", headerName: 'Bed Name' } as ColDef,
];
