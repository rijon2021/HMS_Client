import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { DPZ } from 'src/app/core/models/settings/dpz';
import { Mouza } from 'src/app/core/models/settings/mouza';
import { DPZService } from 'src/app/core/services/settings/dpz.service';
import { MouzaService } from 'src/app/core/services/settings/mouza.service';
import { ThanaService } from 'src/app/core/services/settings/thana.service';
import { CheckboxRendererComponent } from 'src/app/modules/renderer/checkbox-renderer/checkbox-renderer.component';


@Component({
  selector: 'app-mouza',
  templateUrl: './mouza.component.html',
  styleUrls: ['./mouza.component.scss']
})

export class MouzaComponent implements OnInit {
  @ViewChild("modalMouza") modalMouza: TemplateRef<any>;

  lstThana: Mouza[] = new Array<Mouza>();
  lstDpz: DPZ[] = new Array<DPZ>();
  lstMouza: Mouza[] = new Array<Mouza>();
  selectedMouza: Mouza = new Mouza();
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
    private thanaService: ThanaService,
    private dpzService: DPZService,
    private mouzaService: MouzaService,
    private swal: SweetAlertService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.frameworkComponents = {
      checkboxRenderer: CheckboxRendererComponent
    };

    this.pageModel = new PageModel();
    this.getAll();
    this.getAllThana();
    this.getAllDPZ();
  }

  getAll() {
    this.mouzaService.getAll().subscribe(
      (res) => {
        if (res) {
          let dataList: Mouza[] = new Array<Mouza>();
          this.lstMouza = Object.assign(dataList, res);
          this.gridOptions.api.redrawRows();
        }
      }
    );
  }

  getAllThana() {
    let orgID = parseInt(localStorage.getItem("ORGANIZATION_ID"));
    this.thanaService.getListByOrganizationID(orgID).subscribe(
      (res) => {
        if (res) {
          this.lstThana = Object.assign(this.lstThana, res);
          this.lstThana = [...this.lstThana];
        }
      }
    );
  }

  getAllDPZ() {
    this.dpzService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstDpz = Object.assign(this.lstDpz, res);
          this.lstDpz = [...this.lstDpz];
        }
      }
    );
  }

  addMouza() {
    this.selectedMouza = new Mouza();
    this.selectedMouza.isActive = true;
    this.modalService.open(this.modalMouza, { size: 'md', backdrop: 'static' });
  }

  modalClose() {
    this.modalService.dismissAll(this.modalMouza);
  }

  async saveMouza() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      if (this.selectedMouza.mouzaID > 0) {
        this.mouzaService.update(this.selectedMouza).subscribe(
          (res: Mouza) => {
            if (res && res.mouzaID > 0) {
              this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
              // this.modalClose();
              this.getAll();
            }
          },
          (error) => {
            this.swal.message(error, SweetAlertEnum.error);
          }
        );
      }
      else {
        this.mouzaService.save(this.selectedMouza).subscribe(
          (res: Mouza) => {
            if (res && res.mouzaID > 0) {
              this.selectedMouza.mouzaName = '';
              this.selectedMouza.mouzaNameBangla = '';
              this.swal.message('Data Saved Successfully', SweetAlertEnum.success);
              this.getAll();
            }
          },
          (error) => {
            this.swal.message(error, SweetAlertEnum.error);
          }
        );
      }
    }
  }

  editMouza() {
    this.modalService.open(this.modalMouza, { size: 'md' });
  }

  async deleteMouza() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      if (this.selectedMouza.isActive == false) {
        this.mouzaService.delete(this.selectedMouza.mouzaID).subscribe(
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

  async updateMouza() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.mouzaService.update(this.selectedMouza).subscribe(
        (res: Mouza) => {
          if (res && res.mouzaID > 0) {
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
      this.selectedMouza = selectedRows[0];
    }
    else {
      this.selectedMouza = new Mouza();
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
  { isVisible: true, field: "mouzaName", headerName: 'Mouza Name' } as ColDef,
  { isVisible: true, field: "mouzaNameBangla", headerName: 'Mouza Name (বাংলা)' } as ColDef,
  { isVisible: true, field: "thanaName", headerName: 'Thana Name' } as ColDef,
  { isVisible: true, field: "thanaNameBangla", headerName: 'Thana Name (বাংলা)' } as ColDef,
  { isVisible: true, field: "dpzName", headerName: 'DPZ Name' } as ColDef,
  { isVisible: true, field: "dpzNameBangla", headerName: 'DPZ Name (বাংলা)' } as ColDef,
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
