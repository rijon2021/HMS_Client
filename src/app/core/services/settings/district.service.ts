import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';

@Injectable()
export class DistrictService {
  private controllerName = 'district';
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
  delete(id: number) {
    let url = this.controllerName + '?id=' + id;
    return this.httpClientService.delete(url);
  }
  updateOrder(obj) {
    let url = this.controllerName + '/updateOrder'
    return this.httpClientService.putJson(url, obj);
  }
  // getListByOrganization(id : number) {
  //   let url = this.controllerName + '/getListByOrganization/' + id;
  //   return this.httpClientService.get(url);
  // }
  search(obj){
    let url = this.controllerName + '/search';
    return this.httpClientService.postJson(url, obj);
  }
  getListByCountry(obj) {
    let url = this.controllerName + '/getListByCountry/';
    return this.httpClientService.postJson(url, obj);
  }
  getListByOrganizationID(organizationID: number) {
    let url = this.controllerName + '/getListByOrganizationID/' + organizationID;
    return this.httpClientService.get(url);
  }
}

