import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';


@Injectable()
export class UserService {
  private controllerName = 'users';
  constructor(
    private httpClientService: HttpClientService
  ) { }

  getAll() {
    let url = this.controllerName + '/getAll';
    return this.httpClientService.get(url);
  }

  getByID(userAutoID: number) {
    let url = this.controllerName + '/getByID/' + userAutoID;
    return this.httpClientService.get(url);
  }

  saveUser(obj) {
    let url = this.controllerName;
    return this.httpClientService.postJson(url, obj);
  }

  updateUser(obj) {
    let url = this.controllerName;
    return this.httpClientService.putJson(url, obj);
  }

  changePassword(obj) {
    let url = this.controllerName + '/changePassword';
    return this.httpClientService.postJson(url, obj);
  }

  deleteUser(userAutoID: number) {
    let url = this.controllerName + '?id=' + userAutoID;
    return this.httpClientService.delete(url);
  }

  getAllByOrganizationID() {
    let url = this.controllerName + '/getAllByOrganizationID';
    return this.httpClientService.get(url);
  }

  getAllByDepartmentID(id: number) {
    let url = this.controllerName + '/getAllByDepartmentID/' + id;
    return this.httpClientService.get(url);
  }

  getInitialData() {
    let url = this.controllerName + '/getInitialData';
    return this.httpClientService.get(url);
  }
}
