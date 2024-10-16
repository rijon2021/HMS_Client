import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReturnStatus } from 'src/app/core/enums/globalEnum';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { ResponseMessage } from 'src/app/core/models/responseMessage';
import { Users } from 'src/app/core/models/settings/users';
import { UserService } from 'src/app/core/services/settings/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  errorMessage: string;

  public objUser: Users = new Users();
  constructor(
    private userService : UserService,
    private route: ActivatedRoute,
    private swal: SweetAlertService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  isValid() {
    this.errorMessage = null;
    if (this.objUser.password == null) {
      this.errorMessage = "Please enter your password";
      return false;
    }
    else if (this.objUser.newPassword != this.objUser.confirmPassword) {
      this.errorMessage = "Password don't match";
      return false;
    }
    else if (this.objUser.newPassword.length < 5) {
      this.errorMessage = "Password minimum length is 5";
      return false;
    }
    else if (this.objUser.newPassword == this.objUser.password) {
      this.errorMessage = "New can't be same old passsword";
      return false;
    }
    else if (this.objUser.newPassword.search(' ') > 0) {
      this.errorMessage = "Password can't contain space";
      return false;
    }
    return true;
  }



  async changePassword() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.objUser.userAutoID = parseInt(localStorage.getItem('USER_AUTO_ID'));
      this.userService.changePassword(this.objUser).subscribe(
        (res: ResponseMessage) => {
          if (res.statusCode == ReturnStatus.Success) {
            this.swal.message( res.message, SweetAlertEnum.success);
            this.objUser = new Users();
          }else{
            this.swal.message( res.message, SweetAlertEnum.error);
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        })
    }
  }

}
