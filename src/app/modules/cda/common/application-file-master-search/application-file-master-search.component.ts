import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApplicationStatus, ApplicationType } from 'src/app/core/enums/globalEnum';
import { ApplicationFileMaster } from 'src/app/core/models/cda/applicationFileMaster';
import { InspectionMonitoringSearch } from 'src/app/core/models/cda/inspectionMonitoringSearch';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';
import { ResponseMessage } from 'src/app/core/models/responseMessage';
import { Department } from 'src/app/core/models/settings/department';
import { DPZ } from 'src/app/core/models/settings/dpz';
import { Mouza } from 'src/app/core/models/settings/mouza';
import { Thana } from 'src/app/core/models/settings/thana';
import { Users } from 'src/app/core/models/settings/users';
import { ApplicationFileMasterService } from 'src/app/core/services/cda/application-file-master.service';
import { InspectionMonitoringService } from 'src/app/core/services/cda/inspection-monitoring.service';
import { ThanaService } from 'src/app/core/services/settings/thana.service';


@Component({
  selector: 'app-application-file-master-search',
  templateUrl: './application-file-master-search.component.html',
  styleUrls: ['./application-file-master-search.component.css']
})
export class ApplicationFileMasterSearchComponent implements OnInit {

  pageModel: PageModel = new PageModel();
  activeQuickSearch: boolean = false;
  searchObj: InspectionMonitoringSearch = new InspectionMonitoringSearch();
  fileOrRefNo: string;
  lstDepartment: Department[] = new Array<Department>();
  lstApplicationType: ApplicationType[] = new Array<ApplicationType>();
  lstDPZ: DPZ[] = new Array<DPZ>();
  lstThana: Thana[] = new Array<Thana>();
  lstMouza: Mouza[] = new Array<Mouza>();
  lstUser: Users[] = new Array<Users>();
  lstApplicationStatus: ApplicationStatus[] = new Array<ApplicationStatus>();
  lstApplicationFileMaster: ApplicationFileMaster[] = new Array<ApplicationFileMaster>();
  utils: any;

  lstApplicationFileMaster_checked: ApplicationFileMaster[] = new Array<ApplicationFileMaster>();
  lstAttachmentAllType: any;
  lstAttachmentSingleType: any;
  responsData: any;
  lightboxAlbums = [];
  agmInfoSlideToggler: boolean = false;
  selectValue = [];
  selectValue1 = [];

  //============ Ng Multiselect Dropdown Settings & Veriable Intializer Code  Step 1

  dropdownSettingsApplicationType: {
    singleSelection: boolean; idField: string; textField: string; selectAllText: string;
    unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean;
  };

  dropdownSettingsDPZ: {
    singleSelection: boolean; idField: string; textField: string; selectAllText: string;
    unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean;
  };

  dropdownSettingsThana: {
    singleSelection: boolean; idField: string; textField: string; selectAllText: string;
    unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean;
  };

  dropdownSettingsMouza: {
    singleSelection: boolean; idField: string; textField: string; selectAllText: string;
    unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean;
  };

  dropdownSettingsApplicationStatus: {
    singleSelection: boolean; idField: string; textField: string; selectAllText: string;
    unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean;
  };

  refNo: string;


  //===========================Ng Multiselect dropdownSettings Step 2

