import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UpazilaCityCorporationService {
  private controllerName = 'upazilaCityCorporation';
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
  save(obj){
    let url = this.controllerName;
    return this.httpClientService.postJson(url, obj);
  }
  update(obj){
    let url = this.controllerName;
    return this.httpClientService.putJson(url, obj);
  }
  updateOrder(obj) {
    let url = this.controllerName + '/updateOrder'
    return this.httpClientService.putJson(url, obj);
  }
  search(obj){
    let url = this.controllerName + '/search';
    return this.httpClientService.postJson(url, obj);
  }
  delete(id: number) {
    let url = this.controllerName + '?id=' + id;
    return this.httpClientService.delete(url);
  }
  getListByDistrict(obj) {
    let url = this.controllerName + '/getListByDistrict/';
    return this.httpClientService.postJson(url, obj);
  }
  getListByOrganizationID(organizationID: number) {
    let url = this.controllerName + '/getListByOrganizationID/' + organizationID;
    return this.httpClientService.get(url);
  }
}

