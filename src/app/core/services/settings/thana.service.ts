import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';
import { DPZ } from '../../models/settings/dpz';

@Injectable({
  providedIn: 'root'
})
export class ThanaService {



  private controllerName = 'Thana';
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
  search(obj){
    let url = this.controllerName + '/search';
    return this.httpClientService.postJson(url, obj);
  }
  getListByUpazilaCityCorporation(obj) {
    let url = this.controllerName + '/getListByUpazilaCityCorporation/';
    return this.httpClientService.postJson(url, obj);
  }
  getListByDPZ(obj : DPZ[]) {
    let url = this.controllerName + '/getListByDPZ/';
    return this.httpClientService.postJson(url, obj);
  }    
  getListByOrganizationID(organizationID: number) {
    let url = this.controllerName + '/getListByOrganizationID/' + organizationID;
    return this.httpClientService.get(url);
  }
}

