
import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';


@Injectable()
export class OrganizationService {
  private controllerName = 'organization';
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
  saveOrganization(obj) {
    let url = this.controllerName;
    return this.httpClientService.postJson(url, obj);
  }
  updateOrganization(obj) {   
    let url = this.controllerName;
    return this.httpClientService.putJson(url, obj);
  }
  deleteOrganization(userAutoID:number) {
    let url = this.controllerName + '?id=' + userAutoID;
    return this.httpClientService.delete(url);
  }
  getInitialData() {
    let url = this.controllerName + '/getInitialData';
    return this.httpClientService.get(url);
  }
}
