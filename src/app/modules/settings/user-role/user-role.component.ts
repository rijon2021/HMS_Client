import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { UserRole } from 'src/app/core/models/settings/userRole';
import { UserRoleService } from 'src/app/core/services/settings/user-role.service';
import { CheckboxRendererComponent } from '../../renderer/checkbox-renderer/checkbox-renderer.component';


@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {
  lstUserRole: UserRole[] = new Array<UserRole>();
  selectedUserRole: UserRole = new UserRole();

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
    rowDragEntireRow: true,
    rowDragMultiRow: true,
    animateRows: true,
  }

  frameworkComponents: any;

  constructor(
    private userRoleService: UserRoleService,
    private swal: SweetAlertService,
    private modalService: NgbModal
  ) {
    this.frameworkComponents = {
      checkboxRenderer: CheckboxRendererComponent
    };
  }


  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.userRoleService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstUserRole = Object.assign(this.lstUserRole, res);
          this.lstUserRole = [...this.lstUserRole];
          this.gridOptions.api.redrawRows();
        }
      }
    );
  }

  closeResult = '';
  addUserRole(content) {
    this.selectedUserRole = new UserRole();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
    );
  }

  modalClose() {
    this.modalService.dismissAll();
  }

  async saveUserRole() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      if (this.selectedUserRole.userRoleID > 0) {
        this.userRoleService.updateUserRole(this.selectedUserRole).subscribe(
          (res) => {
            if (res) {
              this.modalClose();
              this.getAll();
              this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
            }
          }
        );
      }
      else {
        this.userRoleService.saveUserRole(this.selectedUserRole).subscribe(
          (res) => {
            if (res) {
              this.modalClose();
              this.getAll();
              this.swal.message('Data Saved Successfully', SweetAlertEnum.success);
            }
          }
        );
      }
    }
  }

  async editUserRole(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
    );
  }

  async deleteUserRole() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      var objUserRole = this.lstUserRole.find(x => x.userRoleID == this.selectedUserRole.userRoleID);
      if (objUserRole != null) {
        if (objUserRole.isActive) {
          this.swal.message('Active Role can not be deleted!', SweetAlertEnum.error);
        } else {
          this.userRoleService.deleteUserRole(this.selectedUserRole.userRoleID).subscribe(
            (res) => {
              if (res) {
                this.lstUserRole = this.lstUserRole.filter(x => x.userRoleID != this.selectedUserRole.userRoleID);
                this.gridOptions.api.redrawRows();
                this.swal.message('User Role Deleted', SweetAlertEnum.success);
              }
            }
          );
        }
      }
    }
  }

  async updateOrder() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      let dataLength = this.lstUserRole.length;
      for (let i = 0; i < dataLength; i++) {
        let row = this.gridApi.getDisplayedRowAtIndex(i);
        let dbData = this.lstUserRole.find(x => x.userRoleID == row.data.userRoleID);
        dbData.orderNo = i + 1;
      }

      this.userRoleService.updateOrder(this.lstUserRole).subscribe(
        (res) => {
          if (res) {
            this.gridOptions.api.redrawRows();
            this.swal.message('Order Updated', SweetAlertEnum.success);
          }
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
      this.selectedUserRole = selectedRows[0];
    }
    else {
      this.selectedUserRole = new UserRole();
    }
  }
}

const dataDefaultColDef: ColDef = {
  sortable: true,
  filter: true,
};

const dataColumnDefs = [
  { field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left', valueGetter: "node.rowIndex + 1", resizable: false, width: 80 } as ColDef,
  { field: "userRoleName", headerName: 'User Role', } as ColDef,
  {
    isVisible: true,
    field: "isActive",
    headerName: 'Status',
    headerClass: 'ag-header-cell-label-center',
    cellRenderer: "checkboxRenderer",
    cellRendererParams: { display: 'flex', class: 'form-check-input', disabled: true },
    cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
  } as ColDef,
  {
    isVisible: true,
    field: "isDataRestricted",
    headerName: 'Is Data Restricted',
    headerClass: 'ag-header-cell-label-center',
    cellRenderer: "checkboxRenderer",
    cellRendererParams: { display: 'flex', class: 'form-check-input', disabled: true },
    cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
  } as ColDef,
  {
    isVisible: true,
    field: "allowLocalMedia",
    headerName: 'Allow Local Media',
    headerClass: 'ag-header-cell-label-center',
    cellRenderer: "checkboxRenderer",
    cellRendererParams: { display: 'flex', class: 'form-check-input', disabled: true },
    cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
  } as ColDef,
  { field: "orderNo", headerName: 'Order' } as ColDef,
];
