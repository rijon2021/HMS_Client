import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';

@Injectable()
export class PermissionService {
  private controllerName = 'permission';
  constructor(
    private httpClientService: HttpClientService
  ) { }

  getAll() {
    let url = this.controllerName;
    return this.httpClientService.get(url);
  }
  getByID(permissionID: number) {
    let url = this.controllerName + '/getByID/' + permissionID;
    return this.httpClientService.get(url);
  }
  savePermission(obj) {
    let url = this.controllerName
    return this.httpClientService.postJson(url, obj);
  }
  updatePermission(obj) {
    let url = this.controllerName;
    return this.httpClientService.putJson(url, obj);
  }
  deletePermission(permissionID: number) {
    let url = this.controllerName + '?id=' + permissionID;
    return this.httpClientService.delete(url);
  }
  updateOrder(obj) {
    let url = this.controllerName + '/updateOrder'
    return this.httpClientService.putJson(url, obj);
  }
}
