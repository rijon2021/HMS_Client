import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';

@Injectable()
export class CountryService {
  private controllerName = 'country';
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
  getListByOrganization(obj) {
    let url = this.controllerName + '/getListByOrganization/';
    return this.httpClientService.postJson(url, obj);
  }
}

