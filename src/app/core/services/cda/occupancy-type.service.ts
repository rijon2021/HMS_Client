import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class OccupancyTypeService {
  private controllerName = 'OccupancyType';

  constructor(
    private httpClientService: HttpClientService
  ) { }


  getAll(occupancyID?: number) {
    let occupancyParam = occupancyID ? `?occupancyID=${occupancyID}` : '';
    let url = `${this.controllerName}${occupancyParam}`;
    return this.httpClientService.get(url);
  }

  getById(fileMasterId) {
    let url = this.controllerName + '/getById/' + fileMasterId;;
    return this.httpClientService.get(url);
  }
}
