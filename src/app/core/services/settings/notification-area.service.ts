import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';


@Injectable()
export class NotificationAreaService {
  private controllerName = 'notificationArea';
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
  saveNotificationArea(obj) {
    let url = this.controllerName
    return this.httpClientService.postJson(url, obj);
  }
  updateNotificationArea(obj) {
    let url = this.controllerName;
    return this.httpClientService.putJson(url, obj);
  }
  deleteNotificationArea(userAutoID: number) {
    let url = this.controllerName + '?id=' + userAutoID;
    return this.httpClientService.delete(url);
  }
  updateOrder(obj) {
    let url = this.controllerName + '/updateOrder'
    return this.httpClientService.putJson(url, obj);
  }
}

