import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { Permission } from 'src/app/core/models/settings/permission';
import { PermissionService } from 'src/app/core/services/settings/permission.service';


@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {
  // bread crumb items
  lstPermissions: Permission[] = new Array<Permission>();
  selectedPermission: Permission = new Permission();
  @ViewChild("modalPermission") modalPermission: TemplateRef<any>;

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
    rowDragEntireRow: true,
    rowDragMultiRow: true,
    animateRows: true,
  }


  constructor(
    private permissionService: PermissionService,
    private modalService: NgbModal,
    private swal: SweetAlertService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.permissionService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstPermissions = Object.assign(this.lstPermissions, res);
          this.lstPermissions = [...this.lstPermissions];
          this.lstPermissions.forEach(x => {
            x.isCollapsed = true;
            x.childList = new Array<Permission>();
          });
          this.list_to_tree(this.lstPermissions);
          this.lstPermissions = this.lstPermissions.filter(x => x.parentPermissionID == 0);
          this.lstPermissions[0].isCollapsed = false;
        }
      },
    );
  }

  list_to_tree(list: Permission[]) {
    var map = {}, node: Permission, roots = [], i;
    for (i = 0; i < list.length; i += 1) {
      map[list[i].permissionID] = i;
      list[i].childList = [];
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentPermissionID !== 0 && list[map[node.parentPermissionID]]) {
        list[map[node.parentPermissionID]].childList.push(node);
      }
      else {
        roots.push(node);
      }
    }

    return roots;
  }

  onToggle(oItem: Permission) {
    oItem.isCollapsed = !oItem.isCollapsed;
  }

  modalClose() {
    this.modalService.dismissAll(this.modalPermission);
  }

  // Permission Add Methode 
  closeResult = '';
  addPermissionModal(oData: Permission) {
    if (!oData || !oData.permissionID) {
      this.swal.message('Please select an object', SweetAlertEnum.error);
    }

    this.selectedPermission = new Permission();
    this.selectedPermission.parentPermissionID = oData.permissionID;
    this.modalService.open(this.modalPermission, { size: 'lg', backdrop: 'static' });
  }

  editPermission(oData: Permission) {
    if (!oData || !oData.permissionID) {
      this.swal.message('Please select an object', SweetAlertEnum.error);
    }

    this.selectedPermission = oData;
    this.modalService.open(this.modalPermission, { size: 'lg', backdrop: 'static' });
  }

  async savePermission() {
    if (await this.swal.confirm_custom('Are you sure', SweetAlertEnum.question, true, false)) {
      if (this.selectedPermission.permissionID > 0) {
        this.permissionService.updatePermission(this.selectedPermission).subscribe(
          (res: Permission) => {
            this.selectedPermission = res;
            this.modalService.dismissAll();
            this.swal.message('Update Successful', SweetAlertEnum.success);
          }
        );
      }
      else {
        this.permissionService.savePermission(this.selectedPermission).subscribe(
          (res: Permission) => {
            this.modalService.dismissAll();
            this.swal.message('Save Successful', SweetAlertEnum.success);
            this.getAll();
          }
        );
      }
    }
  }

  async deletePermission(oData: Permission) {
    this.selectedPermission = null;
    if (await this.swal.confirm_custom('Are you sure', SweetAlertEnum.question, true, false)) {
      if (oData.permissionID > 0) {
        this.permissionService.deletePermission(oData.permissionID).subscribe(
          (res) => {
            this.swal.message('Delete Successful', SweetAlertEnum.success);
            this.getAll();
          }
        );
      }
    }
  }

  actionToMove: boolean = false;
  async movePermission(oData: Permission, decesion: boolean) {
    if (await this.swal.confirm_custom('Are you sure', SweetAlertEnum.warning, true, false)) {
      if (!decesion) {
        this.actionToMove = true;
        this.selectedPermission = oData;
      }
      else {
        if (this.selectedPermission.permissionID > 0) {
          this.selectedPermission.parentPermissionID = oData.permissionID;
          this.permissionService.updatePermission(this.selectedPermission).subscribe(
            (res: Permission) => {
              this.selectedPermission = res;
              this.actionToMove = false;
              this.swal.message('Move Successful', SweetAlertEnum.success);
              location.reload();
            }
          );
        }
      }
    }
  }

  cancelMovePermission() {
    this.actionToMove = false;
    this.selectedPermission = null;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let nodes = this.gridApi.getRenderedNodes();
    if (nodes.length) {
      nodes[0].setSelected(true); //selects the first row in the rendered view
    }
  }

  async saveOrderPermission() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      let dataLength = this.selectedPermission.childList.length;
      for (let i = 0; i < dataLength; i++) {
        let row = this.gridApi.getDisplayedRowAtIndex(i);
        let dbData = this.selectedPermission.childList.find(x => x.permissionID == row.data.permissionID);
        dbData.orderNo = i + 1;
      }

      this.permissionService.updateOrder(this.selectedPermission.childList).subscribe(
        (res) => {
          if (res) {
            this.gridOptions.api.redrawRows();
            this.swal.message('Order Updated', SweetAlertEnum.success);
          }
        }
      );
    }
  }
}

const dataDefaultColDef: ColDef = {
  sortable: true,
  filter: true
};

const dataColumnDefs = [
  { field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left', valueGetter: "node.rowIndex + 1", resizable: false, width: 70 } as ColDef,
  { field: "displayName", headerName: 'Display Name', width: 300, resizable: true } as ColDef,
  // { field: "routePath", headerName: 'Route Path' } as ColDef,
  { field: "permissionTypeStr", headerName: 'Type', width: 100 } as ColDef,
  { field: "isActive", headerName: 'isActive', width: 100 } as ColDef,
  { field: "orderNo", headerName: 'Order', width: 100 } as ColDef,
];
