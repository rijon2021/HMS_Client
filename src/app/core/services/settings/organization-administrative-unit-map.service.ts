import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';

@Injectable()
export class OrganizationAdministrativeUnitMapService {
  private controllerName = 'organizationAdministrativeUnitMap';
  constructor(
    private httpClientService: HttpClientService
  ) { }
  getInitialData() {
    let url = this.controllerName + '/getInitialData';
    return this.httpClientService.get(url);
  }
  getAllAdministrativeUnitList() {
    let url = this.controllerName + '/getAllAdministrativeUnitList';
    return this.httpClientService.get(url);
  }
  saveOrganizationCountryMap(obj) {
    let url = this.controllerName + '/saveOrganizationCountryMap/';
    return this.httpClientService.postJson(url, obj);
  }
  saveOrganizationDivisionMap(obj) {
    let url = this.controllerName + '/saveOrganizationDivisionMap/';
    return this.httpClientService.postJson(url, obj);
  }
  saveOrganizationDistrictMap(obj) {
    let url = this.controllerName + '/saveOrganizationDistrictMap/';
    return this.httpClientService.postJson(url, obj);
  }
  saveOrganizationUpazilaCityCorporationMap(obj) {
    let url = this.controllerName + '/saveOrganizationUpazilaCityCorporationMap/';
    return this.httpClientService.postJson(url, obj);
  }
  saveOrganizationThanaMap(obj) {
    let url = this.controllerName + '/saveOrganizationThanaMap/';
    return this.httpClientService.postJson(url, obj);
  }





  saveOrganizationUnionWardMap(obj) {
    let url = this.controllerName + '/saveOrganizationUnionWardMap/';
    return this.httpClientService.postJson(url, obj);
  }
  saveOrganizationVillageAreaMap(obj) {     
    let url = this.controllerName + '/saveOrganizationVillageAreaMap/';
    return this.httpClientService.postJson(url, obj);
  }
  saveOrganizationParaMap(obj) {
    let url = this.controllerName + '/saveOrganizationParaMap/';
    return this.httpClientService.postJson(url, obj);
  }
}
