import { Component, Input, OnInit } from '@angular/core';
import { ApplicationFileMaster } from 'src/app/core/models/cda/applicationFileMaster';
import { LUC } from 'src/app/core/models/cda/luc';
import { ApplicationFileMasterService } from 'src/app/core/services/cda/application-file-master.service';

@Component({
  selector: 'app-luc-gis-print',
  templateUrl: './luc-gis-print.component.html',
  styleUrls: ['./luc-gis-print.component.css']
})
export class LucGisPrintComponent implements OnInit {
  @Input() fileID;
  objFileMasterWithDetails: ApplicationFileMaster = new ApplicationFileMaster();
  objLUC: LUC = new LUC();

  constructor(
    private applicationFileMasterService: ApplicationFileMasterService
  ) { }

  ngOnInit() {
    this.getByIDWithDetails(this.fileID);
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
}
