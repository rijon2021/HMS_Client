import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { QueryObject } from 'src/app/core/models/core/queryObject';
import { Country } from 'src/app/core/models/settings/country';
import { CountryDivisionMap, Division } from 'src/app/core/models/settings/division';
import { CountryService } from 'src/app/core/services/settings/country.service';
import { DivisionService } from 'src/app/core/services/settings/division.service';
import { CheckboxRendererComponent } from 'src/app/modules/renderer/checkbox-renderer/checkbox-renderer.component';


@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent implements OnInit {
  @ViewChild("modalDivision") modalDivision: TemplateRef<any>;

  lstDivision: Division[] = new Array<Division>();
  lstDivisionMaster: Division[] = new Array<Division>();
  lstCountry: Country[] = new Array<Country>();
  selectedDivision: Division = new Division();
  reactiveForm = new FormGroup({});
  public pageModel: PageModel;
  queryObject: QueryObject = new QueryObject();

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
    private divisionService: DivisionService,
    private countryService: CountryService,
    private swal: SweetAlertService,
    private modalService: NgbModal
  ) {
    this.reactiveForm = new FormGroup({
      countryID: new FormControl(0, [Validators.required]),
      divisionName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      divisionCode: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      divisionNameBangla: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      isActive: new FormControl(''),
    });

    this.frameworkComponents = {
      checkboxRenderer: CheckboxRendererComponent
    };
  }

  ngOnInit() {
    this.pageModel = new PageModel();
    this.getAll();
    this.getAllCountry();
  }

  getAllCountry() {
    this.countryService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstCountry = Object.assign(this.lstCountry, res);
          this.lstCountry = [...this.lstCountry];
        }
      }
    );
  }

  getAll() {
    this.divisionService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstDivisionMaster = Object.assign(this.lstDivisionMaster, res);
          this.lstDivisionMaster = [...this.lstDivisionMaster];
          this.lstDivision = [...this.lstDivisionMaster];
          this.gridOptions.api.redrawRows();
        }
      }
    );
  }

  add() {
    this.selectedDivision = new Division();
    this.modalService.open(this.modalDivision, { size: 'md', backdrop: 'static' });
  }

  modalClose() {
    this.modalService.dismissAll(this.modalDivision);
  }

  onSubmit() {
    if (this.selectedDivision.divisionID > 0) {
      this.update();
    }

    if (!this.selectedDivision.divisionID) {
      this.save();
    }
  }

  async save() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.divisionService.save(this.selectedDivision).subscribe(
        (res: Division) => {
          if (res && res.divisionID > 0) {
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

  edit() {
    if (!this.selectedDivision.countryDivisionMap) {
      var map = new CountryDivisionMap();
      map.divisionID = this.selectedDivision.divisionID;
      map.countryID = 0;
      map.isActive = true;
      this.selectedDivision.countryDivisionMap = map;
    }

    this.modalService.open(this.modalDivision, { size: 'md', backdrop: 'static' });
  }

  async update() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.divisionService.update(this.selectedDivision).subscribe(
        (res: Division) => {
          if (res && res.divisionID > 0) {
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

  async remove() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.divisionService.delete(this.selectedDivision.divisionID).subscribe(
        (res) => {
          if (res) {
            this.swal.message('Data deleted', SweetAlertEnum.success);
            this.getAll();
          }
        }
      );
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    let nodes = this.gridApi.getRenderedNodes();
    if (nodes.length) {
      nodes[0].setSelected(true);
    }
  }

  onSelect() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows && selectedRows.length == 1) {
      this.selectedDivision = selectedRows[0];
    }
    else {
      this.selectedDivision = new Division();
    }
  }

  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }

  filter() {
    this.lstDivision = this.lstDivisionMaster;
    if (this.queryObject.countryID > 0) {
      this.lstDivision = this.lstDivision.filter(x => x.countryDivisionMap.countryID == this.queryObject.countryID);
    }
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
    isVisible: true, field: 'slNo', filter: false, headerName: 'SL', lockPosition: true,
    pinned: 'left', suppressMovable: true, valueGetter: "node.rowIndex + 1", resizable: false, width: 80
  } as ColDef,
  { isVisible: true, field: "countryName", headerName: 'Country Name' } as ColDef,
  { isVisible: true, field: "divisionName", headerName: 'Division Name' } as ColDef,
  { isVisible: true, field: "divisionCode", headerName: 'Division Code' } as ColDef,
  { isVisible: true, field: "divisionNameBangla", headerName: 'Division Name (বাংলা)' } as ColDef,
  {
    isVisible: true,
    field: "countryDivisionMap.isActive",
    headerName: 'Status',
    headerClass: 'ag-header-cell-label-center',
    cellRenderer: "checkboxRenderer",
    cellRendererParams: { display: 'flex', class: 'form-check-input', disabled: true },
    cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
  } as ColDef
];
