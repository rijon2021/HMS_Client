import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { GlobalSetting } from 'src/app/core/models/settings/globalSetting';
import { GlobalSettingService } from 'src/app/core/services/settings/global-setting.service';
import { CheckboxRendererComponent } from '../../renderer/checkbox-renderer/checkbox-renderer.component';


@Component({
  selector: 'app-global-setting',
  templateUrl: './global-setting.component.html',
  styleUrls: ['./global-setting.component.scss']
})
export class GlobalSettingComponent implements OnInit {
  lstGlobalSetting: GlobalSetting[] = new Array<GlobalSetting>();
  selectedGlobalSetting: GlobalSetting = new GlobalSetting();

  private gridApi: any;
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
    animateRows: true,
  }

  frameworkComponents: any;

  constructor(
    private globalSettingService: GlobalSettingService,
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
    this.globalSettingService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstGlobalSetting = Object.assign(this.lstGlobalSetting, res);
          this.lstGlobalSetting = [...this.lstGlobalSetting];
          this.gridOptions.api.redrawRows();
        }
      }
    );
  }

  modalClose() {
    this.modalService.dismissAll();
  }

  async saveGlobalSetting() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      if (this.selectedGlobalSetting.globalSettingID > 0) {
        this.globalSettingService.updateGlobalSetting(this.selectedGlobalSetting).subscribe(
          (res) => {
            if (res) {
              this.modalClose();
              this.getAll();
              this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
            }
          }
        );
      }
    }
  }

  async editGlobalSetting(content: any) {
    if (this.selectedGlobalSetting.globalSettingID > 0) {
      this.modalService.open(content, { centered: false, size: 'lg', backdrop: 'static' });
    }
    else {
      this.swal.message('Please select any!', SweetAlertEnum.warning);
      return;
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    let nodes = this.gridApi.getRenderedNodes();
    if (nodes.length) {
      nodes[0].setSelected(true);   //selects the first row in the rendered view
    }
  }

  onSelect() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows && selectedRows.length == 1) {
      this.selectedGlobalSetting = selectedRows[0];
    }
    else {
      this.selectedGlobalSetting = new GlobalSetting();
    }
  }
}

const dataDefaultColDef: ColDef = {
  sortable: true,
  filter: true,
  resizable: true
};

const dataColumnDefs = [
  { field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left', valueGetter: "node.rowIndex + 1", resizable: false, width: 80 } as ColDef,
  { field: "globalSettingName", headerName: 'Global Setting Name' } as ColDef,
  { field: "value", headerName: 'Value', width: 150 } as ColDef,
  { field: "valueInString", headerName: 'Value In String', width: 400 } as ColDef,
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
