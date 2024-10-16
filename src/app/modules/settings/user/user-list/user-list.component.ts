import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridOptions } from 'ag-grid-community';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { Department } from 'src/app/core/models/settings/department';
import { Users } from 'src/app/core/models/settings/users';
import { DepartmentService } from 'src/app/core/services/settings/department.service';
import { UserService } from 'src/app/core/services/settings/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  // bread crumb items
  lstUser: Users[] = new Array<Users>();
  lstUserAll: Users[] = new Array<Users>();
  // lstDepartment: Department[] = new Array<Department>();
  selectedUser: Users = new Users();
  public pageModel: PageModel;

  filterDepartmentID: number;

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
  }

  constructor(
    private userService: UserService,
    private departmentService: DepartmentService,
    private swal: SweetAlertService,
    private router: Router
  ) { }


  ngOnInit() {
    this.filterDepartmentID = 0;
    this.pageModel = new PageModel();
    this.getAll();
  }

  getAll() {
    this.userService.getAllByOrganizationID().subscribe(
      (res) => {
        if (res) {
          this.lstUser = Object.assign(this.lstUser, res);
          this.lstUser = [...this.lstUser];
          this.lstUserAll = this.lstUser;
          this.gridOptions.api.redrawRows();

          this.lstUser.forEach(sUser => {
            if (sUser.status) {
              sUser.statusStr = "Yes";
            } else {
              sUser.statusStr = "No";
            }
          });
        }
      }
    );
  }



  departmentChange() {
    this.lstUser = [];
    if (this.filterDepartmentID > 0) {
      this.lstUser = this.lstUserAll.filter(x => x.departmentID == this.filterDepartmentID);
    } else {
      this.lstUser = this.lstUserAll;
    }
  }

  addUser() {
    RoutingHelper.navigate2([], ['settings', 'user', 'user-create', 0], this.router);
  }

  editUser() {
    if (this.selectedUser.userAutoID > 0) {
      RoutingHelper.navigate2([], ['settings', 'user', 'user-create', this.selectedUser.userAutoID], this.router);
    }
    else {
      this.swal.message('No user selected', SweetAlertEnum.error);
    }
  }

  viewUser() {
    if (this.selectedUser.userAutoID > 0) {
      RoutingHelper.navigate2([], ['settings', 'user', 'user-create', this.selectedUser.userAutoID], this.router);
    }
    else {
      this.swal.message('No user selected', SweetAlertEnum.error);
    }
  }

  filterToggler() {
    this.pageModel.isActiveFilter = !this.pageModel.isActiveFilter;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    let nodes = this.gridApi.getRenderedNodes();
    if (nodes.length) {
      nodes[0].setSelected(true);   //selects the first row in the rendered view
    }
  }

  onSelect() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows && selectedRows.length == 1) {
      this.selectedUser = selectedRows[0];
    }
    else {
      this.selectedUser = new Users();
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
  { isVisible: true, field: "userID", headerName: 'User ID', lockPosition: true, pinned: 'left', suppressMovable: false } as ColDef,
  // { isVisible: true, field: "departmentNameBangla", headerName: 'Department' } as ColDef,
  { isVisible: true, field: "userFullNameBangla", headerName: 'Full Name' } as ColDef,
  { isVisible: true, field: "designationNameBangla", headerName: 'Designation' } as ColDef,
  { isVisible: true, field: "mobileNo", headerName: 'Mobile No' } as ColDef,
  { isVisible: true, field: "nid", headerName: 'NID' } as ColDef,
  { isVisible: true, field: "address", headerName: 'Address', headerClass: 'ag-grid-text-center', cellStyle: { textAlign: 'center' } } as ColDef,
  { isVisible: true, field: "email", headerName: 'Email', cellClass: "grid-cell-centered" } as ColDef,
  { isVisible: true, field: "statusStr", headerName: 'Is Active' } as ColDef,
];

// interface pdfExportOptions {
// 	/** styles to be applied to cells
//     see supported list here: https://pdfmake.github.io/docs/0.1/document-definition-object/styling/. **/
// 	styles?: {
//     	background: String,
//         fontSize: Number,
//         bold: Boolean,
//         color: String,
// 		alignment: 'left' | 'center' | 'right',
// 	},
//     /** creates a hyperlink for each value in a column **/
// 	createURL?: () => String,
//     /** if true, does not include the column in the exported file **/
// 	skipColumn?: Boolean
// }
