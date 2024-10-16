import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LUCFormat } from 'src/app/core/enums/globalEnum';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { ApplicationFileMaster } from 'src/app/core/models/cda/applicationFileMaster';
import { LUC } from 'src/app/core/models/cda/luc';
import { OccupancyType } from 'src/app/core/models/cda/occupancyType';
import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';
import { ApplicationFileMasterService } from 'src/app/core/services/cda/application-file-master.service';
import { AttachmentsService } from 'src/app/core/services/cda/attachments.service';
import { LucService } from 'src/app/core/services/cda/luc.service';
import { OccupancyTypeService } from 'src/app/core/services/cda/occupancy-type.service';
import { UserService } from 'src/app/core/services/settings/user.service';


@Component({
  selector: 'app-luc-atp',
  templateUrl: './luc-atp.component.html',
  styleUrls: ['./luc-atp.component.css']
})
export class LucAtpComponent implements OnInit, OnDestroy {

  objFileMasterWithDetails: ApplicationFileMaster = new ApplicationFileMaster();
  objLUC: LUC = new LUC({ format: LUCFormat.ATP });
  lstOccupancyTypes: OccupancyType[] = []

  organizationID: number;
  userRoleID: number;
  lstAttachmentAllType: any;
  fileMasterID: number;
  private routeSub: Subscription;

  constructor(
    public userService: UserService,
    private applicationFileMasterService: ApplicationFileMasterService,
    private lucService: LucService,
    private occupancyTypeSvc: OccupancyTypeService,
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
    // this.getById(this.fileMasterID);
    // this.getAttachmentListByFileID(this.fileMasterID);
  }

  // getAttachmentListByFileID(fileMasterID: number) {
  //   if (fileMasterID) {
  //     this.attachmentsService.getAttachmentListByFileID(fileMasterID).subscribe((res: ResponseMessage) => {
  //       if (res) {
  //         this.lstAttachmentAllType = res.responseObj;

  //         this.lstAttachmentAllType.forEach(singleAttachment => {
  //           if (singleAttachment.attachementTypeID == AttachmentType.Image) {
  //             singleAttachment.attachmentTypeName = "ছবি";
  //           } else if (singleAttachment.attachementTypeID == AttachmentType.Audio) {
  //             singleAttachment.attachmentTypeName = "অডিও";
  //           } else if (singleAttachment.attachementTypeID == AttachmentType.File) {
  //             singleAttachment.attachmentTypeName = "ডকুমেন্ট";
  //           } else if (singleAttachment.attachementTypeID == AttachmentType.Video) {
  //             singleAttachment.attachmentTypeName = "ভিডিও";
  //           } else if (singleAttachment.attachementTypeID == AttachmentType.Map) {
  //             singleAttachment.attachmentTypeName = "বার্ড আই ভিউ";
  //           }
  //         });
  //       }
  //     });
  //   }
  // }

  getByIDWithDetails(fileMasterID: number) {
    this.applicationFileMasterService.getByIDWithDetails(fileMasterID).subscribe(
      (res) => {
        if (res) {
          this.objFileMasterWithDetails = Object.assign(this.objFileMasterWithDetails, res);
          this.objLUC = this.objFileMasterWithDetails.luc;

          this.onOccupancyChange(true);
        }
      }
    );
  }

  onOccupancyChange(onStartUp?: boolean) {
    if (!this.objLUC.landOccupancyID) return;
    this.occupancyTypeSvc.getAll(this.objLUC.landOccupancyID).subscribe(
      (res: OccupancyType[]) => {
        if (res) {
          this.lstOccupancyTypes = res;

          if (!onStartUp) this.objLUC.landOccupancyTypeID = 0;
        }
      }
    );
  }

