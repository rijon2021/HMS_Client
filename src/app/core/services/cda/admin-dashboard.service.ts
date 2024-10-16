import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';
import { QueryObject } from '../../models/core/queryObject';


@Injectable()
export class AdminDashboardService {
  private controllerName = 'adminDashboard';


  constructor(private httpClientService: HttpClientService) { }

  getAdminDashboard() {
    let url = this.controllerName + '/getAdminDashboard/';
    return this.httpClientService.get(url);
  }

  getFileListByFileType(type: number) {
    let url = this.controllerName + '/getFileListByFileType/' + type;
    return this.httpClientService.get(url);
  }

  getFileListByTypeVisitedUser(obj: QueryObject) {
    let url = this.controllerName + '/getFileListByTypeVisitedUser/'
    return this.httpClientService.postJson(url, obj);
  }
}
