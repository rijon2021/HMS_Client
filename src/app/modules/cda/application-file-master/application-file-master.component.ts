import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { Attachment } from 'src/app/core/models/common/attachment';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { ResponseMessage } from 'src/app/core/models/responseMessage';
import { Mouza } from 'src/app/core/models/settings/mouza';
import { Thana } from 'src/app/core/models/settings/thana';
import { CheckboxRendererComponent } from '../../renderer/checkbox-renderer/checkbox-renderer.component';
import { ApplicationFileMasterService } from 'src/app/core/services/cda/application-file-master.service';
import { ApplicationFileMaster } from 'src/app/core/models/cda/applicationFileMaster';
import { Users } from 'src/app/core/models/settings/users';
import { ApplicationFileUserMap } from 'src/app/core/models/cda/applicationFileUserMap';
import { ApplicationFileUserMapService } from 'src/app/core/services/cda/application-file-user-map.service';
import { ApplicationType, InspectionFileType, InspectionRoleType, ReturnStatus } from 'src/app/core/enums/globalEnum';
import { formatDate } from '@angular/common';
import { UserDPZMap } from 'src/app/core/models/settings/userDpzMap';


@Component({
  selector: 'app-application-file-master',
  templateUrl: './application-file-master.component.html',
  styleUrls: ['./application-file-master.component.scss']
})
export class ApplicationFileMasterComponent implements OnInit {
  @ViewChild("modalApplicationFileMaster") modalApplicationFileMaster: TemplateRef<any>;
  @ViewChild("modalUserAssign") modalUserAssign: TemplateRef<any>;

  lstApplicationFileMaster: ApplicationFileMaster[] = new Array<ApplicationFileMaster>();
  lstApplicationFileMasterAll: ApplicationFileMaster[] = new Array<ApplicationFileMaster>();
  selectedApplicationFileMaster: ApplicationFileMaster = new ApplicationFileMaster();
  selectedApplicationFileUserMap: ApplicationFileUserMap = new ApplicationFileUserMap();
  selectedUser: Users = new Users();
  showTechnicalAssignButton: boolean = false;

  public pageModel: PageModel = new PageModel();

  responsData: any;
  frameworkComponents: any;

  userImage: string;
  lstApplicationType = [];
  lstInspectionRoleType = [];
  lstInspectionFileType = [];

  lstThana: Thana[] = new Array<Thana>();
  lstMouza: Mouza[] = new Array<Mouza>();
  lstMouza_all: Mouza[] = new Array<Mouza>();
  lstUser: Users[] = new Array<Users>();
  lstUserDPZMap: UserDPZMap[] = new Array<UserDPZMap>();
  lstUserByApplicationTypeNDPZ: Users[] = new Array<Users>();

  applicationTypeID: any;
  noRowsTemplate: any;

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
  objDataAttachment: Attachment;
  selectedFile: any;
  profileImagePath: any;
  fileURL: string | ArrayBuffer;


  constructor(
    private applicationFileMasterService: ApplicationFileMasterService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal,
    private applicationFileUserMapService: ApplicationFileUserMapService,
  ) {
    this.frameworkComponents = {
      checkboxRenderer: CheckboxRendererComponent
    };
    this.checkedHandler = this.checkedHandler.bind(this);
    this.noRowsTemplate = '<h4 class="text-danger">No data found</h4>';
  }

