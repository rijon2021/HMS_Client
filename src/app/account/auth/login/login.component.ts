import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthUser, TokenResult } from 'src/app/core/models/auth.models';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { ResponseMessage } from 'src/app/core/models/responseMessage';
import { GlobalSettingEnum, ReturnStatus } from 'src/app/core/enums/globalEnum';
import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { GlobalSetting } from 'src/app/core/models/settings/globalSetting';


/**
 * Login component
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string = '';
  showPass: boolean;
  UserPassword: string = 'password';

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authFackservice: AuthfakeauthenticationService,
    public swal: SweetAlertService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  onSubmit() {
    this.submitted = true;
    let user = new AuthUser();
    user.userID = this.f.email.value;
    user.password = this.f.password.value;

    this.authFackservice.login(user).pipe(first()).subscribe(
      (res: ResponseMessage) => {
        if (res.responseObj) {

          if (res.statusCode == ReturnStatus.Success) {
            let tokenResult: TokenResult = res.responseObj.tokenResult;

            if (tokenResult.access_token && tokenResult.statusCode == 200) {
              this.setLoginInformation(res);

              let userRoleID = res.responseObj.userRoleID;
              if (userRoleID == 38) {
                this.returnUrl = 'cda/luc-atp-list';
              } else if (userRoleID == 39) {
                this.returnUrl = 'cda/bc-case-inspection';
              } else if (userRoleID == 40) {
                this.returnUrl = 'cda/sp-case';
              }else{
                this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
              }
              // this.returnUrl = res.responseObj.permissions[1].routePath;
              RoutingHelper.navigate2([], [this.returnUrl], this.router);
            }
            else {
              this.swal.message('No Token Found', SweetAlertEnum.error);
            }
          }
          else {
            this.swal.message(res.message, SweetAlertEnum.error);
          }
        }
        else {
          this.swal.message(res.message, SweetAlertEnum.error);
        }
      },
      error => {
        this.swal.message(error, SweetAlertEnum.error);
      }
    );
  }

  setLoginInformation(response: ResponseMessage) {
    let authUser: AuthUser = response.responseObj;
    let tokenResult: TokenResult = response.responseObj.tokenResult;
    localStorage.setItem(LOCALSTORAGE_KEY.ACCESS_TOKEN, tokenResult.access_token);
    localStorage.setItem(LOCALSTORAGE_KEY.USER_ID, authUser.userID);
    localStorage.setItem(LOCALSTORAGE_KEY.USER_AUTO_ID, authUser.userAutoID.toString());
    localStorage.setItem(LOCALSTORAGE_KEY.USER_TYPE_ID, authUser.userTypeID.toString());
    localStorage.setItem(LOCALSTORAGE_KEY.ORGANIZATION_ID, authUser.organizationID.toString());
    localStorage.setItem(LOCALSTORAGE_KEY.DESIGNATION_ID, authUser.designationID.toString());
    localStorage.setItem(LOCALSTORAGE_KEY.USER_FULL_NAME, authUser.userFullName);
    localStorage.setItem(LOCALSTORAGE_KEY.ROLE_ID, authUser.userRoleID.toString());
    localStorage.setItem(LOCALSTORAGE_KEY.PERMISSIONS, JSON.stringify(authUser.permissions));
    localStorage.setItem(LOCALSTORAGE_KEY.GLOBAL_SETTINGS, JSON.stringify(authUser.globalSettings));
    localStorage.setItem(LOCALSTORAGE_KEY.USER_IMAGE, (authUser.userImage == null) ? "" : authUser.userImage.toString());

    let globalSetting: GlobalSetting[] = authUser.globalSettings;
    let mapApiKey = globalSetting.find(x => x.globalSettingID == GlobalSettingEnum.Google_Map_Key && x.isActive == true);
    if (mapApiKey != null || mapApiKey != undefined) {
      localStorage.setItem(LOCALSTORAGE_KEY.GOOGLE_MAP_API_KEY, JSON.stringify(mapApiKey.valueInString));
    }
  }

  onCPasswordToggle() {
    if (this.UserPassword === 'password') {
      this.UserPassword = 'text';
      this.showPass = true;
    } else {
      this.UserPassword = 'password';
      this.showPass = false;
    }
  }
}
