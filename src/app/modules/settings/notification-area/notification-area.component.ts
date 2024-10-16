import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { NotificationType } from 'src/app/core/enums/globalEnum';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { NotificationArea } from 'src/app/core/models/settings/notificationArea';
import { NotificationAreaService } from 'src/app/core/services/settings/notification-area.service';
import { ButtonRendererComponent } from '../../renderer/button-renderer/button-renderer.component';
import { CheckboxRendererComponent } from '../../renderer/checkbox-renderer/checkbox-renderer.component';


@Component({
  selector: 'app-notification-area',
  templateUrl: './notification-area.component.html',
  styleUrls: ['./notification-area.component.scss']
})
export class NotificationAreaComponent implements OnInit {
  // bread crumb items
  lstNotificationArea: NotificationArea[] = new Array<NotificationArea>();
  selectedNotificationArea: NotificationArea = new NotificationArea();
  selectedNotification: NotificationArea = new NotificationArea();
  lstNotificationType = [];

  private gridApi;
  frameworkComponents: any;
  closeResult = '';
  @ViewChild("modalEditNotificationArea") modalEditNotificationArea: TemplateRef<any>;

  gridOptions: GridOptions = {
    pagination: true,
    rowSelection: 'single',
    suppressDragLeaveHidesColumns: true,
    suppressPropertyNamesCheck: true,
    suppressRowDrag: false,
    rowDragManaged: true,
    getRowHeight: () => 40,
    defaultColDef: dataDefaultColDef,
  };

  columnDefs = [
    {
      field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left',
      suppressMovable: true, valueGetter: "node.rowIndex + 1", resizable: false, width: 80
    } as ColDef,
    { field: "notificationAreaName", headerName: 'Notification Area Name' } as ColDef,
    { field: "notificationBody", headerName: 'Notification Body', width: 700 } as ColDef,
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
      headerName: 'Action', cellRenderer: 'buttonRenderer', cellRendererParams: {
        onClick: this.editNotificationArea.bind(this), class: 'text-info', icon: 'fa fa-edit', type: 'span'
      }
    } as ColDef,
  ];

  constructor(
    private notificationAreaService: NotificationAreaService,
    private swal: SweetAlertService,
    private modalService: NgbModal
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      checkboxRenderer: CheckboxRendererComponent
    };
  }

  ngOnInit() {
    this.lstNotificationType = Object.entries(NotificationType).filter(e => !isNaN(e[0] as any)).map(e => ({ name: e[1], id: e[0] }));
    this.getAll();
  }

  getAll() {
    this.notificationAreaService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstNotificationArea = Object.assign(this.lstNotificationArea, res);
          this.lstNotificationArea = [...this.lstNotificationArea];
        }
      }
    );
  }

  editNotificationArea() {
    this.modalService.open(this.modalEditNotificationArea, { ariaLabelledBy: 'modal-basic-title', size: 'lg', backdrop: 'static' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
    );
  }

  async updateNotificationArea() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      if (this.selectedNotification.notificationAreaID > 0) {
        this.notificationAreaService.updateNotificationArea(this.selectedNotification).subscribe(
          (res) => {
            if (res) {
              this.modalClose();
              this.swal.message('Notification Update Succesfully', SweetAlertEnum.success);
              this.getAll();
            }
          }
        )
      }
      else {
        this.swal.message('No user selected', SweetAlertEnum.error);
      }
    }
  }

  modalClose() {
    this.modalService.dismissAll();
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
      this.selectedNotification = selectedRows[0];
    }
    else {
      this.selectedNotification = new NotificationArea();
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
