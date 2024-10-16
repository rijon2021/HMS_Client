import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { QueryObject } from 'src/app/core/models/core/queryObject';
import { Organization } from 'src/app/core/models/data/organization';
import { ResponseMessage } from 'src/app/core/models/responseMessage';
import { Country, OrganizationCountryMap } from 'src/app/core/models/settings/country';
import { District, OrganizationDistrictMap } from 'src/app/core/models/settings/district';
import { Division, OrganizationDivisionMap } from 'src/app/core/models/settings/division';
import { OrganizationParaMap, Para } from 'src/app/core/models/settings/para';
import { OrganizationThanaMap, Thana } from 'src/app/core/models/settings/thana';
import { OrganizationUnionWardMap, UnionWard } from 'src/app/core/models/settings/unionWard';
import { OrganizationUpazilaCityCorporationMap, UpazilaCityCorporation } from 'src/app/core/models/settings/upazilaCityCorporation';
import { OrganizationVillageAreaMap, VillageArea } from 'src/app/core/models/settings/villageArea';
import { CountryService } from 'src/app/core/services/settings/country.service';
import { DistrictService } from 'src/app/core/services/settings/district.service';
import { DivisionService } from 'src/app/core/services/settings/division.service';
import { OrganizationAdministrativeUnitMapService } from 'src/app/core/services/settings/organization-administrative-unit-map.service';
import { ParaService } from 'src/app/core/services/settings/para.service';
import { ThanaService } from 'src/app/core/services/settings/thana.service';
import { UnionWardService } from 'src/app/core/services/settings/union-ward.service';
import { UpazilaCityCorporationService } from 'src/app/core/services/settings/upazila-city-corporation.service';
import { VillageAreaService } from 'src/app/core/services/settings/village-area.service';
import { CheckboxRendererComponent } from 'src/app/modules/renderer/checkbox-renderer/checkbox-renderer.component';


@Component({
  selector: 'app-organization-administrative-unit-map',
  templateUrl: './organization-administrative-unit-map.component.html',
  styleUrls: ['./organization-administrative-unit-map.component.scss']
})
export class OrganizationAdministrativeUnitMapComponent implements OnInit {

  public pageModel: PageModel;
  public organizationTypeName: string;
  public organizationShortName: string;
  public organizationAddress: string;
  public lstOrganization: Organization[] = new Array<Organization>();
  public lstCountry: Country[] = new Array<Country>();
  public lstDivision: Division[] = new Array<Division>();
  public lstDistrict: District[] = new Array<District>();
  public lstUpazilaCityCorporation: UpazilaCityCorporation[] = new Array<UpazilaCityCorporation>();
  public lstThana: Thana[] = new Array<Thana>();
  public lstUnionWard: UnionWard[] = new Array<UnionWard>();
  public lstVillageArea: VillageArea[] = new Array<VillageArea>();
  public lstPara: Para[] = new Array<Para>();


  public selectedOrganization: Organization = new Organization();
  public selectedCountry: Country = new Country();
  public selectedDivision: Division = new Division();
  public selectedDistrict: District = new District();
  public selectedUpazilaCityCorporation: UpazilaCityCorporation = new UpazilaCityCorporation();
  public selectedThana: Thana = new Thana();
  public selectedUnionWard: UnionWard = new UnionWard();
  public selectedVillageArea: VillageArea = new VillageArea();
  public selectedPara: Para = new Para();

  public checkTotalNumber: number = 0;

  public activePanel = [];

  // ag-grid
  private gridApi;
  private gridColumnApi;

