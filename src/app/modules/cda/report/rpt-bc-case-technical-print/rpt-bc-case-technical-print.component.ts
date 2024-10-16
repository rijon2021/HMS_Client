import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { AttachmentType } from 'src/app/core/enums/globalEnum';
import { TextFilterService } from 'src/app/core/helpers/text-filter.service';
import { ApplicationFileMaster } from 'src/app/core/models/cda/applicationFileMaster';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { ResponseMessage } from 'src/app/core/models/responseMessage';
import { ApplicationFileMasterService } from 'src/app/core/services/cda/application-file-master.service';
import { AttachmentsService } from 'src/app/core/services/cda/attachments.service';
import * as html2pdf from "html2pdf.js"
import { InspectionDetailsBCSPCase } from 'src/app/core/models/cda/inspectionDetailsBCSPCase';


@Component({
  selector: 'app-rpt-bc-case-technical-print',
  templateUrl: './rpt-bc-case-technical-print.component.html',
  styleUrls: ['./rpt-bc-case-technical-print.component.css']
})
export class RptBcCaseTechnicalPrintComponent implements OnInit {
  @ViewChild("modalBIReport") modalBIReport: TemplateRef<any>;
  @Input() fileID;

  objFileMasterWithDetails: ApplicationFileMaster = new ApplicationFileMaster();
  objInspectionDetails: InspectionDetailsBCSPCase = new InspectionDetailsBCSPCase();
  
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

  lstAttachmentAllType: any;

  constructor(
    private applicationFileMasterService: ApplicationFileMasterService,
    private modalService: NgbModal,
    public textFilter: TextFilterService,
    private attachmentsService: AttachmentsService,
  ) { }

  ngOnInit() {
    this.pageModel = new PageModel();
    this.objFileMasterWithDetails.inspectionDetailsTechnical = new InspectionDetailsBCSPCase();

    let fileMasterID = this.fileID;
    if (fileMasterID && fileMasterID > 0) {
      this.getByIDWithDetails(fileMasterID);
      this.getAttachmentListByFileID(fileMasterID);
    }
  }

  getAttachmentListByFileID(fileMasterID: number) {
    if (fileMasterID) {
      this.attachmentsService.getAttachmentListByFileID(fileMasterID).subscribe(
        (res: ResponseMessage) => {
          if (res) {
            this.lstAttachmentAllType = res.responseObj;

            this.lstAttachmentAllType.forEach(singleAttachment => {
              if (singleAttachment.attachementTypeID == AttachmentType.Image) {
                singleAttachment.attachmentTypeName = "ছবি";
              } else if (singleAttachment.attachementTypeID == AttachmentType.Audio) {
                singleAttachment.attachmentTypeName = "অডিও";
              } else if (singleAttachment.attachementTypeID == AttachmentType.File) {
                singleAttachment.attachmentTypeName = "ডকুমেন্ট";
              } else if (singleAttachment.attachementTypeID == AttachmentType.Video) {
                singleAttachment.attachmentTypeName = "ভিডিও";
              } else if (singleAttachment.attachementTypeID == AttachmentType.Map) {
                singleAttachment.attachmentTypeName = "বার্ড আই ভিউ";
              }
            });
          }
        }
      );
    }
  }

  exportPDF(data) {
    var element = document.getElementById(data);
    var opt = {
      margin: 0.4,
      filename: 'Attachment' + '.pdf',
      image: { type: 'jpeg, png, jpg', quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
  }

  getByIDWithDetails(fileMasterID: number) {
    this.applicationFileMasterService.getByIDWithDetails(fileMasterID).subscribe(
      (res) => {
        if (res) {
          this.objFileMasterWithDetails = Object.assign(this.objFileMasterWithDetails, res);
          this.objInspectionDetails = this.objFileMasterWithDetails.inspectionDetailsBCSPCase;
          if (this.objFileMasterWithDetails != null && this.objFileMasterWithDetails.inspectionDetailsTechnical != null) {
            this.objFileMasterWithDetails.inspectionDetailsTechnical.investigationOfficerSignature =
              "data:image/png;base64," + this.objFileMasterWithDetails.inspectionDetailsTechnical.investigationOfficerSignature;
            this.objFileMasterWithDetails.inspectionDetailsTechnical.deptHeadSignature =
              "data:image/png;base64," + this.objFileMasterWithDetails.inspectionDetailsTechnical.deptHeadSignature;
          }
        }
      }
    );
  }

  printReport() {
    this.modalService.open(this.modalBIReport, { size: 'xl', backdrop: 'static' });
  }

  modalClose() {
    this.modalService.dismissAll(this.modalBIReport);
  }

  editDesignation() {
    this.modalService.open(this.modalBIReport, { size: 'md' });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    let nodes = this.gridApi.getRenderedNodes();
    if (nodes.length) {
      nodes[0].setSelected(true); //selects the first row in the rendered view
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
    isVisible: true, field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left',
    suppressMovable: true, valueGetter: "node.rowIndex + 1", resizable: false, width: 80
  } as ColDef,
  { isVisible: true, field: "refNo", headerName: 'File Number', pinned: 'left', resizable: true } as ColDef,
  { isVisible: true, field: "applicantName", headerName: 'Applicant Name', pinned: 'left' } as ColDef,
  { isVisible: true, field: "investigationOfficerName", headerName: 'Investigation Officer' } as ColDef,
  { isVisible: true, field: "tR_InvestigationOfficerName", headerName: 'Technical Officer' } as ColDef,
  { isVisible: true, field: "applicationStatusName", headerName: 'Status', width: 120 } as ColDef,
  { isVisible: true, field: "applicationTypeName", headerName: 'Type', width: 120 } as ColDef,
  { isVisible: true, field: "approvalDateSt", headerName: 'Approval Date', width: 150 } as ColDef,
  { isVisible: true, field: "rsNo", headerName: 'RS No' } as ColDef,
  { isVisible: true, field: "bsNo", headerName: 'BS No' } as ColDef,
  { isVisible: true, field: "thanaName", headerName: 'Thana Name' } as ColDef,
  { isVisible: true, field: "mouzaName", headerName: 'Mouza Name' } as ColDef,
  { isVisible: true, field: "road", headerName: 'Road' } as ColDef,
];
