import { Component, Input, OnInit } from '@angular/core';
import { ApplicationFileMaster } from 'src/app/core/models/cda/applicationFileMaster';
import { LUC } from 'src/app/core/models/cda/luc';
import { ApplicationFileMasterService } from 'src/app/core/services/cda/application-file-master.service';

@Component({
  selector: 'app-luc-atp-print',
  templateUrl: './luc-atp-print.component.html',
  styleUrls: ['./luc-atp-print.component.css']
})
export class LucAtpPrintComponent implements OnInit {
  @Input() fileID;

  objFileMasterWithDetails: ApplicationFileMaster = new ApplicationFileMaster();
  objLUC: LUC = new LUC();


  constructor(private applicationFileMasterService: ApplicationFileMasterService,) { }

  ngOnInit() {
    if (this.fileID) {
      this.applicationFileMasterService.getByIDWithDetails(this.fileID).subscribe(
        (res) => {
          if (res) {
            this.objFileMasterWithDetails = Object.assign(this.objFileMasterWithDetails, res);
            this.objLUC = this.objFileMasterWithDetails.luc;
          }
        }
      );
    }
  }
}
