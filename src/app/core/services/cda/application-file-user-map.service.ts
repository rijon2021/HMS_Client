import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { ApplicationFileUserMap } from '../../models/cda/applicationFileUserMap';


@Injectable({
  providedIn: 'root'
})
export class ApplicationFileUserMapService {
  private controllerName = 'applicationFileUserMap';

  constructor(
    private httpClientService: HttpClientService
  ) { }
  

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

  getAssingedUserListByFile(obj: ApplicationFileUserMap) {
    let url = this.controllerName + '/getAssingedUserListByFile/'
    return this.httpClientService.postJson(url, obj);
  }
}
