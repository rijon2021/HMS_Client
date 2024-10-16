import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { Division } from 'src/app/core/models/settings/division';
import { DivisionDistrictMap, District } from 'src/app/core/models/settings/district';
import { DivisionService } from 'src/app/core/services/settings/division.service';
import { DistrictService } from 'src/app/core/services/settings/district.service';
import { QueryObject } from 'src/app/core/models/core/queryObject';
import { Country } from 'src/app/core/models/settings/country';
import { CountryService } from 'src/app/core/services/settings/country.service';
import { CheckboxRendererComponent } from 'src/app/modules/renderer/checkbox-renderer/checkbox-renderer.component';


@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  @ViewChild("modalDistrict") modalDistrict: TemplateRef<any>;

  lstCountry: Country[] = new Array<Country>();
  lstDivision: Division[] = new Array<Division>();
  lstDistrict: District[] = new Array<District>();
  lstDistrictMaster: District[] = new Array<District>();
  selectedDistrict: District = new District();
  reactiveForm = new FormGroup({});
  public pageModel: PageModel;
  queryObject: QueryObject = new QueryObject();

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

  frameworkComponents: any;

  constructor(
    private countryService: CountryService,
    private districtService: DistrictService,
    private divisionService: DivisionService,
    private swal: SweetAlertService,
    private modalService: NgbModal
  ) {
    this.reactiveForm = new FormGroup({
      divisionID: new FormControl(0, [Validators.required]),
      districtName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      districtCode: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      districtNameBangla: new FormControl('', [Validators.required, Validators.maxLength(50)]),
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
    this.getAllDivision();
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

  getAllDivision() {
    this.divisionService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstDivision = Object.assign(this.lstDivision, res);
          this.lstDivision = [...this.lstDivision];
        }
      }
    );
  }

  getDivisionListByCountry() {
    if (this.queryObject.countryID > 0) {
      return this.lstDivision.filter(x => x.countryDivisionMap.countryID == this.queryObject.countryID);
    }
    else {
      return this.lstDivision;
    }
  }

  getAll() {
    this.districtService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstDistrictMaster = Object.assign(this.lstDistrictMaster, res);
          this.lstDistrictMaster = [...this.lstDistrictMaster];
          this.lstDistrict = this.lstDistrictMaster;
          this.gridOptions.api.redrawRows();
        }
      }
    )
  }

  add() {
    this.selectedDistrict = new District();
    this.modalService.open(this.modalDistrict, { size: 'md', backdrop: 'static' });
  }

  modalClose() {
    this.modalService.dismissAll(this.modalDistrict);
  }

  onSubmit() {
    if (this.selectedDistrict.districtID > 0) {
      this.update();
    }

    if (!this.selectedDistrict.districtID) {
      this.save();
    }
  }

  async save() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.districtService.save(this.selectedDistrict).subscribe(
        (res: District) => {
          if (res && res.districtID > 0) {
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
    if (!this.selectedDistrict.divisionDistrictMap) {
      var map = new DivisionDistrictMap();
      map.districtID = this.selectedDistrict.districtID;
      map.divisionID = 0;
      map.isActive = true;
      this.selectedDistrict.divisionDistrictMap = map;
    }

    this.modalService.open(this.modalDistrict, { size: 'md', backdrop: 'static' });
  }

  async update() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.districtService.update(this.selectedDistrict).subscribe(
        (res: District) => {
          if (res && res.districtID > 0) {
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
      this.districtService.delete(this.selectedDistrict.districtID).subscribe(
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
    this.gridColumnApi = params.columnApi;
    let nodes = this.gridApi.getRenderedNodes();
    if (nodes.length) {
      nodes[0].setSelected(true);
    }
  }

  onSelect() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows && selectedRows.length == 1) {
      this.selectedDistrict = selectedRows[0];
    }
    else {
      this.selectedDistrict = new District();
    }
  }

  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }

  filter() {
    this.lstDistrict = this.lstDistrictMaster;
    if (this.queryObject.countryID > 0) {
      this.lstDistrict = this.lstDistrict.filter(x => x.countryID == this.queryObject.countryID);
    }

    if (this.queryObject.divisionID > 0) {
      this.lstDistrict = this.lstDistrict.filter(x => x.divisionDistrictMap.divisionID == this.queryObject.divisionID);
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
  { isVisible: true, field: "districtName", headerName: 'District Name' } as ColDef,
  { isVisible: true, field: "districtCode", headerName: 'District Code' } as ColDef,
  { isVisible: true, field: "districtNameBangla", headerName: 'District Name (বাংলা)' } as ColDef,
  {
    isVisible: true, field: "divisionDistrictMap.isActive", headerName: 'Status', headerClass: 'ag-header-cell-label-center', cellRenderer: "checkboxRenderer",
    cellRendererParams: { display: 'flex', class: 'form-check-input', disabled: true },
    cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
  } as ColDef
];    