  footToMeter(existingOrProposed: string, direction: string) {
    switch (existingOrProposed) {
      case 'existing':
        switch (direction) {
          case 'north':
            if (this.objLUC.existingRoadSizeFootNorth !== null) {
              this.objLUC.existingRoadSizeMeterNorth = parseFloat((this.objLUC.existingRoadSizeFootNorth / 3.281).toFixed(2));
            }
            break;
          case 'south':
            if (this.objLUC.existingRoadSizeFootSouth !== null) {
              this.objLUC.existingRoadSizeMeterSouth = parseFloat((this.objLUC.existingRoadSizeFootSouth / 3.281).toFixed(2));
            }
            break;
          case 'east':
            if (this.objLUC.existingRoadSizeFootEast !== null) {
              this.objLUC.existingRoadSizeMeterEast = parseFloat((this.objLUC.existingRoadSizeFootEast / 3.281).toFixed(2));
            }
            break;
          case 'west':
            if (this.objLUC.existingRoadSizeFootWest !== null) {
              this.objLUC.existingRoadSizeMeterWest = parseFloat((this.objLUC.existingRoadSizeFootWest / 3.281).toFixed(2));
            }
            break;
        }

        break;
      case 'proposed':
        switch (direction) {
          case 'north':
            if (this.objLUC.proposedRoadSizeFootNorth !== null) {
              this.objLUC.proposedRoadSizeMeterNorth = parseFloat((this.objLUC.proposedRoadSizeFootNorth / 3.281).toFixed(2));
            }
            break;
          case 'south':
            if (this.objLUC.proposedRoadSizeFootSouth !== null) {
              this.objLUC.proposedRoadSizeMeterSouth = parseFloat((this.objLUC.proposedRoadSizeFootSouth / 3.281).toFixed(2));
            }
            break;
          case 'east':
            if (this.objLUC.proposedRoadSizeFootEast !== null) {
              this.objLUC.proposedRoadSizeMeterEast = parseFloat((this.objLUC.proposedRoadSizeFootEast / 3.281).toFixed(2));
            }
            break;
          case 'west':
            if (this.objLUC.proposedRoadSizeFootWest !== null) {
              this.objLUC.proposedRoadSizeMeterWest = parseFloat((this.objLUC.proposedRoadSizeFootWest / 3.281).toFixed(2));
            }
            break;
        }

        break;
    }
  }

  meterToFoot(existingOrProposed: string, direction: string) {
    switch (existingOrProposed) {
      case 'existing':
        switch (direction) {
          case 'north':
            if (this.objLUC.existingRoadSizeMeterNorth !== null) {
              this.objLUC.existingRoadSizeFootNorth = parseFloat((this.objLUC.existingRoadSizeMeterNorth * 3.281).toFixed(2));
            }
            break;
          case 'south':
            if (this.objLUC.existingRoadSizeMeterSouth !== null) {
              this.objLUC.existingRoadSizeFootSouth = parseFloat((this.objLUC.existingRoadSizeMeterSouth * 3.281).toFixed(2));
            }
            break;
          case 'east':
            if (this.objLUC.existingRoadSizeMeterEast !== null) {
              this.objLUC.existingRoadSizeFootEast = parseFloat((this.objLUC.existingRoadSizeMeterEast * 3.281).toFixed(2));
            }
            break;
          case 'west':
            if (this.objLUC.existingRoadSizeMeterWest !== null) {
              this.objLUC.existingRoadSizeFootWest = parseFloat((this.objLUC.existingRoadSizeMeterWest * 3.281).toFixed(2));
            }
            break;
        }

        break;
      case 'proposed':
        switch (direction) {
          case 'north':
            if (this.objLUC.proposedRoadSizeMeterNorth !== null) {
              this.objLUC.proposedRoadSizeFootNorth = parseFloat((this.objLUC.proposedRoadSizeMeterNorth * 3.281).toFixed(2));
            }
            break;
          case 'south':
            if (this.objLUC.proposedRoadSizeMeterSouth !== null) {
              this.objLUC.proposedRoadSizeFootSouth = parseFloat((this.objLUC.proposedRoadSizeMeterSouth * 3.281).toFixed(2));
            }
            break;
          case 'east':
            if (this.objLUC.proposedRoadSizeMeterEast !== null) {
              this.objLUC.proposedRoadSizeFootEast = parseFloat((this.objLUC.proposedRoadSizeMeterEast * 3.281).toFixed(2));
            }
            break;
          case 'west':
            if (this.objLUC.proposedRoadSizeMeterWest !== null) {
              this.objLUC.proposedRoadSizeFootWest = parseFloat((this.objLUC.proposedRoadSizeMeterWest * 3.281).toFixed(2));
            }
            break;
        }

        break;
    }
  }

  async update() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.objLUC.format = LUCFormat.ATP;
      this.lucService.update(this.objLUC).subscribe(
        (res: any) => {
          if (res) {
            this.swal.message('Data Saved Successfully', SweetAlertEnum.success);
            this.objLUC = res.responseObj;
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
