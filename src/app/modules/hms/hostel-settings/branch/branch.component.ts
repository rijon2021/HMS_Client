import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { HttpReturnStatus } from 'src/app/core/enums/globalEnum';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { Aminities } from 'src/app/core/models/hms/hostel-settings/aminities';
import { Branch } from 'src/app/core/models/hms/hostel-settings/branch';
import { Hostels } from 'src/app/core/models/hms/hostel-settings/hostels';
import { BranchService } from 'src/app/core/services/hms/hostel-settings/branch.service';
import { HostelsService } from 'src/app/core/services/hms/hostel-settings/hostels.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {

  @ViewChild("modalBranch") modalBranch: TemplateRef<any>;



  lstBranch: Branch[] = new Array<Branch>();
  lstHostels: Hostels[] = new Array<Hostels>();
  objBranch: Branch = new Branch();
  selectedBranch: Branch = new Branch();
  public pageModel: PageModel;

  //===============ng multidropdown

  lstAminities: Aminities[] = new Array<Aminities>();
  selectedAminities: Aminities[] = new Array<Aminities>();
  dropdownSettings: IDropdownSettings = {};

  AlldropdownSettings() {
    this.dropdownSettings = {
      singleSelection: false,
      // defaultOpen: false,
      idField: "aminitiesId",
      textField: "aminitiesName",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 100,
      allowSearchFilter: true,
    };

    
  }

  //===============End ng multidropdown

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
    private branchService: BranchService,
    private hostelsService: HostelsService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.getAll();
    this.getAllHostel();
    this.AlldropdownSettings();
    this.lstAminities = [
      { aminitiesId: 1, aminitiesName: "Wifi" },
      { aminitiesId: 2, aminitiesName: "Games" },
      { aminitiesId: 3, aminitiesName: "Gym" },
      { aminitiesId: 4, aminitiesName: "Wishing Machine" },
    ];

  }


  getAll() {
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

  getAllHostel() {
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

  //==========================Multiselect 
  branchAminities(items:any){
    this.objBranch.amenities = items;
  }
  onItemSelect(item: any) {
    console.log('All items selected:', item);
    console.log('SA:', this.selectedAminities);
  }
  onItemDeSelect(item: any) {
    console.log('All items selected:', item);
    console.log('SA:', this.selectedAminities);
  }

  onSelectAll(items: any) {
    console.log('All items selected:', items);
    console.log('SA:', this.selectedAminities);
  }
  onDeSelectAll(items: any) {
    console.log('All items selected:', items);
    console.log('SA:', this.selectedAminities);
  }


  //==========================Multiselect 

  add() {
    this.objBranch = new Branch();
    this.gridApi.deselectAll();
    this.modalService.open(this.modalBranch, { size: 'md', backdrop: 'static' });
  }

  modalClose() {
    this.modalService.dismissAll(this.modalBranch);
    this.gridApi.deselectAll();
  }

  async save() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      // this.objBranch.amenities = this.selectedAminities;
      this.branchService.save(this.objBranch).subscribe(
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
    this.objBranch = this.selectedBranch;
    this.modalService.open(this.modalBranch, { size: 'md' });
  }

  async update() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      // this.objBranch.amenities = this.selectedAminities;
      this.branchService.update(this.objBranch).subscribe(
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
      this.branchService.deleteByID(this.selectedBranch.branchId).subscribe(
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
      this.selectedBranch = selectedRows[0];
    }
    else {
      this.selectedBranch = new Branch();
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
  { isVisible: true, lockPosition: true, pinned: 'left', field: "hostelId", headerName: 'Hostel Name' } as ColDef,
  { isVisible: true, lockPosition: true, pinned: 'left', field: "branchName", headerName: 'Branch Name' } as ColDef,
  { isVisible: true, lockPosition: true, pinned: 'left', field: "branchCode", headerName: 'Branch Code' } as ColDef,
  { isVisible: true, lockPosition: true, pinned: 'left', field: "location", headerName: 'Branch Location' } as ColDef,
  { isVisible: true, lockPosition: true, pinned: 'left', field: "contactNumber", headerName: 'Contact Number' } as ColDef,
  { isVisible: true, lockPosition: true, pinned: 'left', field: "email", headerName: 'Branch Email' } as ColDef,
  { isVisible: true, lockPosition: true, pinned: 'left', field: "amenities", headerName: 'Amenities' } as ColDef,
];