  ngOnInit() {
    this.applicationTypeID = 0;
    this.resetModal();
    this.getInitialData();
    this.getAll();
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

  checkAll(dataList, gridOption, isChecked) {
    dataList.forEach(x => {
      x.isChecked = !isChecked;
    })

    gridOption.api.redrawRows();
  }

  goToInspectionDetialsBCCasePage() {
    this.router.navigate(['cda/inspection-details-bcspcase/0']);
  }

  getInitialData() {
    let orgID = parseInt(localStorage.getItem("ORGANIZATION_ID"));
    this.applicationFileMasterService.getInitialData(orgID).subscribe(
      (res: ResponseMessage) => {
        if (res) {
          this.responsData = res.responseObj;
          this.lstThana = this.responsData.lstThana;
          this.lstMouza_all = this.responsData.lstMouza;
          this.lstUser = this.responsData.lstUser;
          this.lstUserDPZMap = this.responsData.lstUserDPZMap;
          this.lstApplicationType = this.responsData.lstApplicationType;
          this.lstInspectionRoleType = this.responsData.lstInspectionRoleType;
          this.lstInspectionFileType = this.responsData.lstInspectionFileType;
        }
      }
    );
  }

  getAll() {
    this.applicationFileMasterService.getAll().subscribe(
      (res) => {
        if (res) {
          let data = Object.assign(this.lstApplicationFileMaster, res);
          this.lstApplicationFileMaster = [...data];
          this.lstApplicationFileMasterAll = [...data];
          this.lstApplicationFileMaster.forEach(file => {
            // prepare approval date for UI
            if (file.approvalDate.length >= 10) {
              file.approvalDate = file.approvalDate.slice(0, 10);
            }
          });

        //  this.lstApplicationFileMasterAll = this.lstApplicationFileMaster;
          this.gridOptions.api.redrawRows();

          this.selectedApplicationFileMaster = new ApplicationFileMaster();
          this.applicationTypeID = 0;
          this.showHideTechnicalData(0 as ApplicationType);
        }
      }
    );
  }

  applicationTypeChange() {
    debugger;
    // reset selected file data
    this.selectedApplicationFileMaster = new ApplicationFileMaster();

  // this.lstApplicationFileMaster = [];
    if (parseInt(this.applicationTypeID) > 0) {
      this.lstApplicationFileMaster = this.lstApplicationFileMasterAll.filter(x => x.applicationType == this.applicationTypeID);
    } else 
    {
      this.lstApplicationFileMaster = this.lstApplicationFileMasterAll;
    }

    this.showHideTechnicalData(parseInt(this.applicationTypeID) as unknown as ApplicationType);
  }

  userChange(event?: Event) {
    let selectedUserID = event ? Number((event.target as HTMLSelectElement).value) : this.selectedApplicationFileUserMap.userID;
    if (selectedUserID > 0) {
      let selectedUser = this.lstUser.find(x => x.userAutoID == selectedUserID);
      if (selectedUser?.userAutoID > 0) {
        this.userImage = selectedUser.userImage ? ("data:image/png;base64," + selectedUser.userImage) : "";
      }
    }
    else this.resetModal();
  }

  userAssignModal(type: InspectionFileType) {
    this.selectedApplicationFileUserMap = new ApplicationFileUserMap({ assignDate: formatDate(Date.now(), 'yyyy-MM-dd', 'en-US') });

    if (this.selectedApplicationFileMaster == null || this.selectedApplicationFileMaster.applicationFileMasterID > 0) {
      this.selectedApplicationFileUserMap.applicationFileMasterID = this.selectedApplicationFileMaster.applicationFileMasterID;
      this.selectedApplicationFileUserMap.inspectionFileType = type;

      this.getAssingedUserListByFileID();
    }
    else {
      this.swal.message('Please select a file', SweetAlertEnum.info);
    }
  }

  getAssingedUserListByFileID() {
    this.userImage = "";
    this.applicationFileUserMapService.getAssingedUserListByFile(this.selectedApplicationFileUserMap).subscribe(
      (res: ResponseMessage) => {
        if (res) {
          let data = JSON.stringify(res);
          this.lstApplicationFileUserMap = JSON.parse(data);
          this.lstApplicationFileUserMap.forEach(fileUserMap => {
            // prepare assign date for UI
            if (fileUserMap.assignDate.length >= 10) {
              fileUserMap.assignDate = fileUserMap.assignDate.slice(0, 10);
            }
          });

          var mapData = this.lstApplicationFileUserMap.find(x => x.inspectionRoleType == InspectionRoleType.OfficerInCharge && x.isActive == true);
          if (mapData != null) {
            this.selectedApplicationFileUserMap = { ...mapData };
            this.userChange();
          }

          this.modalService.open(this.modalUserAssign, { size: 'lg' });
        }
      }
    );
  }

  lstApplicationFileUserMap: ApplicationFileUserMap[] = new Array<ApplicationFileUserMap>();

  onFileMapEdit(oItem: ApplicationFileUserMap) {

    this.selectedApplicationFileUserMap = { ...oItem };
    this.userChange();
  }

  resetModal() {
    this.selectedApplicationFileUserMap.applicationFileUserMapID = 0;
    this.selectedApplicationFileUserMap.userID = 0;
    this.selectedApplicationFileUserMap.assignDate = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US');
    this.selectedApplicationFileUserMap.investigationDate = null;
    this.selectedApplicationFileUserMap.inspectionRoleType = InspectionRoleType.OfficerInCharge;
    this.selectedApplicationFileUserMap.isActive = true;
    this.userImage = '';
  }

  async submitUserAssign() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      if (this.selectedApplicationFileUserMap.applicationFileMasterID > 0 && this.selectedApplicationFileUserMap.userID > 0) {
        if (this.selectedApplicationFileUserMap.applicationFileUserMapID > 0) {
          this.applicationFileUserMapService.update(this.selectedApplicationFileUserMap).subscribe(
            (res: ResponseMessage) => {
              if (res.statusCode == ReturnStatus.Success) {
                let data: ApplicationFileUserMap = res.responseObj;
                if (data.applicationFileUserMapID > 0) {
                  this.swal.message(res.message, SweetAlertEnum.success);
                  this.modalCloseUserAssign();
                  this.getAll();
                }
              }
              else {
                this.swal.message(res.message, SweetAlertEnum.error);
              }
            },
            (error) => {
              this.swal.message(error, SweetAlertEnum.error);
            }
          );
        }
        else {
          this.applicationFileUserMapService.save(this.selectedApplicationFileUserMap).subscribe(
            (res: ResponseMessage) => {
              if (res.statusCode == ReturnStatus.Success) {
                let data: ApplicationFileUserMap = res.responseObj;
                if (data.applicationFileUserMapID > 0) {
                  this.swal.message(res.message, SweetAlertEnum.success);
                  this.modalCloseUserAssign();
                  this.getAll();
                }
              }
              else {
                this.swal.message(res.message, SweetAlertEnum.error);
              }
            },
            (error) => {
              this.swal.message(error, SweetAlertEnum.error);
            }
          );
        }
      }
      else {
        this.swal.message('Please select user & file', SweetAlertEnum.warning);
      }
    }
  }

  modalClose() {
    this.modalService.dismissAll(this.modalApplicationFileMaster);
  }

  modalCloseUserAssign() {
    this.modalService.dismissAll(this.modalUserAssign);
  }

  onEdit() {
    debugger;
    this.modalService.open(this.modalApplicationFileMaster, { size: 'lg' });
  }

  async process(dataList) {
    let data = dataList.filter(x => x.isChecked);
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.applicationFileMasterService.migrateData(data).subscribe(
        (_) => { },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        }
      );
    }
  }

  async update() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.applicationFileMasterService.update(this.selectedApplicationFileMaster).subscribe(
        (res: ApplicationFileMaster) => {
          if (res && res.applicationFileMasterID > 0) {
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

  async onDelete() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.applicationFileMasterService.delete(this.selectedApplicationFileMaster.applicationFileMasterID).subscribe(
        (res: ApplicationFileMaster) => {
          if (res && res.applicationFileMasterID > 0) {
            this.swal.message('Data Delete Successfully', SweetAlertEnum.success);
            this.getAll();
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        }
      );
    }
  }

  onChangeFile(event: any) {
    this.selectedFile = event.target.files;
    const reader = new FileReader();
    this.profileImagePath = this.selectedFile;
    reader.readAsDataURL(this.selectedFile[0]);
    reader.onload = (_event) => {
      this.fileURL = reader.result;
    }
  }

  onChangeThana() {
    this.lstMouza = [];
    if (this.selectedApplicationFileMaster.thanaID > 0) {
      this.lstMouza = this.lstMouza_all.filter(x => x.thanaID == this.selectedApplicationFileMaster.thanaID);
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
    debugger;
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows && selectedRows.length == 1) {
      this.selectedApplicationFileMaster = selectedRows[0];
    }
    else {
      this.selectedApplicationFileMaster = new ApplicationFileMaster();
    }

    this.lstUserByApplicationTypeNDPZ = this.lstUser.filter(
      user =>
        user.applicationTypeID == this.selectedApplicationFileMaster.applicationType &&
        this.lstUserDPZMap.find(map => map.userID === user.userAutoID && map.dpzid === this.selectedApplicationFileMaster.dpzid)
    );

    if (this.selectedApplicationFileMaster) {
      this.onChangeThana();
      this.showHideTechnicalData(this.selectedApplicationFileMaster.applicationType as unknown as ApplicationType);
    }
  }

  showHideTechnicalData(applicationType: ApplicationType) {
    if (applicationType === ApplicationType.BCCase) {
      this.showTechnicalAssignButton = true;
      this.gridOptions.columnApi?.setColumnVisible("tR_InvestigationOfficerName", true);
    } else {
      this.showTechnicalAssignButton = false;
      this.gridOptions.columnApi?.setColumnVisible("tR_InvestigationOfficerName", false);
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
  // { isVisible: true, field: "isChecked", cellRenderer: "checkboxRenderer", width: 50, lockPosition: true, pinned: 'left', suppressMovable: true, },
  {
    isVisible: true, field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left',
    suppressMovable: true, valueGetter: "node.rowIndex + 1", resizable: false, width: 80
  } as ColDef,
  { isVisible: true, field: "refNo", headerName: 'File Number', pinned: 'left', resizable: true } as ColDef,
  { isVisible: true, field: "applicantName", headerName: 'Applicant Name', pinned: 'left' } as ColDef,
  { isVisible: true, field: "dpzNameBangla", headerName: 'DPZ Name' } as ColDef,
  { isVisible: true, field: "investigationOfficerName", headerName: 'Investigation Officer' } as ColDef,
  { isVisible: true, field: "tR_InvestigationOfficerName", headerName: 'Technical Officer' } as ColDef,
  { isVisible: true, field: "applicationStatusName", headerName: 'Status', width: 120 } as ColDef,
  { isVisible: true, field: "applicationTypeName", headerName: 'Type', width: 120 } as ColDef,
  { isVisible: true, field: "approvalDateSt", headerName: 'Approval Date', width: 150 } as ColDef,
  { isVisible: true, field: "rsNo", headerName: 'RS No' } as ColDef,
  { isVisible: true, field: "bsNo", headerName: 'BS No' } as ColDef,
  { isVisible: true, field: "thanaNameBangla", headerName: 'Thana Name' } as ColDef,
  { isVisible: true, field: "mouzaNameBangla", headerName: 'Mouza Name' } as ColDef,
  { isVisible: true, field: "road", headerName: 'Road' } as ColDef,
  {
    isVisible: true, field: "createdDate", headerName: 'Created On', headerClass: 'ag-header-cell-label-center-keep-menu',
    cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
    valueFormatter: params => params.value ? formatDate(params.value, 'dd-MMM-yyyy', 'en-US') : '-'
  } as ColDef
];
