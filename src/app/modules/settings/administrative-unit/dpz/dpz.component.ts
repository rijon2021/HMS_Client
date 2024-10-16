import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { DPZ } from 'src/app/core/models/settings/dpz';
import { Thana } from 'src/app/core/models/settings/thana';
import { DPZService } from 'src/app/core/services/settings/dpz.service';
import { MouzaService } from 'src/app/core/services/settings/mouza.service';
import { ThanaService } from 'src/app/core/services/settings/thana.service';
import { CheckboxRendererComponent } from 'src/app/modules/renderer/checkbox-renderer/checkbox-renderer.component';


@Component({
  selector: 'app-dpz',
  templateUrl: './dpz.component.html',
  styleUrls: ['./dpz.component.scss']
})
export class DpzComponent implements OnInit {
  @ViewChild("modalDPZ") modalDPZ: TemplateRef<any>;

  lstThana: Thana[] = new Array<Thana>();
  lstMouza: DPZ[] = new Array<DPZ>();
  lstDPZ: DPZ[] = new Array<DPZ>();
  selectedDPZ: DPZ = new DPZ();
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
    private mouzaService: MouzaService,
    private dpzService: DPZService,
    private swal: SweetAlertService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.frameworkComponents = {
      checkboxRenderer: CheckboxRendererComponent
    };

    // this.selectedDPZ.isActive = true;
    this.pageModel = new PageModel();
    this.getAll();
    this.getAllThana();
    this.getAllMouza();
  }

  getAll() {
    this.dpzService.getAll().subscribe(
      (res) => {
        if (res) {
          let dataList: DPZ[] = new Array<DPZ>();
          this.lstDPZ = Object.assign(dataList, res);
          this.gridOptions.api.redrawRows();
        }
      }
    )
  }

  getAllThana() {
    this.thanaService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstThana = Object.assign(this.lstThana, res);
          this.lstThana = [...this.lstThana];
        }
      }
    )
  }

  getAllMouza() {
    this.mouzaService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstMouza = Object.assign(this.lstMouza, res);
          this.lstMouza = [...this.lstMouza];
        }
      }
    )
  }

  addDPZ() {
    this.selectedDPZ = new DPZ();
    this.modalService.open(this.modalDPZ, { size: 'md', backdrop: 'static' });

  }

  modalClose() {
    this.modalService.dismissAll(this.modalDPZ);
  }

  async saveDPZ() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.dpzService.save(this.selectedDPZ).subscribe(
        (res: DPZ) => {
          if (res) {
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

  editDPZ() {
    this.modalService.open(this.modalDPZ, { size: 'md' });
  }

  async deleteDPZ() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      if (this.selectedDPZ.isActive == false) {
        this.dpzService.delete(this.selectedDPZ.dpzid).subscribe(
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

  async updateDPZ() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.dpzService.update(this.selectedDPZ).subscribe(
        (res: DPZ) => {
          if (res && res.dpzid > 0) {
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
      nodes[0].setSelected(true);   //selects the first row in the rendered view
    }
  }

  onSelect() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows && selectedRows.length == 1) {
      this.selectedDPZ = selectedRows[0];
    }
    else {
      this.selectedDPZ = new DPZ();
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
