import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UnionWardService {


  private controllerName = 'UnionWard';
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
  save(obj) {
    let url = this.controllerName
    return this.httpClientService.postJson(url, obj);
  }
  update(obj) {
    let url = this.controllerName;
    return this.httpClientService.putJson(url, obj);
  }
  delete(userAutoID: number) {
    let url = this.controllerName + '?id=' + userAutoID;
    return this.httpClientService.delete(url);
  }
  updateOrder(obj) {
    let url = this.controllerName + '/updateOrder'
    return this.httpClientService.putJson(url, obj);
  }
  getListByThana(obj) {
    let url = this.controllerName + '/getListByThana/';
    return this.httpClientService.postJson(url, obj);
  }
  getListByOrganizationID(organizationID: number) {
    let url = this.controllerName + '/getListByOrganizationID/' + organizationID;
    return this.httpClientService.get(url);
  }
}


