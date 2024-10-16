import { Component } from '@angular/core';
import { ApplicationFileMasterService } from 'src/app/core/services/cda/application-file-master.service';


@Component({
  selector: 'app-data-pull',
  templateUrl: './data-pull.component.html',
  styleUrls: ['./data-pull.component.scss']
})
export class DataPullComponent {
  fileRef: string;
  fileDetails: any;

  constructor(private fileMasterService: ApplicationFileMasterService) { }

  pullByFileRef() {
    if (this.fileRef) {
      this.fileMasterService.getByRefWithDetails(this.fileRef).subscribe(
        (res) => {
          this.fileDetails = res;
        }
      );
    }
  }
}
