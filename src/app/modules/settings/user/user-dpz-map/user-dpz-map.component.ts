import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions, RowNode } from 'ag-grid-community';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { Department } from 'src/app/core/models/settings/department';
import { DPZ } from 'src/app/core/models/settings/dpz';
import { UserDPZMap } from 'src/app/core/models/settings/userDpzMap';
import { Users } from 'src/app/core/models/settings/users';
import { DepartmentService } from 'src/app/core/services/settings/department.service';
import { DPZService } from 'src/app/core/services/settings/dpz.service';
import { UserDpzMapService } from 'src/app/core/services/settings/user-dpz-map.service';
import { UserService } from 'src/app/core/services/settings/user.service';
import { formatDate } from '@angular/common';
import { CheckboxRendererComponent } from 'src/app/modules/renderer/checkbox-renderer/checkbox-renderer.component';


@Component({
  selector: 'app-user-dpz-map',
  templateUrl: './user-dpz-map.component.html',
  styleUrls: ['./user-dpz-map.component.scss']
})
export class UserDpzMapComponent implements OnInit {
  selectedUserDpzMap: UserDPZMap = new UserDPZMap();
  onSelectUserDpzMap: UserDPZMap = new UserDPZMap();

  lstUserDpzMap: UserDPZMap[] = new Array<UserDPZMap>();
  lstUserDpzMapAll: UserDPZMap[] = new Array<UserDPZMap>();
  lstUser: Users[] = new Array<Users>();
  lstDpz: DPZ[] = new Array<DPZ>();
  lstDepartment: Department[] = new Array<Department>();
  selectedUser: Users = new Users();
  selectedDPZ: DPZ = new DPZ();
  public pageModel: PageModel;
  selectedDepartmentID: number;

