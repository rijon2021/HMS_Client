import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';

@Injectable()
export class UserRoleService {
  private controllerName = 'userRole';
  constructor(
    private httpClientService: HttpClientService
  ) { }

  getAll() {
    let url = this.controllerName;
    return this.httpClientService.get(url);
  }
  getByID(userAutoID: number) {
    let url = this.controllerName + '/getByID/' + userAutoID;
    return this.httpClientService.get(url);
  }
  saveUserRole(obj) {
    let url = this.controllerName
    return this.httpClientService.postJson(url, obj);
  }
  updateUserRole(obj) {
    let url = this.controllerName;
    return this.httpClientService.putJson(url, obj);
  }
  deleteUserRole(userAutoID: number) {
    let url = this.controllerName + '?id=' + userAutoID;
    return this.httpClientService.delete(url);
  }
  updateOrder(obj) {
    let url = this.controllerName + '/updateOrder'
    return this.httpClientService.putJson(url, obj);
  }
}

