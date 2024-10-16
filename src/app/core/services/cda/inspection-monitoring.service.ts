import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { InspectionMonitoringSearch } from '../../models/cda/inspectionMonitoringSearch';

@Injectable()
export class InspectionMonitoringService {
  private controllerName = 'InspectionMonitoring';

  constructor(
    private httpClientService: HttpClientService
  ) { }


  getInitialData() {
    let url = this.controllerName + '/getInitialData/';
    return this.httpClientService.get(url);
  }

  getInspectionCoordinates(applicationFileMasterID: number) {
    let url = `${this.controllerName}/getInspectionCoordinates/${applicationFileMasterID}`;
    return this.httpClientService.get(url);
  }

  search(obj) {
    let url = this.controllerName + '/search/';
    return this.httpClientService.postJson(url, obj);
  }

  searchMultiple(obj: InspectionMonitoringSearch) {
    let url = this.controllerName + '/searchMultiple/';
    return this.httpClientService.postJson(url, obj);
  }

  searchByFileOrRefNo(refNo: string) {
    let url = this.controllerName + '/searchByFileOrRefNo/' + refNo;
    return this.httpClientService.get(url);
  }
}
