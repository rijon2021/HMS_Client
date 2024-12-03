import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
// import { RequestMessage } from '../models/requestMessage';


@Injectable({ providedIn: 'root' })
export class HttpCommunicationService {
//   private requestMessage: RequestMessage = new RequestMessage();
  public BASE_URL: string;
//   token: string;
//   headers;

  constructor(private http: HttpClient) {
    this.BASE_URL = environment.baseUrl;
  }

  get(url: string) {
    return this.http.get(this.BASE_URL + url);
  }

  postJson(url: string, data: any) {
    // this.requestMessage.RequestObj = data;
    return this.http.post(this.BASE_URL + url, data);
  }

  postForm(url: string, data: any) {
    return this.http.post(this.BASE_URL + url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  putJson(url: string, data: any) {
    // this.requestMessage.RequestObj = data;
    return this.http.put(this.BASE_URL + url, data);
  }

  delete(url: string) {
    return this.http.delete(this.BASE_URL + url);
  }

}
