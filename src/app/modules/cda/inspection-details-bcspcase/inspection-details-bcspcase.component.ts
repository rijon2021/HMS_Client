import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AttachmentType } from 'src/app/core/enums/globalEnum';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { ApplicationFileMaster } from 'src/app/core/models/cda/applicationFileMaster';
import { BcCaseBIReport } from 'src/app/core/models/cda/bcCaseBIReport';
import { InspectionDetailsBCSPCase } from 'src/app/core/models/cda/inspectionDetailsBCSPCase';
import { Organization } from 'src/app/core/models/data/organization';
import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';
import { ResponseMessage } from 'src/app/core/models/responseMessage';
import { Department } from 'src/app/core/models/settings/department';
import { DepartmentDesginationMap } from 'src/app/core/models/settings/departmentDesginationMap';
import { Designation } from 'src/app/core/models/settings/designation';
import { UserRole } from 'src/app/core/models/settings/userRole';
import { ApplicationFileMasterService } from 'src/app/core/services/cda/application-file-master.service';
import { AttachmentsService } from 'src/app/core/services/cda/attachments.service';
import { InspectionDetailsBCspcaseService } from 'src/app/core/services/cda/inspection-details-bcspcase.service';
import { UserService } from 'src/app/core/services/settings/user.service';


@Component({
  selector: 'app-inspection-details-bcspcase',
  templateUrl: './inspection-details-bcspcase.component.html',
  styleUrls: ['./inspection-details-bcspcase.component.scss']
})
export class InspectionDetailsBCSPCaseComponent implements OnInit, OnDestroy {
  public imageURL: string;
  objFileMasterWithDetails: ApplicationFileMaster = new ApplicationFileMaster();
  objInspectionDetails: InspectionDetailsBCSPCase = new InspectionDetailsBCSPCase();
  lstApplicationFileMaster: BcCaseBIReport[] = new Array<BcCaseBIReport>();
  lstOrganization: Organization[] = new Array<Organization>();
  lstUserRole: UserRole[] = new Array<UserRole>();
  lstDesignation: Designation[] = new Array<Designation>();
  lstDeptDesignation: DepartmentDesginationMap[] = new Array<DepartmentDesginationMap>();
  lstDepartment: Department[] = new Array<Department>();
  imageFile: File = null;
  activateUpdate: boolean = false;

  organizationID: number;
  userRoleID: number;
  lstAttachmentAllType: any;
  fileMasterID: number;
  private routeSub: Subscription;


  constructor(
    public userService: UserService,
    private applicationFileMasterService: ApplicationFileMasterService,
    private inspectionDetailsBCspcaseService: InspectionDetailsBCspcaseService,
    private attachmentsService: AttachmentsService,
    private route: ActivatedRoute,
    private swal: SweetAlertService) { }

  ngOnInit() {
    this.organizationID = Number(localStorage.getItem(LOCALSTORAGE_KEY.ORGANIZATION_ID));
    this.userRoleID = Number(localStorage.getItem(LOCALSTORAGE_KEY.ROLE_ID));

    this.routeSub = this.route.params.subscribe(params => {
      const fileID = parseInt(params['applicationFileMasterID']);
      if (fileID) {
        this.fileMasterID = fileID;
      }
    });

    this.getByIDWithDetails(this.fileMasterID);
    this.getAttachmentListByFileID(this.fileMasterID);
  }

  getAttachmentListByFileID(fileMasterID: number) {
    if (fileMasterID) {
      this.attachmentsService.getAttachmentListByFileID(fileMasterID).subscribe((res: ResponseMessage) => {
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
      });
    }
  }

  getByIDWithDetails(fileMasterID: number) {
    this.applicationFileMasterService.getByIDWithDetails(fileMasterID).subscribe(
      (res) => {
        if (res) {
          this.objFileMasterWithDetails = Object.assign(this.objFileMasterWithDetails, res);
          this.objInspectionDetails = this.objFileMasterWithDetails.inspectionDetailsBCSPCase;
        }
      }
    );
  }

  async update() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.inspectionDetailsBCspcaseService.update(this.objInspectionDetails).subscribe(
        (res: ResponseMessage) => {
          if (res && res.responseObj.inspectionDetailsBCSPCaseID > 0) {
            this.objInspectionDetails = res.responseObj;
            this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
