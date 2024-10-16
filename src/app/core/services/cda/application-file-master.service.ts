import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';
import { ApplicationType, InspectionFileType } from '../../enums/globalEnum';


@Injectable()
export class ApplicationFileMasterService {
  private controllerName = 'applicationFileMaster';


  constructor(
    private httpClientService: HttpClientService
  ) { }

  getInitialData(id: number) {
    let url = this.controllerName + '/getInitialData/' + id;
    return this.httpClientService.get(url);
  }

  getAll() {
    let url = this.controllerName;
    return this.httpClientService.get(url);
  }

  getByID(fileID: number) {
    let url = this.controllerName + '/getByID/' + fileID;
    return this.httpClientService.get(url);
  }

  getByIDWithDetails(fileID: number) {
    let url = this.controllerName + '/getByIDWithDetails/' + fileID;
    return this.httpClientService.get(url);
  }

  getListByType(type: ApplicationType, inspectionFileType?: InspectionFileType, isVisited?: boolean) {
    let inspectionFileTypePart = inspectionFileType ? `/${inspectionFileType}` : '',
      isVisitedPart = isVisited ? `/${isVisited}` : '';

    let url = `${this.controllerName}/getListByType/${type}${inspectionFileTypePart}${isVisitedPart}`;
    return this.httpClientService.get(url);
  }

  getByRefNo(refNo: string) {
    let url = this.controllerName + '/getByRefNo/' + refNo;
    return this.httpClientService.get(url);
  }

  getListByRefNo(refNo: string) {
    let url = this.controllerName + '/getListByRefNo/' + refNo;
    return this.httpClientService.get(url);
  }

  getByRefWithDetails(fileRef: string) {
    let url = `${this.controllerName}/getByRefWithDetails`;
    return this.httpClientService.postForm(url, `refNo=${fileRef}`);
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

  migrateData(obj) {
    let url = this.controllerName + '/migrateData';
    return this.httpClientService.postJson(url, obj);
  }
  migrateFilesDetailsData(obj) {
    let url = this.controllerName + '/migrateFilesDetailsData';
    return this.httpClientService.postJson(url, obj);
  }
  migrateProcessData(obj) {
    let url = this.controllerName + '/migrateProcessData';
    return this.httpClientService.postJson(url, obj);
  }

  getFileListByApplicationType(obj) {
    let url = this.controllerName + '/getFileListByApplicationType';
    return this.httpClientService.postJson(url, obj);
  }
  getFileDetailsListByApplicationType(obj) {
    let url = this.controllerName + '/getFileDetailsListByApplicationType';
    return this.httpClientService.postJson(url, obj);
  }

  getAllCDABCCaseFileDetailsList(obj) {
    let url = this.controllerName + '/getAllCDABCCaseFileDetailsList';
    return this.httpClientService.postJson(url, obj);
  }
  getAllCDABCCaseFileListByApplicationTypeID(obj) {
    let url = this.controllerName + '/getAllCDABCCaseFileListByApplicationTypeID';
    return this.httpClientService.postJson(url, obj);
  }
  getLUCFileDetailsByApplicationTypeID(obj) {
    let url = this.controllerName + '/getLUCFileDetailsByApplicationTypeID';
    return this.httpClientService.postJson(url, obj);
  }
}