  private gridApi;
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
    onRowDataUpdated: () => {
      if (this.selectedUserDpzMap.userDPZMapID) {
        const rows = this.gridApi.getRenderedNodes();
        if (rows.length > 0) {
          let selectingNode = rows.find((node: RowNode) => node.data.userDPZMapID === this.selectedUserDpzMap.userDPZMapID);
          if (selectingNode) this.gridApi.selectNode(selectingNode);
        }
      }
    }
  }

  frameworkComponents: any;

  constructor(
    private userDpzMapService: UserDpzMapService,
    private departmentService: DepartmentService,
    private userService: UserService,
    private dpzService: DPZService,
    private swal: SweetAlertService,
  ) {
    this.frameworkComponents = {
      checkboxRenderer: CheckboxRendererComponent
    };
   }

  ngOnInit() {
    this.pageModel = new PageModel();
    this.getAllDepartment();
    this.getAllDpz();
    this.getAllUserDpzMap();
  }

  getAllDepartment() {
    let orgID = parseInt(localStorage.getItem('ORGANIZATION_ID'));
    this.departmentService.getListByOrganizationID(orgID).subscribe(
      (res: DPZ) => {
        if (res) {
          this.lstDepartment = Object.assign(this.lstDepartment, res);
          this.lstDepartment = [...this.lstDepartment];
        }
      }
    );
  }

  getAllDpz() {
    this.dpzService.getAll().subscribe(
      (res: DPZ) => {
        if (res) {
          this.lstDpz = Object.assign(this.lstDpz, res);
          this.lstDpz = [...this.lstDpz];
        }
      }
    );
  }

  getUsersByDepartmentID() {
    this.lstUser = [];
    this.userService.getAllByDepartmentID(this.selectedDepartmentID).subscribe(
      (res: Users[]) => {
        if (res) {
          this.lstUser = Object.assign(this.lstUser, res);
          this.lstUser = [...this.lstUser];

          if (this.selectedDepartmentID !== this.selectedUserDpzMap.departmentID) {
            this.selectedUserDpzMap.userID = 0;
            this.selectedUser = new Users();
          }

          if (this.selectedUserDpzMap.userID > 0) {
            this.onChangeUser();
          }
        }
      }
    );

    this.lstUserDpzMap = this.lstUserDpzMapAll.filter(x=>x.departmentID == this.selectedDepartmentID);
  }

  getAllUserDpzMap() {
    this.lstUserDpzMap = [];
    this.userDpzMapService.getAll().subscribe(
      (res: UserDPZMap) => {
        if (res) {
          this.lstUserDpzMap = Object.assign(this.lstUserDpzMap, res);
          this.lstUserDpzMap = [...this.lstUserDpzMap];
          this.lstUserDpzMapAll = this.lstUserDpzMap;
        }
      }
    );
  }

  onChangeUser() {
    this.selectedUser = this.lstUser.find(x => x.userAutoID == this.selectedUserDpzMap.userID);

    if (this.selectedUser) {
      this.selectedUser.userImagePreview = this.selectedUser.userImage ? ("data:image/png;base64," + this.selectedUser.userImage) : 'assets/images/logo/profile-default.png';
    }
  }

  onChangeDPZ() {
    this.selectedDPZ = this.lstDpz.find(x => x.dpzid == this.selectedUserDpzMap.dpzid);
  }

  async Save() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.userDpzMapService.save(this.selectedUserDpzMap).subscribe(
        (res: UserDPZMap) => {
          if (res) {
            if (res) {
              this.swal.message('Data Save Successfully', SweetAlertEnum.success);
              this.selectedUserDpzMap = res;
              this.getAllUserDpzMap();
            }
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        }
      );
    }
  }

  editUserDpzMap() {
    this.selectedUserDpzMap = { ...this.onSelectUserDpzMap };
    this.selectedDepartmentID = this.onSelectUserDpzMap.departmentID;

    if (this.selectedDepartmentID > 0) this.getUsersByDepartmentID();
  }

  async update() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.userDpzMapService.update(this.selectedUserDpzMap).subscribe(
        (res: UserDPZMap) => {
          if (res) {
            if (res) {
              this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
              this.getAllUserDpzMap();
            }
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        }
      );
    }
  }

  reset() {
    this.selectedDepartmentID = undefined;

    this.selectedUser = new Users();
    this.selectedUserDpzMap = new UserDPZMap();
  }

  async deleteMap() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.userDpzMapService.delete(this.onSelectUserDpzMap.userDPZMapID).subscribe(
        (res) => {
          if (res) {
            if (res) {
              this.swal.message('Data Deleted Successfully', SweetAlertEnum.success);
              this.reset();
              this.getAllUserDpzMap();
            }
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
    let nodes = this.gridApi.getRenderedNodes();
    if (nodes.length) {
      nodes[0].setSelected(true); //selects the first row in the rendered view
    }
  }

  onSelect() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows && selectedRows.length == 1) {
      this.onSelectUserDpzMap = selectedRows[0];
    }
    else {
      this.onSelectUserDpzMap = new UserDPZMap();
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
  cellClass: 'suppress-movable-col',
};

const dataColumnDefs = [
  {
    isVisible: true, field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left',
    suppressMovable: true, valueGetter: "node.rowIndex + 1", resizable: false, width: 80
  } as ColDef,
  { isVisible: true, field: "userNameBangla", headerName: 'User Name', } as ColDef,
  { isVisible: true, field: "dpzNameBangla", headerName: 'DPZ Name' } as ColDef,
  {
    headerName: 'From Date', field: 'fromDate',
    cellRenderer: (params: any) => {
      return params.value ? formatDate(new Date(params.value), 'dd-MMM-yyyy', 'en-US') : '-';
    }
  } as ColDef,
  {
    headerName: 'To Date', field: 'toDate',
    cellRenderer: (params: any) => {
      return params.value ? formatDate(new Date(params.value), 'dd-MMM-yyyy', 'en-US') : '-';
    }
  } as ColDef,
  {
    isVisible: true,
    field: "isActive",
    headerName: 'Status',
    headerClass: 'ag-header-cell-label-center',
    cellRenderer: "checkboxRenderer",
    cellRendererParams: { display: 'flex', class: 'form-check-input', disabled: true },
    cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
  } as ColDef
];