  country_columnDefs = [
    { headerName: "", field: "isChecked", cellRenderer: "checkboxRenderer", width: 50, lockPosition: true, pinned: 'left', suppressMovable: true, } as ColDef,
    { field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left', suppressMovable: true, valueGetter: "node.rowIndex + 1", resizable: false, width: 80 } as ColDef,
    { field: "countryName", headerName: 'Country Name', } as ColDef,
    { field: "countryCode", headerName: 'Country Code' } as ColDef,
    { field: "countryNameBangla", headerName: 'Country Name (বাংলা)' } as ColDef,
  ];

  division_columnDefs = [
    { headerName: "", field: "isChecked", cellRenderer: "checkboxRenderer", width: 50, lockPosition: true, pinned: 'left', suppressMovable: true, } as ColDef,
    { field: 'orderNo', headerName: 'SL', lockPosition: true, pinned: 'left', suppressMovable: true, resizable: false, width: 80 } as ColDef,
    { field: "countryName", headerName: 'Country Name' } as ColDef,
    { field: "divisionName", headerName: 'Division Name' } as ColDef,
    { field: "divisionCode", headerName: 'Division Code' } as ColDef,
    { field: "divisionNameBangla", headerName: 'Division Name (বাংলা)' } as ColDef,
  ];

  district_columnDefs = [
    { headerName: "", field: "isChecked", cellRenderer: "checkboxRenderer", width: 50, lockPosition: true, pinned: 'left', suppressMovable: true, } as ColDef,
    { field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left', suppressMovable: true, valueGetter: "node.rowIndex + 1", resizable: false, width: 80 } as ColDef,
    { field: "divisionName", headerName: 'Division Name' } as ColDef,
    { field: "districtName", headerName: 'District Name' } as ColDef,
    { field: "districtCode", headerName: 'District Code' } as ColDef,
    { field: "districtNameBangla", headerName: 'District Name (বাংলা)' } as ColDef,
  ];

  upazila_columnDefs = [
    { headerName: "", field: "isChecked", cellRenderer: "checkboxRenderer", width: 50, lockPosition: true, pinned: 'left', suppressMovable: true, } as ColDef,
    { field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left', suppressMovable: true, valueGetter: "node.rowIndex + 1", resizable: false, width: 80 } as ColDef,
    { field: "districtName", headerName: 'District Name' } as ColDef,
    { field: "upazilaCityCorporationName", headerName: 'Upazila / CityCorporation Name' } as ColDef,
    { field: "upazilaCityCorporationCode", headerName: 'Upazila / CityCorporation Code' } as ColDef,
    { field: "upazilaCityCorporationNameBangla", headerName: 'Upazila / CityCorporation Name (বাংলা)' } as ColDef,
  ];

  thana_columnDefs = [
    { headerName: "", field: "isChecked", cellRenderer: "checkboxRenderer", width: 50, lockPosition: true, pinned: 'left', suppressMovable: true, } as ColDef,
    { field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left', suppressMovable: true, valueGetter: "node.rowIndex + 1", resizable: false, width: 80 } as ColDef,
    { field: "upazilaCityCorporationName", headerName: 'Upazila / CityCorporation Name' } as ColDef,
    { field: "thanaName", headerName: 'Thana Name' } as ColDef,
    { field: "thanaCode", headerName: 'Thana Code' } as ColDef,
    { field: "thanaNameBangla", headerName: 'Thana Name (বাংলা)' } as ColDef,
  ];

  union_columnDefs = [
    { headerName: "", field: "isChecked", cellRenderer: "checkboxRenderer", width: 50, lockPosition: true, pinned: 'left', suppressMovable: true, } as ColDef,
    { field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left', suppressMovable: true, valueGetter: "node.rowIndex + 1", resizable: false, width: 80 } as ColDef,
    { field: "thanaName", headerName: 'Thana Name' } as ColDef,
    { field: "unionWardName", headerName: 'Union / Ward Name' } as ColDef,
    { field: "unionWardCode", headerName: 'Union / Ward Code' } as ColDef,
    { field: "unionWardNameBangla", headerName: 'Union / Ward Name (বাংলা)' } as ColDef,
  ];

  villageArea_columnDefs = [
    { headerName: "", field: "isChecked", cellRenderer: "checkboxRenderer", width: 50, lockPosition: true, pinned: 'left', suppressMovable: true, } as ColDef,
    { field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left', suppressMovable: true, valueGetter: "node.rowIndex + 1", resizable: false, width: 80 } as ColDef,
    { field: "unionWardName", headerName: 'Union / Ward Name' } as ColDef,
    { field: "villageAreaName", headerName: 'Village Area' } as ColDef,
    { field: "villageAreaCode", headerName: 'Village Code' } as ColDef,
    { field: "villageAreaNameBangla", headerName: 'Village Name (বাংলা)' } as ColDef,
  ];

  para_columnDefs = [
    { headerName: "", field: "isChecked", cellRenderer: "checkboxRenderer", width: 50, lockPosition: true, pinned: 'left', suppressMovable: true, } as ColDef,
    { field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left', suppressMovable: true, valueGetter: "node.rowIndex + 1", resizable: false, width: 80 } as ColDef,
    { field: "villageAreaName", headerName: 'Village Area' } as ColDef,
    { field: "paraName", headerName: 'Para Area' } as ColDef,
    { field: "paraCode", headerName: 'Para Code' } as ColDef,
    { field: "paraNameBangla", headerName: 'Para Name (বাংলা)' } as ColDef,
  ];


  country_gridOptions: GridOptions = {
    pagination: true,
    rowSelection: 'single',
    suppressDragLeaveHidesColumns: true,
    rowMultiSelectWithClick: true,
    suppressRowDrag: false,
    rowDragEntireRow: true,
    rowDragMultiRow: true,
    animateRows: true,
    rowDragManaged: true,
    getRowHeight: () => 40,
    defaultColDef: dataDefaultColDef,

    // isRowSelectable: (rowNode) => { // Só deixa selecionar as linhas isEnabled
    //   return rowNode.data.isChecked;
    // }
  }

  division_gridOptions: GridOptions = {
    pagination: true,
    rowSelection: 'single',
    suppressDragLeaveHidesColumns: true,
    suppressRowDrag: false,
    rowDragEntireRow: true,
    rowDragMultiRow: true,
    animateRows: true,
    rowDragManaged: true,
    getRowHeight: () => 40,
    defaultColDef: dataDefaultColDef,
  }

  district_gridOptions: GridOptions = {
    pagination: true,
    rowSelection: 'single',
    suppressDragLeaveHidesColumns: true,
    suppressRowDrag: false,
    rowDragEntireRow: true,
    rowDragMultiRow: true,
    animateRows: true,
    rowDragManaged: true,
    getRowHeight: () => 40,
    defaultColDef: dataDefaultColDef,
  }

  upazila_gridOptions: GridOptions = {
    pagination: true,
    rowSelection: 'single',
    suppressDragLeaveHidesColumns: true,
    suppressRowDrag: false,
    rowDragEntireRow: true,
    rowDragMultiRow: true,
    animateRows: true,
    rowDragManaged: true,
    getRowHeight: () => 40,
    defaultColDef: dataDefaultColDef,
  }

  thana_gridOptions: GridOptions = {
    pagination: true,
    rowSelection: 'single',
    suppressDragLeaveHidesColumns: true,
    suppressRowDrag: false,
    rowDragEntireRow: true,
    rowDragMultiRow: true,
    animateRows: true,
    rowDragManaged: true,
    getRowHeight: () => 40,
    defaultColDef: dataDefaultColDef,
  }

  union_gridOptions: GridOptions = {
    pagination: true,
    rowSelection: 'single',
    suppressDragLeaveHidesColumns: true,
    suppressRowDrag: false,
    rowDragEntireRow: true,
    rowDragMultiRow: true,
    animateRows: true,
    rowDragManaged: true,
    getRowHeight: () => 40,
    defaultColDef: dataDefaultColDef,
  }

  villageArea_gridOptions: GridOptions = {
    pagination: true,
    rowSelection: 'single',
    suppressDragLeaveHidesColumns: true,
    suppressRowDrag: false,
    rowDragEntireRow: true,
    rowDragMultiRow: true,
    animateRows: true,
    rowDragManaged: true,
    getRowHeight: () => 40,
    defaultColDef: dataDefaultColDef,
  }

  para_gridOptions: GridOptions = {
    pagination: true,
    rowSelection: 'single',
    suppressDragLeaveHidesColumns: true,
    suppressRowDrag: false,
    rowDragEntireRow: true,
    rowDragMultiRow: true,
    animateRows: true,
    rowDragManaged: true,
    getRowHeight: () => 40,
    defaultColDef: dataDefaultColDef,
  }

  frameworkComponents: any;
  // end

  constructor(
    private mapService: OrganizationAdministrativeUnitMapService,
    private countryService: CountryService,
    private divisionService: DivisionService,
    private districtService: DistrictService,
    private upazilaCityCorporationService: UpazilaCityCorporationService,
    private thanaService: ThanaService,
    private unionWardService: UnionWardService,
    private villageAreaService: VillageAreaService,
    private paraService: ParaService,
    private swal: SweetAlertService
  ) {
    this.frameworkComponents = {
      checkboxRenderer: CheckboxRendererComponent
    };
  }

  ngOnInit(): void {
    this.pageModel = new PageModel();
    this.pageModel.isCheckAll_Country = false;
    this.getInitialData();
    this.selectedOrganization.organizationID = 0;
    // this.activePanel = ['countryPannelID','divisionPannelID','UNIQ_ID'];
  }

  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  checkedHandler(event) {
    let checked = event.target.checked;
    let colId = this.params.column.colId;
    this.params.node.setDataValue(colId, checked);
  }

  getInitialData() {
    this.mapService.getInitialData().subscribe(
      (res: ResponseMessage) => {
        if (res) {
          this.lstOrganization = res.responseObj.lstOrganization;
          this.lstCountry = res.responseObj.lstCountry;
          this.lstCountry.forEach(x => {
            x.organizationCountryMap = new OrganizationCountryMap();
          })
        }
      }
    );
  }

  load_country() {
    this.activePanel.push('countryPannelID');
    this.organizationTypeName = this.lstOrganization.find(x => x.organizationID == this.selectedOrganization.organizationID).organizationTypeStr;
    // this.organizationShortName = this.lstOrganization.find(x=>x.organizationID == this.selectedOrganization.organizationID).organizationShotName;
    this.organizationAddress = this.lstOrganization.find(x => x.organizationID == this.selectedOrganization.organizationID).address;

    if (this.selectedOrganization.organizationID > 0) {
      this.lstCountry.forEach(x => { x.isChecked = false; });
      this.countryService.getListByOrganization([this.selectedOrganization]).subscribe(
        (res: Country[]) => {
          if (res) {
            this.lstCountry.forEach(x => {
              res.forEach(y => {
                if (x.countryID == y.countryID) {
                  x.isChecked = y.organizationCountryMap.isActive;
                  x.organizationCountryMap = y.organizationCountryMap;
                }
                else {
                  x.organizationCountryMap.organizationID = 0;
                }
              })
            })
            this.pageModel.totalCountry = this.lstCountry.length;
            this.pageModel.totalCountryChecked = this.lstCountry.filter(x => x.isChecked == true).length;

            this.country_gridOptions.api.redrawRows();
          }
        }
      );
    }
  }

  load_division() {
    this.activePanel.push('divisionPannelID');

    // this.activePanel = 'divisionPannelID';
    // var data = this.country_gridOptions.api.getSelectedRows();
    if (this.selectedOrganization.organizationID == 0) {
      this.swal.message('please select any organization', SweetAlertEnum.info);
      return
    }

    // if (data.length == 0) {
    //   this.swal.message('No data selected', SweetAlertEnum.info);
    //   return
    // }
    // data[0].organizationCountryMap.organizationID = this.selectedOrganization.organizationID;
    this.divisionService.getListByOrganizationID(this.selectedOrganization.organizationID).subscribe(
      (res: Division[]) => {
        if (res) {
          this.lstDivision = res;
          this.pageModel.totalDivision = this.lstDivision.length;
          this.pageModel.totalDivisionChecked = this.lstDivision.filter(x => x.isChecked == true).length;
          this.division_gridOptions.api.redrawRows();
        }
      }
    );
  }

  load_district() {
    if (this.selectedOrganization.organizationID == 0) {
      this.swal.message('please select any organization', SweetAlertEnum.info);
      return
    }

    this.districtService.getListByOrganizationID(this.selectedOrganization.organizationID).subscribe(
      (res: District[]) => {
        if (res) {
          this.lstDistrict = res;
          this.pageModel.totalDistrict = this.lstDistrict.length;
          this.pageModel.totalDistrictChecked = this.lstDistrict.filter(x => x.isChecked == true).length;
          this.district_gridOptions.api.redrawRows();
        }
      }
    );
  }

  load_upazila() {
    if (this.selectedOrganization.organizationID == 0) {
      this.swal.message('please select any organization', SweetAlertEnum.info);
      return
    }

    this.upazilaCityCorporationService.getListByOrganizationID(this.selectedOrganization.organizationID).subscribe(
      (res: UpazilaCityCorporation[]) => {
        if (res) {
          this.lstUpazilaCityCorporation = res;
          this.pageModel.totalUpazila = this.lstUpazilaCityCorporation.length;
          this.pageModel.totalUpazilaChecked = this.lstUpazilaCityCorporation.filter(x => x.isChecked == true).length;

          this.upazila_gridOptions.api.redrawRows();
        }
      }
    )
  }

  load_thana() {
    if (this.selectedOrganization.organizationID == 0) {
      this.swal.message('please select any organization', SweetAlertEnum.info);
      return;
    }

    this.thanaService.getListByOrganizationID(this.selectedOrganization.organizationID).subscribe(
      (res: Thana[]) => {
        if (res) {
          this.lstThana = res;
          this.pageModel.totalThana = this.lstThana.length;
          this.pageModel.totalThanaChecked = this.lstThana.filter(x => x.isChecked == true).length;
          this.thana_gridOptions.api.redrawRows();
        }
      }
    );
  }

  load_union() {
    if (this.selectedOrganization.organizationID == 0) {
      this.swal.message('please select any organization', SweetAlertEnum.info);
      return
    }

    this.unionWardService.getListByOrganizationID(this.selectedOrganization.organizationID).subscribe(
      (res: UnionWard[]) => {
        if (res) {
          this.lstUnionWard = res;
          this.pageModel.totalUnion = this.lstUnionWard.length;
          this.pageModel.totalUnionChecked = this.lstUnionWard.filter(x => x.isChecked == true).length;
          this.union_gridOptions.api.redrawRows();
        }
      }
    );
  }

  load_villageArea() {
    if (this.selectedOrganization.organizationID == 0) {
      this.swal.message('please select any organization', SweetAlertEnum.info);
      return
    }

    this.villageAreaService.getListByOrganizationID(this.selectedOrganization.organizationID).subscribe(
      (res: VillageArea[]) => {
        if (res) {

          this.lstVillageArea = res;

          this.pageModel.totalVillage = this.lstVillageArea.length;
          this.pageModel.totalVillageChecked = this.lstVillageArea.filter(x => x.isChecked == true).length;
          this.villageArea_gridOptions.api.redrawRows();

          if (this.lstVillageArea.length == this.lstVillageArea.filter(x => x.isChecked).length) {
            this.pageModel.isCheckAll_Village = true;
          }
          else {
            this.pageModel.isCheckAll_Village = false;
          }
        }
      }
    );
  }

  load_Para() {
    if (this.selectedOrganization.organizationID == 0) {
      this.swal.message('please select any organization', SweetAlertEnum.info);
      return
    }

    this.paraService.getListByOrganizationID(this.selectedOrganization.organizationID).subscribe(
      (res: Para[]) => {
        if (res) {
          this.lstPara = res;
          this.pageModel.totalPara = this.lstPara.length;
          this.pageModel.totalParaChecked = this.lstPara.filter(x => x.isChecked == true).length;
          this.para_gridOptions.api.redrawRows();
          if (this.lstPara.length == this.lstPara.filter(x => x.isChecked).length) {
            this.pageModel.isCheckAll_Para = true;
          }
          else {
            this.pageModel.isCheckAll_Para = false;
          }
        }
      }
    );
  }

  onSelectDivision(division: Division) {
    if (division.divisionID > 0) {
      this.lstDistrict = [];
      this.selectedDivision = division;
      let queryObj: QueryObject = new QueryObject();
      queryObj.divisionID = this.selectedDivision.divisionID;
      this.districtService.search(queryObj).subscribe(
        (res: District[]) => {
          if (res && res.length > 0) {
            this.lstDistrict = res;
            this.lstDistrict.forEach(x => {
              x.isChecked = false;
              if (x.divisionDistrictMap && x.divisionDistrictMap.organizationID == this.selectedOrganization.organizationID)
                x.isChecked = true;
            })
          }
        }
      );
    }
  }

  onSelectDistrict(district: District) {
    if (district.districtID > 0) {
      this.lstUpazilaCityCorporation = [];
      this.selectedDistrict = district;
      let queryObj: QueryObject = new QueryObject();
      queryObj.districtID = this.selectedDistrict.districtID;
      this.upazilaCityCorporationService.search(queryObj).subscribe(
        (res: UpazilaCityCorporation[]) => {
          if (res && res.length > 0) {
            this.lstUpazilaCityCorporation = res;
            this.lstUpazilaCityCorporation.forEach(x => {
              x.isChecked = false;
              if (x.districtUpazilaCityCorporationMap && x.districtUpazilaCityCorporationMap.organizationID == this.selectedOrganization.organizationID)
                x.isChecked = true;
            })
            // }
          }
        }
      );
    }
  }

  onSelectUpazilaCityCorporation(upazilaCityCorporation: UpazilaCityCorporation) {
    if (upazilaCityCorporation.upazilaCityCorporationID > 0) {
      this.lstThana = [];
      this.selectedUpazilaCityCorporation = upazilaCityCorporation;
      let queryObj: QueryObject = new QueryObject();
      queryObj.upazilaCityCorporationID = this.selectedUpazilaCityCorporation.upazilaCityCorporationID;
      this.thanaService.search(queryObj).subscribe(
        (res: UpazilaCityCorporation[]) => {
          if (res && res.length > 0) {
            this.lstUpazilaCityCorporation = res;
            this.lstUpazilaCityCorporation.forEach(x => {
              x.isChecked = false;
              if (x.districtUpazilaCityCorporationMap && x.districtUpazilaCityCorporationMap.organizationID == this.selectedOrganization.organizationID)
                x.isChecked = true;
            })
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
      nodes[0].setSelected(true); //selects the first row in the rendered view
    }
  }

  onSelect(tableNo: number) {
    const selectedRows = this.gridApi.getSelectedRows();
  }

  // SAVE WORK
  // updateOrder(oList, gridApi) {
  //   let dataLength = oList.length;
  //   for (let i = 0; i < dataLength; i++) {
  //     let row = gridApi.getDisplayedRowAtIndex(i);
  //     let dbData = oList.find(x => x.divisionID == row.data.divisionID);
  //     dbData.countryDivisionMap.orderNo = i + 1;
  //   }
  // }

  async save_organizationCountryMap() {
    if (await this.swal.confirm_custom('Are you sure', SweetAlertEnum.question, true, false)) {
      if (!this.selectedOrganization.organizationID) {
        this.swal.message('Please select organization !', SweetAlertEnum.error);
        return;
      }

      let lstData = [];
      this.lstCountry.forEach(x => {
        if (x.isChecked) {
          if (x.organizationCountryMap && x.organizationCountryMap?.countryID > 0) {
            x.organizationCountryMap.isActive = true;
            lstData.push(x.organizationCountryMap);
          }
          else {
            x.organizationCountryMap = new OrganizationCountryMap();
            x.organizationCountryMap.isActive = true;
            x.organizationCountryMap.countryID = x.countryID;
            lstData.push(x.organizationCountryMap);
          }
        }
        else {
          if (x.organizationCountryMap) {
            x.organizationCountryMap.isActive = false;
            lstData.push(x.organizationCountryMap);
          }
        }
      });

      if (lstData) {
        lstData.forEach(x => {
          x.organizationID = this.selectedOrganization.organizationID;
        })
      }

      this.mapService.saveOrganizationCountryMap(lstData).subscribe(
        (res) => {
          if (res) {
            this.swal.message('Data Saved Successfully', SweetAlertEnum.success);
            this.load_country();
          }
        }
      );
    }
  }

  async save_OrganizationDivisionMap() {
    if (await this.swal.confirm_custom('Are you sure', SweetAlertEnum.question, true, false)) {
      let lstData = [];
      let serialNo = 1;
      this.lstDivision.forEach(x => {
        if (x.isChecked) {
          if (x.organizationDivisionMap) {
            x.organizationDivisionMap.isActive = true;
            x.organizationDivisionMap.organizationID = this.selectedOrganization.organizationID;
            x.organizationDivisionMap.orderNo = serialNo++;
            lstData.push(x.organizationDivisionMap);
          }
          else {
            x.organizationDivisionMap = new OrganizationDivisionMap();
            x.organizationDivisionMap.isActive = true;
            x.organizationDivisionMap.divisionID = x.divisionID;
            x.organizationDivisionMap.organizationID = this.selectedOrganization.organizationID;
            lstData.push(x.organizationDivisionMap);
          }
        }
        else {
          if (x.organizationDivisionMap) {
            x.organizationDivisionMap.isActive = false;
            x.organizationDivisionMap.organizationID = this.selectedOrganization.organizationID;
            lstData.push(x.organizationDivisionMap);
          }
        }
      });

      this.mapService.saveOrganizationDivisionMap(lstData).subscribe(
        (res) => {
          if (res) {
            this.swal.message('Data Saved Successfully', SweetAlertEnum.success);
            this.load_division();
          }
        }
      );
    }
  }

  async saveOrganizationDistrictMap() {
    if (await this.swal.confirm_custom('Are you sure', SweetAlertEnum.question, true, false)) {
      let lstData = [];
      this.lstDistrict.forEach(x => {
        if (x.isChecked) {
          if (x.organizationDistrictMap) {
            x.organizationDistrictMap.isActive = true;
            x.organizationDistrictMap.organizationID = this.selectedOrganization.organizationID;
            lstData.push(x.organizationDistrictMap);
          }
          else {
            x.organizationDistrictMap = new OrganizationDistrictMap();
            x.organizationDistrictMap.isActive = true;
            x.organizationDistrictMap.districtID = x.districtID;
            x.organizationDistrictMap.organizationID = this.selectedOrganization.organizationID;
            lstData.push(x.organizationDistrictMap);
          }
        }
        else {
          if (x.organizationDistrictMap) {
            x.organizationDistrictMap.isActive = false;
            x.organizationDistrictMap.organizationID = this.selectedOrganization.organizationID;
            lstData.push(x.organizationDistrictMap);
          }
        }
      });

      this.mapService.saveOrganizationDistrictMap(lstData).subscribe(
        (res) => {
          if (res) {
            this.swal.message('Data Saved Successfully', SweetAlertEnum.success);
            this.load_district();
          }
        }
      );
    }
  }

  async save_organizationUpazilaCityCorporationMap() {
    if (await this.swal.confirm_custom('Are you sure', SweetAlertEnum.question, true, false)) {
      let lstData = [];
      this.lstUpazilaCityCorporation.forEach(x => {
        if (x.isChecked) {
          if (x.organizationUpazilaCityCorporationMap) {
            x.organizationUpazilaCityCorporationMap.isActive = true;
            x.organizationUpazilaCityCorporationMap.organizationID = this.selectedOrganization.organizationID;
            lstData.push(x.organizationUpazilaCityCorporationMap);
          }
          else {
            x.organizationUpazilaCityCorporationMap = new OrganizationUpazilaCityCorporationMap();
            x.organizationUpazilaCityCorporationMap.isActive = true;
            x.organizationUpazilaCityCorporationMap.upazilaCityCorporationID = x.upazilaCityCorporationID;
            x.organizationUpazilaCityCorporationMap.organizationID = this.selectedOrganization.organizationID;
            lstData.push(x.organizationUpazilaCityCorporationMap);
          }
        }
        else {
          if (x.organizationUpazilaCityCorporationMap) {
            x.organizationUpazilaCityCorporationMap.isActive = false;
            x.organizationUpazilaCityCorporationMap.organizationID = this.selectedOrganization.organizationID;
            lstData.push(x.organizationUpazilaCityCorporationMap);
          }
        }
      });

      this.mapService.saveOrganizationUpazilaCityCorporationMap(lstData).subscribe(
        (res) => {
          if (res) {
            this.swal.message('Data Saved Successfully', SweetAlertEnum.success);
            this.load_upazila();
          }
        }
      );
    }
  }

  async save_OrganizationThanaMap() {
    if (await this.swal.confirm_custom('Are you sure', SweetAlertEnum.question, true, false)) {
      let lstData = [];
      this.lstThana.forEach(x => {
        if (x.isChecked) {
          if (x.organizationThanaMap) {
            x.organizationThanaMap.isActive = true;
            x.organizationThanaMap.organizationID = this.selectedOrganization.organizationID;
            lstData.push(x.organizationThanaMap);
          }
          else {
            x.organizationThanaMap = new OrganizationThanaMap();
            x.organizationThanaMap.isActive = true;
            x.organizationThanaMap.thanaID = x.thanaID;
            x.organizationThanaMap.organizationID = this.selectedOrganization.organizationID;
            lstData.push(x.organizationThanaMap);
          }
        }
        else {
          if (x.organizationThanaMap) {
            x.organizationThanaMap.isActive = false;
            x.organizationThanaMap.organizationID = this.selectedOrganization.organizationID;
            lstData.push(x.organizationThanaMap);
          }
        }
      });

      this.mapService.saveOrganizationThanaMap(lstData).subscribe(
        (res) => {
          if (res) {
            this.swal.message('Data Saved Successfully', SweetAlertEnum.success);
            this.load_thana();
          }
        }
      );
    }
  }

  async save_OrganizationUnionWardMap() {
    if (await this.swal.confirm_custom('Are you sure', SweetAlertEnum.question, true, false)) {
      let lstData = [];
      this.lstUnionWard.forEach(x => {
        if (x.isChecked) {
          if (x.organizationUnionWardMap) {
            x.organizationUnionWardMap.isActive = true;
            x.organizationUnionWardMap.organizationID = this.selectedOrganization.organizationID;
            lstData.push(x.organizationUnionWardMap);
          }
          else {
            x.organizationUnionWardMap = new OrganizationUnionWardMap();
            x.organizationUnionWardMap.isActive = true;
            x.organizationUnionWardMap.unionWardID = x.unionWardID;
            x.organizationUnionWardMap.organizationID = this.selectedOrganization.organizationID;
            lstData.push(x.organizationUnionWardMap);
          }
        }
        else {
          if (x.organizationUnionWardMap) {
            x.organizationUnionWardMap.isActive = false;
            x.organizationUnionWardMap.organizationID = this.selectedOrganization.organizationID;
            lstData.push(x.organizationUnionWardMap);
          }
        }
      });

      this.mapService.saveOrganizationUnionWardMap(lstData).subscribe(
        (res) => {
          if (res) {
            this.swal.message('Data Saved Successfully', SweetAlertEnum.success);
            this.load_union();
          }
        }
      );
    }
  }

  async save_OrganizationVillageAreaMap() {
    if (await this.swal.confirm_custom('Are you sure', SweetAlertEnum.question, true, false)) {
      let lstData = [];
      this.lstVillageArea.forEach(x => {
        if (x.isChecked) {
          if (x.organizationVillageAreaMap) {
            x.organizationVillageAreaMap.isActive = true;
            x.organizationVillageAreaMap.organizationID = this.selectedOrganization.organizationID;
            lstData.push(x.organizationVillageAreaMap);
          }
          else {
            x.organizationVillageAreaMap = new OrganizationVillageAreaMap();
            x.organizationVillageAreaMap.isActive = true;
            x.organizationVillageAreaMap.villageAreaID = x.villageAreaID;
            x.organizationVillageAreaMap.organizationID = this.selectedOrganization.organizationID;
            lstData.push(x.organizationVillageAreaMap);
          }
        }
        else {
          if (x.organizationVillageAreaMap) {
            x.organizationVillageAreaMap.isActive = false;
            x.organizationVillageAreaMap.organizationID = this.selectedOrganization.organizationID;
            lstData.push(x.organizationVillageAreaMap);
          }
        }
      });

      this.mapService.saveOrganizationVillageAreaMap(lstData).subscribe(
        (res) => {
          if (res) {
            this.swal.message('Data Saved Successfully', SweetAlertEnum.success);
            this.load_villageArea();
          }
        }
      );
    }
  }

  async save_OrganizationParaMap() {
    if (await this.swal.confirm_custom('Are you sure', SweetAlertEnum.question, true, false)) {
      let lstData = [];
      this.lstPara.forEach(x => {
        if (x.isChecked) {
          if (x.organizationParaMap) {
            x.organizationParaMap.isActive = true;
            x.organizationParaMap.organizationID = this.selectedOrganization.organizationID;
            lstData.push(x.organizationParaMap);
          }
          else {
            x.organizationParaMap = new OrganizationParaMap();
            x.organizationParaMap.isActive = true;
            x.organizationParaMap.paraID = x.paraID;
            x.organizationParaMap.organizationID = this.selectedOrganization.organizationID;
            lstData.push(x.organizationParaMap);
          }
        }
        else {
          if (x.organizationParaMap) {
            x.organizationParaMap.isActive = false;
            x.organizationParaMap.organizationID = this.selectedOrganization.organizationID;
            lstData.push(x.organizationParaMap);
          }
        }
      });

      this.mapService.saveOrganizationParaMap(lstData).subscribe(
        (res) => {
          if (res) {
            this.swal.message('Data Saved Successfully', SweetAlertEnum.success);
            this.load_Para();
          }
        }
      );
    }
  }

  checkAll(dataList, gridOption, isChecked) {
    dataList.forEach(x => {
      x.isChecked = !isChecked;
    });

    gridOption.api.redrawRows();
  }

  isExpanded(name: string) {
    switch (name) {
      case 'division':
        this.load_division();
        break;
      case 'district':
        this.load_district();
        break;
      case 'upazila':
        this.load_upazila();
        break;
      case 'thana':
        this.load_thana();
        break;
      case 'union':
        this.load_union();
        break;
      case 'village':
        this.load_villageArea();
        break;
      case 'para':
        this.load_Para();
        break;
      default:
        this.load_country();
        break;
    }

    // console.log(methodeName);
    // if(name == 'division'){
    //   this.load_division();
    // }else if(name == 'district'){
    //   this.load_district();
    // }else if(name == 'upazila'){
    //   this.load_upazila();
    // }else if(name == 'thana'){
    //   this.load_thana();
    // }else if(name == 'union'){
    //   this.load_union();
    // }else if(name == 'village'){
    //   this.load_villageArea();
    // }else if(name == 'para'){
    //   this.load_Para();
    // }

    // this.aaaa = name;
    // this.aaaa;
    // console.log(this.aaaa);

    //  eval(aaaa);
    // let temp_function = new Function(methodeName);
    // temp_function();
  }
}

const dataDefaultColDef: ColDef = {
  resizable: true,
  sortable: true,
  suppressMovable: false,
  filter: true,
  cellClass: 'suppress-movable-col'
};