  dropdownSettings() {
    this.dropdownSettingsApplicationType = {
      singleSelection: false,
      idField: 'applicationTypeID',
      textField: 'applicationTypeName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.dropdownSettingsDPZ = {
      singleSelection: false,
      idField: 'dpzid',
      textField: 'dpzNameBangla',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.dropdownSettingsThana = {
      singleSelection: false,
      idField: 'thanaID',
      textField: 'thanaNameBangla',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.dropdownSettingsMouza = {
      singleSelection: false,
      idField: 'mouzaID',
      textField: 'mouzaNameBangla',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.dropdownSettingsApplicationStatus = {
      singleSelection: false,
      idField: 'applicationStatusID',
      textField: 'applicationStatusName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }

  //============ Constructor
  constructor(
    private datePipe: DatePipe,
    private applicationFileMasterService: ApplicationFileMasterService,
    private inspectionMonitoringService: InspectionMonitoringService,
    private thanaService: ThanaService,
  ) {
  }

  //============ ngOnInit
  ngOnInit(): void {
    this.getInitialData();
    this.initialSetValue();

    this.refNo = localStorage.getItem(LOCALSTORAGE_KEY.REFERENCE_NO);
    if (this.refNo != null) {
      this.activeQuickSearch = true;
      this.searchObj.refNo = this.refNo;
      this.searchByFileNo();
    }

    this.dropdownSettings();
    this.selectValue = [];
  }

  getListByRefNo() {
    this.applicationFileMasterService.getListByRefNo(this.searchObj.refNo).subscribe(
      (res: ResponseMessage) => {
        if (res) {
          this.selectValue = res.responseObj;
        }
      }
    );
  }

  initialSetValue() {
    this.searchObj.fromDateObj = new Date();
    this.searchObj.toDateObj = new Date();
  }

  getInitialData() {
    this.dropdownSettings();
    this.inspectionMonitoringService.getInitialData().subscribe(
      (res: ResponseMessage) => {
        if (res) {
          this.utils = res.responseObj;

          this.lstApplicationType = JSON.parse(JSON.stringify(this.utils.lstApplicationTypes));
          if (this.lstApplicationType.length === 1) {
            this.dropdownSettingsApplicationType = { ...this.dropdownSettingsApplicationType, singleSelection: true, allowSearchFilter: false };
          }

          this.lstDPZ = this.utils.lstDPZs;
          if (this.lstDPZ.length === 1) {
            this.dropdownSettingsDPZ = { ...this.dropdownSettingsDPZ, singleSelection: true, allowSearchFilter: false };
          }

          this.lstApplicationStatus = this.utils.lstApplicationStatus;
        }
      }
    );
  }

  onCheckFileMaster(data: ApplicationFileMaster) {
    this.lstApplicationFileMaster_checked = this.lstApplicationFileMaster.filter(x => x.isChecked == true);
  }

  onCheckAllFileMaster() {
    if (this.pageModel.isCheckAll) {
      this.lstApplicationFileMaster.forEach(x => {
        x.isChecked = true;
      });

      this.lstApplicationFileMaster_checked = this.lstApplicationFileMaster;
    }
    else {
      this.lstApplicationFileMaster.forEach(x => {
        x.isChecked = false;
      });

      this.lstApplicationFileMaster_checked = [];
    }
  }

  // keyPressMethode(){
  //   this.lstThana.forEach(element => {
  //     this.selectValue1.push(element.thanaName);
  //   });
  // }

  //==============Search by Only File File /Ref no Methode
  searchByFileNo() {
    if (this.searchObj.refNo != null) {
      this.fileOrRefNo = this.searchObj.refNo;
      this.searchObj = new InspectionMonitoringSearch();
      this.searchObj.refNo = this.fileOrRefNo;
      localStorage.setItem(LOCALSTORAGE_KEY.REFERENCE_NO, this.fileOrRefNo);

      this.initialSetValue();
      this.search(true);
    }
  }

  //============== Main Search Methode
  @Output() searchData = new EventEmitter<any>();
  search(byFileRef?: boolean) {
    // reset refNo
    if (!byFileRef) this.searchObj.refNo = '';

    this.searchObj.fromDate = this.datePipe.transform(this.searchObj.fromDateObj, "yyyy-MM-dd");
    this.searchObj.toDate = this.datePipe.transform(this.searchObj.toDateObj, "yyyy-MM-dd");

    this.searchData.emit(this.searchObj);
  }

  attachmentTabLink(id: number) {
    if (id) {
      this.lstAttachmentSingleType = this.lstAttachmentAllType.filter(x => x.attachementTypeID == id);
    }

    if (id == 2 || id == 4) {
      this.lstAttachmentSingleType.forEach(element => {
        this.lightboxAlbums.push(element.attachmentLink);
      });

      console.log('this.lightboxAlbums', this.lightboxAlbums)
    }
  }

  openLightbox(index: number, data): void {
    window.open(data.attachmentLink, '_blank').focus();
    // alert(index);

    // open lightbox
    // this.lightbox.open(this.lightboxAlbums, index, { wrapAround: true, showImageNumberLabel: true });
  }

  //===========================Ng Multiselect============================
  //------------------------ Department(Start)------------------------------

  onSelectDepartment(items: any) {

  }

  onSelectAllDepartment(items: Department[]) {
    this.searchObj.departments = items;
  }

  //------------------------ Department(end)------------------------------

  //------------------------ Application Type(Start)------------------------------
  onSelectApplicationType(items: any) {

  }

  onSelectAllApplicationType(items: any) {
    this.searchObj.applicationTypes = items;
  }

  //------------------------ Application Type(End)------------------------------
  //------------------------ DPZ (Start)------------------------------

  onSelectDPZ(items: any) {
    this.filterThana();
    if (items.length == 0) {
      this.searchObj.thanas = [];
      this.searchObj.mouzas = [];
    }
  }

  onSelectAllDPZ(items: any) {
    this.searchObj.dPZs = items;
    this.filterThana();
    if (items.length == 0) {
      this.searchObj.thanas = [];
      this.searchObj.mouzas = [];
    }
  }

  filterThana() {
    this.searchObj.thanas = [];
    this.searchObj.mouzas = [];
    this.lstThana = [];
    if (this.searchObj.dPZs && this.searchObj.dPZs.length > 0) {
      this.thanaService.getListByDPZ(this.searchObj.dPZs).subscribe(
        (res: Thana[]) => {
          if (res) {
            this.lstThana = res;
            if (this.lstThana.length === 1) {
              this.dropdownSettingsThana = { ...this.dropdownSettingsThana, singleSelection: true, allowSearchFilter: false }
            }
          }
        }
      );
    }
  }

  //------------------------ DPZ (Start)------------------------------
  //------------------------ Thana (Start)------------------------------
  onSelectThana(items: any) {
    this.filterMouza();
  }

  onSelectAllThana(items: any) {
    this.searchObj.thanas = items;
    this.filterMouza();
  }

  filterMouza() {
    this.lstMouza = [];
    if (this.searchObj.dPZs.length > 0 && this.searchObj.thanas.length > 0 && this.utils.lstMouzas.length > 0) {
      let dpzIDs = this.searchObj.dPZs.map(x => { return x.dpzid; });
      let thanaIDs = this.searchObj.thanas.map(x => { return x.thanaID; });

      this.lstMouza = this.utils.lstMouzas.filter(x => dpzIDs.includes(x.dpzid) && thanaIDs.includes(x.thanaID));
      if (this.lstMouza.length === 1) {
        this.dropdownSettingsMouza = { ...this.dropdownSettingsMouza, singleSelection: true, allowSearchFilter: false }
      }
    }
  }

  //------------------------ Thana (End)------------------------------
  //------------------------ Mouzas (Start)------------------------------
  onSelectMouza(items: any) {

  }

  onSelectAllMouza(items: any) {
    this.searchObj.mouzas = items;
  }

  //------------------------ Mouzas (End)------------------------------
  //------------------------ User (Start)------------------------------

  onSelectUser(items: any) {

  }

  onSelectAllUser(items: Users[]) {
    this.searchObj.users = items;
  }

  //------------------------ User (Start)------------------------------
  //------------------------ Application Status (Start)------------------------------

  onSelectApplicationStatus(items: any) {
  }

  onSelectAllApplicationStatus(items: any) {
    this.searchObj.applicationStatus = items;
  }

  //------------------------ Application Status (End)------------------------------
}
