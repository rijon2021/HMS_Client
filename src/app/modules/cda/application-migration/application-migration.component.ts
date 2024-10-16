import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { ApplicationMigration } from 'src/app/core/models/cda/applicationMigration';
import { Attachment } from 'src/app/core/models/common/attachment';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { ResponseMessage } from 'src/app/core/models/responseMessage';
import { Mouza } from 'src/app/core/models/settings/mouza';
import { Thana } from 'src/app/core/models/settings/thana';
import { ApplicationMigrationService } from 'src/app/core/services/cda/application-migration.service';
import { CheckboxRendererComponent } from '../../renderer/checkbox-renderer/checkbox-renderer.component';
import { ApplicationFileMasterService } from 'src/app/core/services/cda/application-file-master.service';
import { ApplicationType, ReturnStatus } from 'src/app/core/enums/globalEnum';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-application-migration',
  templateUrl: './application-migration.component.html',
  styleUrls: ['./application-migration.component.scss']
})
export class ApplicationMigrationComponent implements OnInit {

  @ViewChild("modalApplicationMigration") modalApplicationMigration: TemplateRef<any>;

  lstApplicationMigration: ApplicationMigration[] = new Array<ApplicationMigration>();
  selectedApplicationMigration: ApplicationMigration = new ApplicationMigration();
  public pageModel: PageModel = new PageModel();
  responsData: any;
  frameworkComponents: any;

  lstThana: Thana[] = new Array<Thana>();
  lstMouza: Mouza[] = new Array<Mouza>();
  lstMouza_all: Mouza[] = new Array<Mouza>();
  lstApplicationType: ApplicationType[] = new Array<ApplicationType>();

  private gridApi;
  columnDefs = dataColumnDefs;
  gridOptions: GridOptions = {
    pagination: true,
    rowSelection: 'multiple',
    suppressDragLeaveHidesColumns: true,
    suppressPropertyNamesCheck: true,
    suppressRowDrag: false,
    rowDragManaged: true,
    getRowHeight: () => 40,
    defaultColDef: dataDefaultColDef,
  }
  lastupdateInfo: any;
  totalMigrate: any = 0;
  totalNotMigrate: any = 0;
  totalPendingForMigrate: any;

  objDataAttachment: Attachment;
  selectedFile: any;
  profileImagePath: any;
  fileURL: string | ArrayBuffer;

  constructor(
    private applicationMigrationService: ApplicationMigrationService,
    private applicationFileMasterService: ApplicationFileMasterService,
    private swal: SweetAlertService,
    private modalService: NgbModal
  ) {
    this.frameworkComponents = {
      checkboxRenderer: CheckboxRendererComponent
    };

    this.checkedHandler = this.checkedHandler.bind(this);
  }

