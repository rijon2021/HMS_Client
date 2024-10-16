import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { UpazilaCityCorporation } from 'src/app/core/models/settings/upazilaCityCorporation';
import { UpazilaCityCorporationThanaMap, Thana } from 'src/app/core/models/settings/thana';
import { ThanaService } from 'src/app/core/services/settings/thana.service';
import { UpazilaCityCorporationService } from 'src/app/core/services/settings/upazila-city-corporation.service';
import { QueryObject } from 'src/app/core/models/core/queryObject';
import { Country } from 'src/app/core/models/settings/country';
import { CountryService } from 'src/app/core/services/settings/country.service';
import { DivisionService } from 'src/app/core/services/settings/division.service';
import { DistrictService } from 'src/app/core/services/settings/district.service';
import { Division } from 'src/app/core/models/settings/division';
import { District } from 'src/app/core/models/settings/district';
import { CheckboxRendererComponent } from 'src/app/modules/renderer/checkbox-renderer/checkbox-renderer.component';


@Component({
  selector: 'app-thana',
  templateUrl: './thana.component.html',
  styleUrls: ['./thana.component.css']
})
export class ThanaComponent implements OnInit {
  @ViewChild("modalThana") modalThana: TemplateRef<any>;

  lstCountry: Country[] = new Array<Country>();
  lstDivision: Division[] = new Array<Division>();
  lstDistrict: District[] = new Array<District>();
  lstUpazilaCityCorporation: UpazilaCityCorporation[] = new Array<UpazilaCityCorporation>();
  lstThana: Thana[] = new Array<Thana>();
  lstThanaMaster: Thana[] = new Array<Thana>();
  selectedThana: Thana = new Thana();
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
    private countryService: CountryService,
    private divisionService: DivisionService,
    private districtService: DistrictService,
    private upazilaCityCorporationService: UpazilaCityCorporationService,
    private thanaService: ThanaService,
    private swal: SweetAlertService,
    private modalService: NgbModal
  ) {
    this.reactiveForm = new FormGroup({
      upazilaCityCorporationID: new FormControl(0, [Validators.required]),
      thanaName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      thanaCode: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      thanaNameBangla: new FormControl('', [Validators.required, Validators.maxLength(50)]),
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
    this.getAllDistrict();
    this.getAllUpazilaCityCorporation();
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

  getAllDistrict() {
    this.districtService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstDistrict = Object.assign(this.lstDistrict, res);
          this.lstDistrict = [...this.lstDistrict];
        }
      }
    );
  }

  getAllUpazilaCityCorporation() {
    this.upazilaCityCorporationService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstUpazilaCityCorporation = Object.assign(this.lstUpazilaCityCorporation, res);
          this.lstUpazilaCityCorporation = [...this.lstUpazilaCityCorporation];
        }
      }
    );
  }

  getAll() {
    let orgID = parseInt(localStorage.getItem("ORGANIZATION_ID"));
    this.thanaService.getListByOrganizationID(orgID).subscribe(
      (res) => {
        if (res) {
          this.lstThanaMaster = Object.assign(this.lstThanaMaster, res);
          this.lstThanaMaster = [...this.lstThanaMaster];
          this.lstThana = this.lstThanaMaster
          this.gridOptions.api.redrawRows();
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

  getDistrictListByDivision() {
    if (this.queryObject.divisionID > 0) {
      return this.lstDistrict.filter(x => x.divisionDistrictMap.divisionID == this.queryObject.divisionID);
    }
    else {
      return this.lstDistrict;
    }
  }

  getUpazilaListByDistrict() {
    if (this.queryObject.districtID > 0) {
      return this.lstUpazilaCityCorporation.filter(x => x.districtUpazilaCityCorporationMap.districtID == this.queryObject.districtID);
    }
    else {
      return this.lstUpazilaCityCorporation;
    }
  }

  add() {
    this.selectedThana = new Thana();
    this.modalService.open(this.modalThana, { size: 'md', backdrop: 'static' });
  }

  modalClose() {
    this.modalService.dismissAll(this.modalThana);
  }

  onSubmit() {
    if (this.selectedThana.thanaID > 0) {
      this.update();
    }

    if (!this.selectedThana.thanaID) {
      this.save();
    }
  }

  async save() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.thanaService.save(this.selectedThana).subscribe(
        (res: Thana) => {
          if (res && res.thanaID > 0) {
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
    if (!this.selectedThana.upazilaCityCorporationThanaMap) {
      var map = new UpazilaCityCorporationThanaMap();
      map.thanaID = this.selectedThana.thanaID;
      map.upazilaCityCorporationID = 0;
      map.isActive = true;

      this.selectedThana.upazilaCityCorporationThanaMap = map;
    }

    this.modalService.open(this.modalThana, { size: 'md', backdrop: 'static' });
  }

  async update() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.thanaService.update(this.selectedThana).subscribe(
        (res: Thana) => {
          if (res && res.thanaID > 0) {
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
      this.thanaService.delete(this.selectedThana.thanaID).subscribe(
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
      this.selectedThana = selectedRows[0];
    }
    else {
      this.selectedThana = new Thana();
    }
  }

  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }

  filter(level: number) {
    this.lstThana = this.lstThanaMaster;
    if (level == 1) {
      this.queryObject.divisionID = 0;
      this.queryObject.districtID = 0;
      this.queryObject.upazilaCityCorporationID = 0;
    }
    else if (level == 2) {
      this.queryObject.districtID = 0;
      this.queryObject.upazilaCityCorporationID = 0;
    }
    else if (level == 3) {
      this.queryObject.upazilaCityCorporationID = 0;
    }
    if (this.queryObject.countryID > 0) {
      this.lstThana = this.lstThana.filter(x => x.countryID == this.queryObject.countryID)
    }
    if (this.queryObject.divisionID > 0) {
      this.lstThana = this.lstThana.filter(x => x.divisionID == this.queryObject.divisionID)
    }
    if (this.queryObject.districtID > 0) {
      this.lstThana = this.lstThana.filter(x => x.districtID == this.queryObject.districtID)
    }
    if (this.queryObject.upazilaCityCorporationID > 0) {
      this.lstThana = this.lstThana.filter(x => x.upazilaCityCorporationThanaMap.upazilaCityCorporationID == this.queryObject.upazilaCityCorporationID);
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
  { isVisible: true, field: "thanaName", headerName: 'Thana Name' } as ColDef,
  { isVisible: true, field: "thanaCode", headerName: 'Thana Code' } as ColDef,
  { isVisible: true, field: "thanaNameBangla", headerName: 'Thana Name (বাংলা)' } as ColDef,
  {
    isVisible: true,
    field: "upazilaCityCorporationThanaMap.isActive",
    headerName: 'Status',
    headerClass: 'ag-header-cell-label-center',
    cellRenderer: "checkboxRenderer",
    cellRendererParams: { display: 'flex', class: 'form-check-input', disabled: true },
    cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
  } as ColDef
];    
