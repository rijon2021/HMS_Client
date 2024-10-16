import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LUCFormat } from 'src/app/core/enums/globalEnum';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { ApplicationFileMaster } from 'src/app/core/models/cda/applicationFileMaster';
import { LUC } from 'src/app/core/models/cda/luc';
import { ApplicationFileMasterService } from 'src/app/core/services/cda/application-file-master.service';
import { LucService } from 'src/app/core/services/cda/luc.service';
import { UserService } from 'src/app/core/services/settings/user.service';

@Component({
  selector: 'app-luc-gis',
  templateUrl: './luc-gis.component.html',
  styleUrls: ['./luc-gis.component.css']
})
export class LucGisComponent implements OnInit, OnDestroy {

  objFileMasterWithDetails: ApplicationFileMaster = new ApplicationFileMaster();
  objLUC: LUC = new LUC();

  organizationID: number;
  userRoleID: number;
  lstAttachmentAllType: any;
  fileMasterID: number;
  private routeSub: Subscription;

  constructor(
    public userService: UserService,
    private applicationFileMasterService: ApplicationFileMasterService,
    private lucService: LucService,
    private route: ActivatedRoute,
    private swal: SweetAlertService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      const fileID = parseInt(params['applicationFileMasterID']);
      if (fileID) {
        this.fileMasterID = fileID;
      }
    });

    this.getByIDWithDetails(this.fileMasterID);
  }

  getByIDWithDetails(fileMasterID: number) {
    this.applicationFileMasterService.getByIDWithDetails(fileMasterID).subscribe(
      (res) => {
        if (res) {
          this.objFileMasterWithDetails = Object.assign(this.objFileMasterWithDetails, res);
          this.objLUC = this.objFileMasterWithDetails.luc;
        }
      }
    );
  }

  save() {
    this.objLUC.format = LUCFormat.GIS;
    this.lucService.save(this.objLUC).subscribe(
      (res) => {
        if (res) {
          this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
        }
      },
      (error) => {
        this.swal.message(error, SweetAlertEnum.error);
      }
    );
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}