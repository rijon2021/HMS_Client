import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { ApplicationFileMaster } from 'src/app/core/models/cda/applicationFileMaster';
import { InspectionDetailsBCSPCase } from 'src/app/core/models/cda/inspectionDetailsBCSPCase';
import { ResponseMessage } from 'src/app/core/models/responseMessage';
import { ApplicationFileMasterService } from 'src/app/core/services/cda/application-file-master.service';
import { InspectionDetailsBCspcaseService } from 'src/app/core/services/cda/inspection-details-bcspcase.service';

@Component({
  selector: 'app-bc-case-technical',
  templateUrl: './bc-case-technical.component.html',
  styleUrls: ['./bc-case-technical.component.css']
})
export class BcCaseTechnicalComponent implements OnInit {

  objFileMasterWithDetails: ApplicationFileMaster = new ApplicationFileMaster();
  objInspectionDetails: InspectionDetailsBCSPCase = new InspectionDetailsBCSPCase();
  fileMasterID: number;
  private routeSub: Subscription;


  constructor(
    private applicationFileMasterService: ApplicationFileMasterService,
    private inspectionDetailsBCspcaseService: InspectionDetailsBCspcaseService,
    private route: ActivatedRoute,
    private swal: SweetAlertService
  ) { }

  ngOnInit() {

    this.routeSub = this.route.params.subscribe(params => {
      const fileID = parseInt(params['fileMasterID']);
      if (fileID) {
        this.fileMasterID = fileID;
      }
    });
    this.getByIDWithDetails(this.fileMasterID);
  }

  getByIDWithDetails(fileMasterID: number) {
    this.applicationFileMasterService.getByIDWithDetails(this.fileMasterID).subscribe(
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
