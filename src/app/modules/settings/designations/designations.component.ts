import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { Designation } from 'src/app/core/models/settings/designation';
import { DesignationService } from 'src/app/core/services/settings/designation.service';
import { CheckboxRendererComponent } from '../../renderer/checkbox-renderer/checkbox-renderer.component';


@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.scss']
})
export class DesignationsComponent implements OnInit {
  @ViewChild("modalDesignation") modalDesignation: TemplateRef<any>;

  lstDesignation: Designation[] = new Array<Designation>();
  selectedDesignation: Designation = new Designation();
  public pageModel: PageModel;

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
  }

  frameworkComponents: any;

  constructor(
    private designationService: DesignationService,
    private swal: SweetAlertService,
    private modalService: NgbModal
  ) {
    this.frameworkComponents = {
      checkboxRenderer: CheckboxRendererComponent
    };
  }

  ngOnInit() {
    // this.selectedDesignation.isActive = true;
    this.pageModel = new PageModel();
    this.getAll();
  }

  getAll() {
    this.designationService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstDesignation = Object.assign(this.lstDesignation, res);
          this.lstDesignation = [...this.lstDesignation];
          this.gridOptions.api.redrawRows();
        }
      }
    )
  }

  addDesignation() {
    this.selectedDesignation = new Designation();
    this.modalService.open(this.modalDesignation, { size: 'md', backdrop: 'static' });
  }

  modalClose() {
    this.modalService.dismissAll(this.modalDesignation);
  }

  async saveDesignation() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.designationService.save(this.selectedDesignation).subscribe(
        (res: Designation) => {
          if (res && res.designationID > 0) {
            this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
            this.modalClose();
            this.getAll();
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        }
      );
    }
  }

  editDesignation() {
    this.modalService.open(this.modalDesignation, { size: 'md' });
  }

  async deleteDesignation() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      if (this.selectedDesignation.isActive == false) {
        this.designationService.delete(this.selectedDesignation.designationID).subscribe(
          (res) => {
            if (res) {
              this.swal.message('Data Deleted Successfully', SweetAlertEnum.success);
              this.getAll();
            }
          },
          (error) => {
            this.swal.message(error, SweetAlertEnum.error);
          }
        );
      } else {
        this.swal.message("You can't delete this data", SweetAlertEnum.error);
      }
    }
  }

  async updateDesignation() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.designationService.update(this.selectedDesignation).subscribe(
        (res: Designation) => {
          if (res && res.designationID > 0) {
            this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
            this.modalClose();
            this.getAll();
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        }
      );
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    let nodes = this.gridApi.getRenderedNodes();
    if (nodes.length) {
      nodes[0].setSelected(true); //selects the first row in the rendered view
    }
  }

  onSelect() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows && selectedRows.length == 1) {
      this.selectedDesignation = selectedRows[0];
    }
    else {
      this.selectedDesignation = new Designation();
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
  { isVisible: true, field: "designationNameBangla", headerName: 'Designation Name (বাংলা)', width: 280 } as ColDef,
  { isVisible: true, field: "designationName", headerName: 'Designation Name' } as ColDef,
  { isVisible: true, field: "orderNo", headerName: 'Order' } as ColDef,
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
