import { Injectable } from '@angular/core';
// import { HttpClientService } from 'src/app/core/services/http-client.service';
import { HttpCommunicationService } from '../../http-communication.service';


@Injectable({ providedIn: "root" })

export class FoodItemService {

  private controllerName = 'FoodItem';
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
    let url = this.controllerName+'/'+obj.foodItemId;
    return this.httpCommunicationService.putJson(url, obj);
  }
  deleteByID(Id: number) {
    let url = this.controllerName + '/' + Id;
    return this.httpCommunicationService.delete(url);
  }
  
}

