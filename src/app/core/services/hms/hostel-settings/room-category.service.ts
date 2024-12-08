import { Injectable } from '@angular/core';
// import { HttpClientService } from 'src/app/core/services/http-client.service';
import { HttpCommunicationService } from '../../http-communication.service';


@Injectable({ providedIn: "root" })
export class RoomCategoryService {
  private controllerName = 'RoomCategory';
  constructor(
    private httpCommunicationService: HttpCommunicationService
  ) { }

  getAll() {
    let url = this.controllerName;
    return this.httpCommunicationService.get(url);
  }
  getByID(Id: number) {
    let url = this.controllerName + '/getByID/' + Id;
    return this.httpCommunicationService.get(url);
  }
  save(obj) {
    let url = this.controllerName
    return this.httpCommunicationService.postJson(url, obj);
  }
  update(obj) {
    let url = this.controllerName+'/'+obj.roomCategoryId;
    return this.httpCommunicationService.putJson(url, obj);
  }
  deleteByID(Id: number) {
    let url = this.controllerName + '/' + Id;
    return this.httpCommunicationService.delete(url);
  }
  
}

