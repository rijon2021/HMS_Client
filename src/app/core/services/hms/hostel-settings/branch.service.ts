import { Injectable } from '@angular/core';
// import { HttpClientService } from 'src/app/core/services/http-client.service';
import { HttpCommunicationService } from '../../http-communication.service';


@Injectable({ providedIn: "root" })
export class BranchService {
  private controllerName = 'Branch';
  constructor(
    private httpCommunicationService: HttpCommunicationService
  ) { }

  getAll() {
    let url = this.controllerName;
    return this.httpCommunicationService.get(url);
  }
  getByID(userAutoID: number) {
    let url = this.controllerName + '/getByID/' + userAutoID;
    return this.httpCommunicationService.get(url);
  }
  save(obj) {
    let url = this.controllerName
    return this.httpCommunicationService.postJson(url, obj);
  }
  update(obj) {
    let url = this.controllerName+'/'+obj.branchId;
    return this.httpCommunicationService.putJson(url, obj);
  }
  deleteByID(userAutoID: number) {
    let url = this.controllerName + '/' + userAutoID;
    return this.httpCommunicationService.delete(url);
  }
  
}