  ngOnInit() {
    this.selectedApplicationMigration.applicationTypeID = 0;
    // this.selectedApplicationMigration.isActive = true;
    this.pageModel.type = 0;
    this.getInitialData();
    this.getAll();

    this.pageModel.IsMigrated=2
    this.pageModel.applicationTypeID=3;
    this.getFileListByApplicationType();
    this.getAllCDABCCaseFileListByApplicationTypeID() ;
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
    });

    gridOption.api.redrawRows();
  }

  getInitialData() {
    let orgID = parseInt(localStorage.getItem("ORGANIZATION_ID"));
    this.applicationMigrationService.getInitialData(orgID).subscribe(
      (res: ResponseMessage) => {
        if (res) {
          this.responsData = res.responseObj;
          this.lstThana = this.responsData.lstThana;
          this.lstMouza_all = this.responsData.lstMouza;
          this.lstApplicationType = this.responsData.lstApplicationType;
        }
      }
    );
  }

  getAll() {
    this.applicationMigrationService.getAll(this.pageModel.type).subscribe(
      (res) => {
        if (res) {
          let data: ApplicationMigration[] = new Array<ApplicationMigration>();
          data = Object.assign(data, res);
          this.lstApplicationMigration = [...data];
          this.lstApplicationMigration.forEach(file => {
            // prepare approval date for UI
            if (file.approvalDate.length >= 10) {
              file.approvalDate = file.approvalDate.slice(0, 10);
            }
          });

          this.gridOptions.api.redrawRows();
          this.showHideCheckbox();
        }
      }
    );
  }


  getFileListByApplicationType() {
    this.applicationFileMasterService.getFileListByApplicationType(this.pageModel).subscribe(
      (res: ResponseMessage) => {
        if (res) {
          let data: ApplicationMigration[] = new Array<ApplicationMigration>();
          data = Object.assign(data, res.responseObj);
          this.lstApplicationMigration = [...data];
          this.gridOptions.api.redrawRows();
          this.showHideCheckbox();
        }
      }
    );
  }

  getFileDetailsListByApplicationType() 
  {
  
if( this.pageModel.applicationTypeID==1)
{
  this.applicationFileMasterService.getAllCDABCCaseFileDetailsList(this.pageModel).subscribe(
    (res: ResponseMessage) => {
      if (res) {
        let data: ApplicationMigration[] = new Array<ApplicationMigration>();
        data = Object.assign(data, res.responseObj);
        this.lstApplicationMigration = [...data];
        this.gridOptions.api.redrawRows();
        this.showHideCheckbox();
      }
    }
  );
}
if( this.pageModel.applicationTypeID==2)
{

}
if( this.pageModel.applicationTypeID==3)
{
  this.applicationFileMasterService.getFileDetailsListByApplicationType(this.pageModel).subscribe(
    (res: ResponseMessage) => {
      if (res) {
        let data: ApplicationMigration[] = new Array<ApplicationMigration>();
        data = Object.assign(data, res.responseObj);
        this.lstApplicationMigration = [...data];
        this.gridOptions.api.redrawRows();
        this.showHideCheckbox();
      }
    }
  );
}

  }
  getAllCDABCCaseFileListByApplicationTypeID() {
    debugger;
    this.lastupdateInfo='';
    let applicationTypeID: number = 0;
    applicationTypeID = this.selectedApplicationMigration.applicationTypeID;
    this.pageModel.applicationTypeID = applicationTypeID;
    
    if (applicationTypeID.toString() === '1') {
      this.applicationFileMasterService.getAllCDABCCaseFileListByApplicationTypeID(this.pageModel).subscribe(
        (res: ResponseMessage) => {
          if (res) {
            var data: ApplicationMigration[] = new Array<ApplicationMigration>();
            debugger;
            //data = Object.assign(data, res.responseObj);
            data = res.responseObj;
            debugger;
            this.lastupdateInfo = data[0].updateDate.replace('T', ' ');
            this.totalMigrate = data.filter(x => x.isMigrated == 1).length;
            this.totalNotMigrate = data.filter(x => x.isMigrated == 2).length;
         

          }
        }
      );
    }
    
    if (applicationTypeID.toString() === '3') {
      this.applicationFileMasterService.getLUCFileDetailsByApplicationTypeID(this.pageModel).subscribe(
        (res: ResponseMessage) => {
          if (res) {
            var data: ApplicationMigration[] = new Array<ApplicationMigration>();
            debugger;
            //data = Object.assign(data, res.responseObj);
            data = res.responseObj;
          
            this.lastupdateInfo = data[0].updateDate.replace('T', ' ');
            this.totalMigrate = data.filter(x => x.isMigrated == 1).length;
            this.totalNotMigrate = data.filter(x => x.isMigrated == 2).length;
          

          }
        }
      );
    }

  }
  
  showHideCheckbox() {
    if (parseInt(this.pageModel.type.toString()) != 0) {
      this.gridOptions.columnApi?.setColumnVisible("isChecked", false);
    } else {
      this.gridOptions.columnApi?.setColumnVisible("isChecked", true);
    }
  }

  modalClose() {
    this.modalService.dismissAll(this.modalApplicationMigration);
  }

  onEdit() {
    debugger;
    if (this.selectedApplicationMigration.thanaID > 0) {
      this.onChangeThana();
    }

    this.modalService.open(this.modalApplicationMigration, { size: 'lg' });
  }

  async process() {
    debugger;
    let data = this.gridApi.getSelectedRows();
    if (data && data.length > 0) {
      if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) 
      {
        this.applicationFileMasterService.migrateData(data).subscribe(
          (res: ResponseMessage) => {
            if (res.statusCode == ReturnStatus.Success) {
              this.swal.message("Data Saved", SweetAlertEnum.success);
             // this.pageModel.type = 0;
              this.pageModel.IsMigrated=this.pageModel.IsMigrated;
              this.pageModel.applicationTypeID=this.selectedApplicationMigration.applicationTypeID;
           
               this.getFileDetailsListByApplicationType();
           
            }
            else {
              this.swal.message(res.message, SweetAlertEnum.error)
            }
          },
          (error) => {
            this.swal.message(error, SweetAlertEnum.error);
          }
        );
      }
    }
    else {
      this.swal.message("No data selected", SweetAlertEnum.error);
    }
  }

  async DataMigrationProcess() {
 
    //let data = this.gridApi.getSelectedRows();
     this.selectedApplicationMigration.applicationType=this.selectedApplicationMigration.applicationTypeID;
     this.selectedApplicationMigration.applicationTypeID=this.selectedApplicationMigration.applicationTypeID;
    if (this.selectedApplicationMigration !=null) {
      if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
        this.applicationFileMasterService.migrateProcessData(this.selectedApplicationMigration).subscribe(
          (res: ResponseMessage) => {
            if (res.statusCode == ReturnStatus.Success) {
              this.swal.message("Data Saved", SweetAlertEnum.success);
             this.pageModel.IsMigrated=2;
             this.pageModel.applicationTypeID=this.selectedApplicationMigration.applicationTypeID;
          
              this.getFileDetailsListByApplicationType();
            }
            else {
              this.swal.message(res.message, SweetAlertEnum.error)
            }
          },
          (error) => {
            this.swal.message(error, SweetAlertEnum.error);
          }
        );
      }
    }
    else {
      this.swal.message("No data selected", SweetAlertEnum.error);
    }
  }

  async update() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.applicationMigrationService.update(this.selectedApplicationMigration).subscribe(
        (res: ApplicationMigration) => {
          if (res && res.applicationMigrationID > 0) {
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
      this.applicationMigrationService.delete(this.selectedApplicationMigration.applicationMigrationID).subscribe(
        (res: ApplicationMigration) => {
          if (res && res.applicationMigrationID > 0) {
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

  async uploadFile() {
    debugger;
    if (this.selectedApplicationMigration.applicationTypeID == 0) {
      this.swal.message('Please select file type', SweetAlertEnum.error);
      return;
    }

    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.objDataAttachment = new Attachment();
      this.objDataAttachment.attachmentName = 'Application_Migration';
      this.objDataAttachment.fileContent = this.fileURL.toString();
      this.objDataAttachment.referenceID = 0;
      this.objDataAttachment.attachementTypeID = 5;   // excel is a file type attachment
      this.objDataAttachment.applicationTypeID = this.selectedApplicationMigration.applicationTypeID;
      this.objDataAttachment.updatedBy = parseInt(localStorage.getItem('userAutoID'));
debugger;
      this.applicationMigrationService.excelUpload(this.objDataAttachment).subscribe(
        (res: ResponseMessage) => {
          if (res.statusCode == 1) {
            this.getAll();

            if (res.responseObj) {
              let msg = '';
              if (res.responseObj.migratedRefs && res.responseObj.migratedRefs.length > 0) {
                msg = `The following files have been uploaded successfully:\n ${res.responseObj.migratedRefs.join(', ')}\n`
              }

              if (res.responseObj.unMigratableRefs && res.responseObj.unMigratableRefs.length > 0) {
                msg = `${msg}\nThe following files are not uploaded due to duplicate refs: ${res.responseObj.unMigratableRefs.join(', ')}\n`
              }

              if (msg) {
                this.swal.message(msg, SweetAlertEnum.info);
              }
            }
          }
          else {
            this.swal.message(res.message, SweetAlertEnum.error);
          }
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
      this.selectedApplicationMigration = selectedRows[0];
    }
    else {
      this.selectedApplicationMigration = new ApplicationMigration();
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

  onChangeThana() {
    this.lstMouza = [];
    if (this.selectedApplicationMigration.thanaID > 0) {
      this.lstMouza = this.lstMouza_all.filter(x => x.thanaID == this.selectedApplicationMigration.thanaID);
    }
  }
}

const dataDefaultColDef: ColDef = {
  // flex: 1,
  // width: 300,
  resizable: true,
  sortable: true,
  suppressMovable: false,
  filter: true,
  cellClass: 'suppress-movable-col',
  // floatingFilter: true,
};

const dataColumnDefs = [
  {
    isVisible: true, field: "isChecked", cellRenderer: "checkboxRenderer", headerCheckboxSelection: true,
    checkboxSelection: true, width: 50, lockPosition: true, pinned: 'left', suppressMovable: true,
  } as ColDef,
  {
    isVisible: true, field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left',
    suppressMovable: true, valueGetter: "node.rowIndex + 1", resizable: false, width: 80
  } as ColDef,
  { isVisible: true, field: "case_no", headerName: 'File Number' } as ColDef,
  { isVisible: true, field: "applicant_name", headerName: 'Applicant Name' } as ColDef,
  
  { isVisible: true, field: "applicant_father", headerName: 'Father Name' } as ColDef,
  { isVisible: true, field: "bs_no", headerName: 'BS No' } as ColDef,
  { isVisible: true, field: "rs_no", headerName: 'RS No' } as ColDef,
  { isVisible: true, field: "dap_zoing", headerName: 'DAP ZONING' } as ColDef,
  { isVisible: true, field: "case_id", headerName: 'Case ID' } as ColDef,
  { isVisible: true, field: "occupancy_use", headerName: 'Occupancy Use' } as ColDef,
  { isVisible: true, field: "other_desc", headerName: 'Other Desc' } as ColDef,
  {
    isVisible: true, field: "createDate", headerName: 'Last update', headerClass: 'ag-header-cell-label-center-keep-menu',
    cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
    valueFormatter: params => params.value ? formatDate(params.value, 'dd-MMM-yyyy', 'en-US') : '-'
  } as ColDef
];
