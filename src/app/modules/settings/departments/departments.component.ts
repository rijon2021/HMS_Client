import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { Department } from 'src/app/core/models/settings/department';
import { DepartmentService } from 'src/app/core/services/settings/department.service';
import { CheckboxRendererComponent } from '../../renderer/checkbox-renderer/checkbox-renderer.component';


@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  @ViewChild("modalDepartment") modalDepartment: TemplateRef<any>;

  lstDepartment: Department[] = new Array<Department>();
  selectedDepartment: Department = new Department();
  public pageModel: PageModel;

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

  frameworkComponents: any;


  constructor(
    private departmentService: DepartmentService,
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
    this.departmentService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstDepartment = Object.assign(this.lstDepartment, res);
          this.lstDepartment = [...this.lstDepartment];
          this.gridOptions.api.redrawRows();
        }
      }
    );
  }

  addDepartment() {
    this.selectedDepartment = new Department();
    this.modalService.open(this.modalDepartment, { size: 'md', backdrop: 'static' });
  }

  modalClose() {
    this.modalService.dismissAll(this.modalDepartment);
  }

  async saveDepartment() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.departmentService.save(this.selectedDepartment).subscribe(
        (res: Department) => {
          if (res && res.departmentID > 0) {
            this.swal.message('Data Saved Successfully', SweetAlertEnum.success);
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

  editDepartment() {
    this.modalService.open(this.modalDepartment, { size: 'md' });
  }

  async deleteDepartment() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      if (this.selectedDepartment.isActive == false) {
        this.departmentService.delete(this.selectedDepartment.departmentID).subscribe(
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

  async updateDepartment() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.departmentService.update(this.selectedDepartment).subscribe(
        (res: Department) => {
          if (res && res.departmentID > 0) {
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
      this.selectedDepartment = selectedRows[0];
    }
    else {
      this.selectedDepartment = new Department();
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
  { isVisible: true, field: "departmentNameBangla", headerName: 'Department Name (বাংলা)', width: 280 } as ColDef,
  { isVisible: true, field: "departmentName", headerName: 'Department Name' } as ColDef,
  { isVisible: true, field: "orderNo", headerName: 'Order' } as ColDef,
  {
    isVisible: true, field: "isActive", headerName: 'Status', headerClass: 'ag-header-cell-label-center', cellRenderer: "checkboxRenderer",
    cellRendererParams: { display: 'flex', class: 'form-check-input', disabled: true },
    cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
  } as ColDef
];
