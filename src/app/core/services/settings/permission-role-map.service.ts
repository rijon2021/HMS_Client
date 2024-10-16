import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionRoleMapService {
  private controllerName = 'permissionUserRoleMap';
  constructor(
    private httpClientService: HttpClientService
  ) 
  { }
  getAll() {
    let url = this.controllerName;
    return this.httpClientService.get(url);
  }
  getByUserRoleID(userRoleID: number) {
    let url = this.controllerName + '/getByUserRoleID/' + userRoleID;
    return this.httpClientService.get(url);
  }
  updatePermissionList(obj) {
    let url = this.controllerName
    return this.httpClientService.postJson(url, obj);
  }
  getInitialData() {
    let url = this.controllerName + '/getInitialData';
    return this.httpClientService.get(url);
  }

}
