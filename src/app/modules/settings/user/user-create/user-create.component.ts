import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReturnStatus, UserRoleEnum } from 'src/app/core/enums/globalEnum';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { Organization } from 'src/app/core/models/data/organization';
import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';
import { ResponseMessage } from 'src/app/core/models/responseMessage';
import { Department } from 'src/app/core/models/settings/department';
import { DepartmentDesginationMap } from 'src/app/core/models/settings/departmentDesginationMap';
import { Designation } from 'src/app/core/models/settings/designation';
import { UserRole } from 'src/app/core/models/settings/userRole';
import { Users } from 'src/app/core/models/settings/users';
// import { DepartmentDesignationMapService } from 'src/app/core/services/settings/departmentDesignationMap.service';
import { UserService } from 'src/app/core/services/settings/user.service';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  // bread crumb items
  private routeSub: Subscription;

  public objUser: Users = new Users();
  public imageURL: string;
  lstOrganization: Organization[] = new Array<Organization>();
  lstUserRole: UserRole[] = new Array<UserRole>();
  lstDesignation: Designation[] = new Array<Designation>();
  lstDeptDesignation: DepartmentDesginationMap[] = new Array<DepartmentDesginationMap>();
  lstDepartment: Department[] = new Array<Department>();
  imageFile: File = null;
  activateUpdate: boolean = false;

  organizationID: number;
  userRoleID: number;


  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    // private departmentDesignationMapService: DepartmentDesignationMapService,
    private swal: SweetAlertService,
    private router: Router
  ) { }


  ngOnInit() {
    this.organizationID = Number(localStorage.getItem(LOCALSTORAGE_KEY.ORGANIZATION_ID));
    this.userRoleID = Number(localStorage.getItem(LOCALSTORAGE_KEY.ROLE_ID));
    this.getInitialData();
    this.routeSub = this.route.params.subscribe(
      params => {
        const userAutoID = parseInt(params['userID']);
        if (userAutoID) {
          this.objUser.userAutoID = userAutoID;
          this.getByID(userAutoID);
          this.activateUpdate = true;
        }
      }
    );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getInitialData() {
    this.userService.getInitialData().subscribe(
      (res: ResponseMessage) => {
        if (res) {
          this.lstOrganization = res.responseObj.lstOrganization;
          this.lstUserRole = res.responseObj.lstUserRole;
          if (this.organizationID > 0 && this.userRoleID != UserRoleEnum.SuperAdmin) {
            this.lstOrganization = this.lstOrganization.filter(x => x.organizationID == this.organizationID);

            if (this.lstOrganization.length > 0) {
              this.objUser.organizationID = this.lstOrganization[0].organizationID;
            }
          }

          if (this.userRoleID != UserRoleEnum.SuperAdmin) {
            this.lstUserRole = this.lstUserRole.filter(x => x.userRoleID != UserRoleEnum.SuperAdmin);
          }

          this.lstDepartment = res.responseObj.lstDepartment;
          this.lstDesignation = res.responseObj.lstDesignation;
        }
      }
    );
  }

  // getByDepartmentID(departmentID: number) {
  //   this.lstDeptDesignation = [];
  //   this.departmentDesignationMapService.getByDepartmentID(departmentID).subscribe(
  //     (resp) => {
  //       if (resp) {
  //         this.lstDeptDesignation = Object.assign(this.lstDeptDesignation, resp);
  //         this.lstDeptDesignation = [...this.lstDeptDesignation];
  //       }
  //     }
  //   );
  // }

  getByID(userID: number) {
    this.userService.getByID(userID).subscribe(
      (res: Users) => {
        if (res && res.userAutoID > 0) {
          this.objUser = res;
          this.objUser.userImagePreview = "data:image/png;base64," + this.objUser.userImage;
          this.objUser.signaturePreview = "data:image/png;base64," + this.objUser.signature;

          if (this.activateUpdate) {
            // this.getByDepartmentID(this.objUser.departmentID);
            this.activateUpdate = false;
          }
        }
      }
    );
  }

  onChangeImage(fileInput: any, type: number) {
    this.imageFile = <File>fileInput.target.files[0];
    var mimeType = this.imageFile.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.imageFile);

    if (type == 1) {
      reader.onload = (_event) => {
        this.objUser.userImagePreview = reader.result;
        var sign = this.objUser.userImagePreview.split(',', 1) + ',';
        this.objUser.userImage = this.objUser.userImagePreview.replace(sign, '');
      }
    }

    if (type == 2) {
      reader.onload = (_event) => {
        this.objUser.signaturePreview = reader.result;
        var sign = this.objUser.signaturePreview.split(',', 1) + ',';
        this.objUser.signature = this.objUser.signaturePreview.replace(sign, '');
      }
    }
  }

  async saveUser() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.userService.saveUser(this.objUser).subscribe(
        (res: Users) => {
          if (res.userAutoID > 0) {
            this.swal.message("user created successfully", SweetAlertEnum.success);
            RoutingHelper.navigate2([], ['settings', 'user', 'user-list'], this.router);
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        }
      );
    }
  }

  async updateUser() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      if (this.objUser.userAutoID && this.objUser.userAutoID > 0) {
        this.userService.updateUser(this.objUser).subscribe(
          (res: Users) => {
            if (res && res.userAutoID > 0) {
              this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
              RoutingHelper.navigate2([], ['settings', 'user', 'user-list'], this.router);
            }
          },
          (error) => {
            this.swal.message(error, SweetAlertEnum.error);
          }
        );
      }
    }
  }

  async deleteUser() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      if (this.objUser.userAutoID && this.objUser.userAutoID > 0) {
        this.userService.deleteUser(this.objUser.userAutoID).subscribe((res: Users) => {
          this.swal.message('Deleted Successfully', SweetAlertEnum.success);
          RoutingHelper.navigate2([], ['settings', 'user', 'user-list'], this.router);
        });
      }
    }
  }

  async goToList() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      RoutingHelper.navigate2([], ['settings', 'user', 'user-list'], this.router);
    }
  }
}
