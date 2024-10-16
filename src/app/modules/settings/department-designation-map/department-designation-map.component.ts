import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridApi, GridOptions, GridReadyEvent, RowNode } from 'ag-grid-community';
import { Observable, throwError } from 'rxjs';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { Department } from 'src/app/core/models/settings/department';
import { DepartmentDesginationMap } from 'src/app/core/models/settings/departmentDesginationMap';
import { Designation } from 'src/app/core/models/settings/designation';
import { DepartmentService } from 'src/app/core/services/settings/department.service';
import { DepartmentDesignationMapService } from 'src/app/core/services/settings/departmentDesignationMap.service';
import { DesignationService } from 'src/app/core/services/settings/designation.service';

@Component({
  selector: 'app-department-designation-map',
  templateUrl: './department-designation-map.component.html',
  styleUrls: ['./department-designation-map.component.scss']
})
export class DepartmentDesignationMapComponent implements OnInit {
  @ViewChild("modalDepartmentDesignationMap") modalDepartmentDesignationMap: TemplateRef<any>;

  lstDepartmentDesignationMap: DepartmentDesginationMap[] = new Array<DepartmentDesginationMap>();
  selectedDepartmentDesignationMap: DepartmentDesginationMap = new DepartmentDesginationMap();
  lstDepartment: Department[] = new Array<Department>();
  lstDesignation: Designation[] = new Array<Designation>();

  public pageModel: PageModel;

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
    private departmentDesignationMapService: DepartmentDesignationMapService,
    private swal: SweetAlertService,
    private modalService: NgbModal,
    private departmentService: DepartmentService,
    private designationService: DesignationService
  ) { }

  ngOnInit() {
    // this.selectedDesignation.isActive = true;
    this.pageModel = new PageModel();
    this.getAll();
    this.getAllDepartments();
    this.getAllDesignations();
  }

  getAllDesignations() {
    this.designationService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstDesignation = Object.assign(this.lstDesignation, res);
          this.lstDesignation = [...this.lstDesignation];
        }
      }
    )
  }

  getAllDepartments() {
    this.departmentService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstDepartment = Object.assign(this.lstDepartment, res);
          this.lstDepartment = [...this.lstDepartment];
        }
      }
    )
  }

  getAll() {
    this.departmentDesignationMapService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstDepartmentDesignationMap = Object.assign(this.lstDepartmentDesignationMap, res);
          this.lstDepartmentDesignationMap = [...this.lstDepartmentDesignationMap];
          this.gridOptions.api.redrawRows();
        }
      }
    );
  }

  addDepartmentDesignationMap() {
    this.selectedDepartmentDesignationMap = new DepartmentDesginationMap();
    this.modalService.open(this.modalDepartmentDesignationMap, { size: 'md', backdrop: 'static' });
  }

  modalClose() {
    this.modalService.dismissAll(this.modalDepartmentDesignationMap);
  }

  async saveDepartmentDesignationMap() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.departmentDesignationMapService.save(this.selectedDepartmentDesignationMap).subscribe(
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

  edit() {
    this.modalService.open(this.modalDepartmentDesignationMap, { size: 'md' });
  }

  async delete() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.departmentDesignationMapService.delete(this.selectedDepartmentDesignationMap.departmentDesignationMapID).subscribe(
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
    }
  }

  async update() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.departmentDesignationMapService.update(this.selectedDepartmentDesignationMap).subscribe(
        (res: DepartmentDesginationMap) => {
          if (res && res.departmentDesignationMapID > 0) {
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
    this.gridColumnApi = params.columnApi;
    let nodes = this.gridApi.getRenderedNodes();
    if (nodes.length) {
      nodes[0].setSelected(true); //selects the first row in the rendered view
    }
  }

  onSelect() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows && selectedRows.length == 1) {
      this.selectedDepartmentDesignationMap = selectedRows[0];
    }
    else {
      this.selectedDepartmentDesignationMap = new DepartmentDesginationMap();
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
  { isVisible: true, field: "departmentNameBangla", headerName: 'Department Name (বাংলা)', width: 280 } as ColDef,
  { isVisible: true, field: "designationNameBangla", headerName: 'Designation (বাংলা)', width: 280 } as ColDef
];
