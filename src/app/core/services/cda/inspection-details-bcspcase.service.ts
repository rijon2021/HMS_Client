import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';

@Injectable()
export class InspectionDetailsBCspcaseService {
  private controllerName = 'inspectionDetailsBCSPCase';

  constructor(
    private httpClientService: HttpClientService
  ) { }


  getInitialData(id: number) {
    let url = this.controllerName + '/getInitialData/' + id;
    return this.httpClientService.get(url);
  }

  getAll(type: number) {
    let url = this.controllerName + '/getAll/' + type;
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

  search(obj) {
    let url = this.controllerName + '/search';
    return this.httpClientService.postJson(url, obj);
  }

  excelUpload(obj) {
    let url = this.controllerName + '/excelUpload';
    return this.httpClientService.postJson(url, obj);
  }
}
