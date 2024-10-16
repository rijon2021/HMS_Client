import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { ApplicationType, InspectionFileType } from 'src/app/core/enums/globalEnum';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { ApplicationFileMaster } from 'src/app/core/models/cda/applicationFileMaster';
import { BcCaseBIReport } from 'src/app/core/models/cda/bcCaseBIReport';
import { LUC } from 'src/app/core/models/cda/luc';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';
import { ApplicationFileMasterService } from 'src/app/core/services/cda/application-file-master.service';


@Component({
  selector: 'app-luc-list',
  templateUrl: './luc-list.component.html',
  styleUrls: ['./luc-list.component.css']
})
export class LucListComponent implements OnInit {

  @ViewChild("modalLucAtp") modalLucAtp: TemplateRef<any>;
  @ViewChild("modalLucDraftman") modalLucDraftman: TemplateRef<any>;
  @ViewChild("modalLucGIS") modalLucGIS: TemplateRef<any>;

  objFileMasterWithDetails: ApplicationFileMaster = new ApplicationFileMaster();
  objLUC: LUC = new LUC();

  fileMasterID: number;
  userRoleID: number;
  showEdit: boolean;
  pageTitle: string = "LUC ";
  reportName: string;
  selectedFile: BcCaseBIReport = new BcCaseBIReport();
  lstApplicationFileMaster: BcCaseBIReport[] = new Array<BcCaseBIReport>();
  pageModel: PageModel;

  lstAttachmentAllType: any;

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


  constructor(
    private applicationFileMasterService: ApplicationFileMasterService,
    private router: Router,
    private modalService: NgbModal
  ) { }


  ngOnInit() {
    this.userRoleID = Number(localStorage.getItem(LOCALSTORAGE_KEY.ROLE_ID));
    this.pageModel = new PageModel();
    this.getAll();

    if (this.router.url.indexOf('/rpt') === -1) {
      this.showEdit = true;
    } else {
      this.pageTitle += " Report";
    }
  }

  getAll() {
    this.applicationFileMasterService.getListByType(ApplicationType.LUC, InspectionFileType.Inspection, true).subscribe(
      (res) => {
        if (res) {
          let data = Object.assign(this.lstApplicationFileMaster, res);
          this.lstApplicationFileMaster = [...data];
          this.gridOptions.api.redrawRows();
        }
      }
    );
  }

  //===================== LUC Print 
  //===================== প্রিন্ট পেজ মডাল এ ভিউ কোড


  printModalLucAtp() {

    if (this.selectedFile.applicationFileMasterID > 0) {
      if ((this.router.url == '/cda/luc-atp-list') || (this.router.url == '/cda/rpt-luc-atp')) {
        this.modalService.open(this.modalLucAtp, { size: 'xl' });

      } else if ((this.router.url == '/cda/luc-dm-list') || (this.router.url == '/cda/rpt-luc-dm')) {
        this.modalService.open(this.modalLucDraftman, { size: 'xl' });

      } else if ((this.router.url == '/cda/luc-gis-list') || (this.router.url == '/cda/rpt-luc-gis')) {
        this.modalService.open(this.modalLucGIS, { size: 'xl' });
      }
    }
  }

  modalCloseLucAtp() {
    this.modalService.dismissAll(this.modalLucAtp);
  }

  modalCloseLucDraftman() {
    this.modalService.dismissAll(this.modalLucDraftman);
  }

  modalCloseLucGIS() {
    this.modalService.dismissAll(this.modalLucGIS);
  }

  onEdit() {
    if (this.selectedFile.applicationFileMasterID > 0) {
      if (this.router.url == '/cda/luc-atp-list') {
        RoutingHelper.navigate2([], ['cda', 'luc-atp', this.selectedFile.applicationFileMasterID], this.router);
      } else if (this.router.url == '/cda/luc-dm-list') {
        RoutingHelper.navigate2([], ['cda', 'luc-dm', this.selectedFile.applicationFileMasterID], this.router);
      } else if (this.router.url == '/cda/luc-gis-list') {
        RoutingHelper.navigate2([], ['cda', 'luc-gis', this.selectedFile.applicationFileMasterID], this.router);
      }
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
      this.selectedFile = selectedRows[0];
      this.fileMasterID = this.selectedFile.applicationFileMasterID;
    }
    else {
      this.selectedFile = new BcCaseBIReport();
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
  { isVisible: true, field: "refNo", headerName: 'File Number', pinned: 'left', resizable: true, width: 250 } as ColDef,
  { isVisible: true, field: "applicantName", headerName: 'Applicant Name', pinned: 'left', width: 300 } as ColDef,
  { isVisible: true, field: "investigationOfficerName", headerName: 'Investigation Officer' } as ColDef,
  { isVisible: true, field: "applicationStatusName", headerName: 'Status', width: 120 } as ColDef,
  // { isVisible: true, field: "applicationTypeName", headerName: 'Type', width: 120 } as ColDef,
  { isVisible: true, field: "approvalDateSt", headerName: 'Approval Date', width: 150 } as ColDef,
  { isVisible: true, field: "rsNo", headerName: 'RS No' } as ColDef,
  { isVisible: true, field: "bsNo", headerName: 'BS No' } as ColDef,
  { isVisible: true, field: "thanaName", headerName: 'Thana Name' } as ColDef,
  { isVisible: true, field: "mouzaName", headerName: 'Mouza Name' } as ColDef,
  { isVisible: true, field: "road", headerName: 'Road' } as ColDef,
];
