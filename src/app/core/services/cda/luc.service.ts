import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class LucService {
  private controllerName = 'InspectionDetailsLUC';

  constructor(
    private httpClientService: HttpClientService
  ) { }


  getAll() {
    let url = this.controllerName;
    return this.httpClientService.get(url);
  }

  getById(fileMasterId) {
    let url = this.controllerName + '/getById/' + fileMasterId;;
    return this.httpClientService.get(url);
  }

  save(obj) {
    let url = this.controllerName
    return this.httpClientService.postJson(url, obj);
  }

  update(obj) {
    let url = this.controllerName
    return this.httpClientService.putJson(url, obj);
  }
}
