import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from 'src/app/core/services/cda/admin-dashboard.service';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import {
  AdminDashboard, AdminDashboardFileListUserWise,
  AdminDashboardFileTypeWise, AdminDashboardFileUserWise
} from 'src/app/core/models/cda/adminDashboard';
import { QueryObject } from 'src/app/core/models/core/queryObject';
import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  adminDashboard: AdminDashboard = new AdminDashboard();
  objAdminApplicationType: AdminDashboardFileTypeWise = new AdminDashboardFileTypeWise();
  selectedApplicationType: AdminDashboardFileTypeWise = new AdminDashboardFileTypeWise();

  isVisible: string;

  transactions: Array<[]>;
  statData: Array<[]>;

  isActive: string;
  activeClass: number;


  constructor(private adminDashboardService: AdminDashboardService, private swal: SweetAlertService) { }


  ngOnInit() {
    this.getAdminDashboard();
  }

  getAdminDashboard() {
    this.adminDashboardService.getAdminDashboard().subscribe(
      (res: AdminDashboard) => {
        if (res) {
          if (res.adminDashboardFileTypeWiseList) {
            this.adminDashboard.adminDashboardFileTypeWiseList = res.adminDashboardFileTypeWiseList;

            // to retain variable dashboard items for testing responsive behavior
            // this.adminDashboard.adminDashboardFileTypeWiseList.splice(1);
            // this.adminDashboard.adminDashboardFileTypeWiseList.splice(2);

            if (this.adminDashboard.adminDashboardFileTypeWiseList.length > 0) {
              this.loadData(this.adminDashboard.adminDashboardFileTypeWiseList[0]);
            }
          }
        }
      },
      (error) => {
        this.swal.message(error, SweetAlertEnum.error);
      }
    );
  }

  goToInspectionMonitoring(refNo: string, isVisited: boolean) {
    if (refNo != null && isVisited) {
      localStorage.setItem(LOCALSTORAGE_KEY.REFERENCE_NO, refNo);
      const newTab = window.open('/cda/inspection-monitoring', '_blank');
      newTab?.focus();  // optionally, focus on the new tab
    }
  }

  loadData(stat: AdminDashboardFileTypeWise) {
    this.activeClass = stat.applicationType;
    this.selectedApplicationType = stat;

    this.adminDashboardService.getFileListByFileType(stat.applicationType).subscribe(
      (res: AdminDashboardFileUserWise[]) => {
        if (res) {
          this.adminDashboard.adminDashboardFileUserWiseList = res;
        }
      },
      (error) => {
        this.swal.message(error, SweetAlertEnum.error);
      }
    );
  }

  showVisitedResult: boolean

  getListByUser(item: AdminDashboardFileUserWise, isVisited: boolean) {
    // reset sort order of assign and visit date
    this.assignDateSortOrder = 'sort';
    this.visitDateSortOrder = 'sort';

    this.adminDashboard.adminDashboardFileListUserWise = [];
    this.adminDashboard.adminDashboardFileUserWiseList.forEach(x => x.isFileDetails = false);

    if (isVisited && item.visited > 0) {
      item.isFileDetails = !item.isFileDetails;
    }

    if (!isVisited && (item.totalFile - item.visited) > 0) {
      item.isFileDetails = !item.isFileDetails;
    }

    this.showVisitedResult = isVisited;

    if (isVisited && item.visited == 0) return;
    if (!isVisited && (item.totalFile - item.visited == 0)) return;

    let queryObject = new QueryObject({
      userID: item.userID,
      isVisited: isVisited,
      applicationType: this.selectedApplicationType.applicationType
    });

    this.adminDashboardService.getFileListByTypeVisitedUser(queryObject).subscribe(
      (res: AdminDashboardFileListUserWise[]) => {
        if (res) {
          item.isFileDetails = true;
          this.adminDashboard.adminDashboardFileListUserWise = res;
        }
      },
      (error) => {
        this.swal.message(error, SweetAlertEnum.error);
      }
    );
  }

  assignDateSortOrder: string = 'sort'; visitDateSortOrder: string = 'sort';

  dataSort(id: number) {
    if (id == 1) {
      if (['sort', 'sort-down'].includes(this.assignDateSortOrder)) {
        this.assignDateSortOrder = 'sort-up';
      } else {
        this.assignDateSortOrder = 'sort-down';
      }

      this.visitDateSortOrder = 'sort';

      this.adminDashboard.adminDashboardFileListUserWise.sort((a, b) => {
        if (this.assignDateSortOrder === 'sort-up') {
          return new Date(a.assignDate).getTime() - new Date(b.assignDate).getTime();
        } else {
          return new Date(b.assignDate).getTime() - new Date(a.assignDate).getTime();
        }
      });
    } else if (id == 2) {
      if (['sort', 'sort-down'].includes(this.visitDateSortOrder)) {
        this.visitDateSortOrder = 'sort-up';
      } else {
        this.visitDateSortOrder = 'sort-down';
      }

      this.assignDateSortOrder = 'sort';

      this.adminDashboard.adminDashboardFileListUserWise.sort((a, b) => {
        if (this.visitDateSortOrder === 'sort-up') {
          return new Date(a.visitDate).getTime() - new Date(b.visitDate).getTime();
        } else {
          return new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime();
        }
      });
    }
  }
}
