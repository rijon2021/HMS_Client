import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextFilterService {
  datepipe: DatePipe = new DatePipe('en-US')
  public emailExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  banglaNumberArray =
    [
      "০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"
    ]

  constructor() { }
  disableRightClick(event) {
    event.preventDefault();
  }
  onlyPositiveIntNumber(event: any) {
    const numberRegEx = /^[0-9]*[0-9][0-9]*$/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !numberRegEx.test(inputCharacter)) {
      event.preventDefault();
    }
    if (event.type == "paste") {
      event.preventDefault();
    }
  }
  onlyLocationLatLon(event: any, data?: string) {
    const numberRegEx = /^[-+]?\d*\.?\d*\,?[-+]?\d*\.?\d*$/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.type == "keypress") {
      if (event.keyCode != 8 && !numberRegEx.test(inputCharacter)) {
        event.preventDefault();
      }
    }
    if (event.type == "paste" && data == 'html') {
      event.preventDefault();
    }
    if (event.type == "keydown") {
      if (!numberRegEx.test(inputCharacter)) {
        event.preventDefault();
      }
    }
    if (event.type == "change") {
      if (!numberRegEx.test(data)) {
        event.preventDefault();
        return false;
      }
      else {
        return true;
      }
    }
    if (event.type == "keyup") {
      if (!numberRegEx.test(data)) {
        event.preventDefault();
        return false;
      }
      else {
        return true;
      }
    }
  }

  onlyDecimalNumber(event: any) {
    const numberRegEx = /^-?\d*\.?\d*$/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !numberRegEx.test(inputCharacter)) {
      event.preventDefault();
    }
  }
  onPasteDisable(event: ClipboardEvent) {
    event.preventDefault();
  }
  getBooleanStr(isBool) {
    if (isBool == true) {
      return "হ্যাঁ";
    }
    else if (isBool == false) {
      return "না";
    }
    else {
      return "প্রযোজ্য নহে";
    }
  }
  getBanglaNumber(val: string) {
    var output = '';
    for (var i = 0; i < val.length; ++i) {
      if ((val[i].match(/^\d+$/))) {
        output = output + this.banglaNumberArray[val[i]];
      }
      else {
        output = output + val[i];
      }
    }
    return output;
  }
  getBanglaNumberDate(val) {
    val = this.datepipe.transform(val, 'dd-MM-yyyy');

    if (!val) return '';

    var output = '';
    for (var i = 0; i < val.length; ++i) {
      if ((val[i].match(/^\d+$/))) {
        output = output + this.banglaNumberArray[val[i]];
      }
      else {
        output = output + val[i];
      }
    }
    return output;
  }
}