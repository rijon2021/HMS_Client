import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ReturnStatus } from '../enums/globalEnum';

export enum SweetAlertEnum {
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info',
  question = 'question'
}

@Injectable()
export class SweetAlertService {
  constructor() { }
  message(text: string, icon: SweetAlertEnum, returnStatus: ReturnStatus = ReturnStatus.Success) {
    Swal.fire({
      text: text,
      icon: (returnStatus == ReturnStatus.Success) ? icon : SweetAlertEnum.warning,
      confirmButtonText: 'OK',
      allowEscapeKey: true
    })
  }
  message_withRedirect(text: string, link: string, icon: SweetAlertEnum, buttonText: string = 'Ok') {
    Swal.fire({
      text: text,
      icon: icon,
      confirmButtonText: buttonText,
      allowEscapeKey: true
    }).then((result) => {
      location.href = link;
    });
    // this.routingHelper.dams_navigate([], [link])
  }
  notification(text: string, icon: SweetAlertEnum = SweetAlertEnum.success, timer :number = 1200 ) {
    Swal.fire({
      position: 'top-end',
      icon: icon,
      title: text,
      showConfirmButton: false,
      timer: timer,
      allowEscapeKey: true
    })
  }
  async confirm() {
    const res = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: SweetAlertEnum.question,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      } else if (result.isDenied) {
        return false;
      }
    });
    return res;
  }
  async confirm_custom(text: string, icon: SweetAlertEnum, isShowDenyButton: boolean, isShowCancelButton: boolean) {
    const res = await Swal.fire({
      title: text,
      icon: icon,
      showDenyButton: isShowDenyButton,
      showCancelButton: isShowCancelButton,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      } else if (result.isDenied) {
        return false;
      }
    });
    return res;
  }
  async confirm_textbox(headerText: string, placeholderText: string, icon: SweetAlertEnum, isShowCancelButton: boolean) {
    const res = await Swal.fire({
      input: 'textarea',
      inputLabel: headerText,
      icon: icon,
      inputPlaceholder: placeholderText,
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: isShowCancelButton
    }).then((result) => {
      return result;
    });
    return res;
  }
}