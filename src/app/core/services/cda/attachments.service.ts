import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';


@Injectable()
export class AttachmentsService {
  private controllerName = 'Attachments';
  constructor(
    private httpClientService: HttpClientService
  ) { }

  getAttachmentListByFileID(id: number) {
    let url = this.controllerName + '/getAttachmentListByFileID/' + id;
    return this.httpClientService.get(url);
  }
}
