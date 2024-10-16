import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { RequestMessage } from '../models/requestMessage';


@Injectable({ providedIn: 'root' })
export class HttpClientService {
  private requestMessage: RequestMessage = new RequestMessage();
  public BASE_URL: string;
  token: string;
  headers;

  constructor(private http: HttpClient) {
    this.BASE_URL = environment.baseUrl;
  }

  get(url: string) {
    return this.http.get(this.BASE_URL + url);
  }

  postJson(url: string, data: any) {
    this.requestMessage.RequestObj = data;
    return this.http.post(this.BASE_URL + url, this.requestMessage);
  }

  postForm(url: string, data: any) {
    return this.http.post(this.BASE_URL + url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  putJson(url: string, data: any) {
    this.requestMessage.RequestObj = data;
    return this.http.put(this.BASE_URL + url, this.requestMessage);
  }

  delete(url: string) {
    return this.http.delete(this.BASE_URL + url);
  }

  // post(url: string, data: any) {
  //   return this.http.post(this.BASE_URL + url, data);
  // }

  // setToken() {
  //   let user = GetAccessToken()
  //   if (user) {
  //     try {
  //       this.token = user.access_token;
  //     }
  //     catch (error) {
  //       this.localStorageService.clearAllLocalStorageKeyAndValue();
  //       this.router.navigate(['/account/login']);
  //     }
  //   } else {
  //     this.localStorageService.clearAllLocalStorageKeyAndValue();
  //     this.router.navigate(['/account/login']);
  //   }
  // }

  // setTokenAndHeader() {
  //   this.token = GetAccessToken()
  //   if (!this.token) {
  //     this.localStorageService.clearAllLocalStorageKeyAndValue();
  //     this.router.navigate(['/account/login']);
  //   }
  // }

  // getHeaders() {
  //   this.setToken();
  //   const headers = new HttpHeaders({
  //     "Content-Type": "application/json",
  //     "Authorization": "bearer " + this.token,
  //   });

  //   return {
  //     headers: headers,
  //     reportProgress: true
  //   };
  // }

  // put(url: string, data: any) {
  //   return this.http.put(this.BASE_URL + url, data, this.getHeaders());
  // }

  // createAuthorizationHeaders() {
  //   let headers = new HttpHeaders();
  //   headers.append("Authorization", "bearer " + this.token);
  //   this.headers = { headers };
  // }

  // appendAuthorizationHeader(headers: HttpHeaders) {
  //   this.setToken();
  //   headers.append("Authorization", "bearer " + this.token);
  //   return headers;
  // }

  // postToAuth(url: string, data: any) {
  //   return this.http.post(this.BASE_URL + url + "?", data, this.getHeaders());
  // }

  // getFile(url: string) {
  //   this.setToken();
  //   const httpOptions = {
  //     responseType: 'blob' as 'json',
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json",
  //       "Authorization": "bearer " + this.token,
  //     })
  //   };

  //   return this.http.get(this.BASE_URL + url, httpOptions);
  // }

  // postFile(url: string, data: any, token = "") {
  //   const req = new HttpRequest('POST', this.BASE_URL + url, data, this.getFileHeaders());
  //   return this.http.request(req);
  // }

  // getFileHeaders() {
  //   this.setToken();
  //   const headers = new HttpHeaders({
  //     "Authorization": "bearer " + this.token
  //   });

  //   return {
  //     headers: headers,
  //     reportProgress: true,
  //     observe: 'events'
  //   };
  // }

  // get BaseUrl() {
  //   return this.BASE_URL;
  // }

  // /**
  //  * T is the Response model 
  //  * @param url 
  //  * @returns T
  //  */
  // getT<T>(url: string) {
  //   return this.http.get<T>(this.BASE_URL + url, this.getHeaders());
  // }

  // /**
  //  * T is the POST model 
  //  * @param url 
  //  * @param data 
  //  * @returns any
  //  */
  // postJsonT<T>(url: string, data: T) {
  //   return this.http.post<any>(this.BASE_URL + url + "?", data, this.getHeaders());
  // }

  // /**
  //  * R is the Response model 
  //  * @param url 
  //  * @param data 
  //  * @returns R
  //  */
  // postJsonR<R>(url: string, data: any) {
  //   return this.http.post<R>(this.BASE_URL + url + "?", data, this.getHeaders());
  // }

  // /**
  //  * T is the POST model 
  //  * 
  //  * R is the Response model
  //  * @param url 
  //  * @param data 
  //  * @returns R
  //  */
  // postJsonTR<T, R>(url: string, data: T) {
  //   return this.http.post<R>(this.BASE_URL + url + "?", data, this.getHeaders());
  // }

  // putT<T>(url: string, data: any) {
  //   return this.http.put<T>(this.BASE_URL + url, data, this.getHeaders());
  // }

  // deleteT<T>(url: string, data?: any) {
  //   const options = {
  //     ...this.getHeaders(),
  //     body: data
  //   }
  //   return this.http.delete<T>(this.BASE_URL + url, options);
  // }

  /// --- http request with retry ---//
  // getWithRetry(url: string, delay: number = 1000, maxRetry: number = 3, backoff: number = 1000) {
  //   return this.http.get(this.BASE_URL + url, this.getHeaders()).pipe(
  //     retryBackoff(delay, maxRetry, backoff),
  //     catchError(error => {
  //       console.error(error);
  //       return EMPTY;
  //     }),
  //     shareReplay()
  //   );
  // }

  // postJsonWithRetry(url: string, data: any, delay: number = 1000, maxRetry: number = 3, backoff: number = 1000) {
  //   return this.http.post(this.BASE_URL + url + '?', data, this.getHeaders()).pipe(
  //     retryBackoff(delay, maxRetry, backoff),
  //     catchError(error => {
  //       console.error(error);
  //       return EMPTY;
  //     }),
  //     shareReplay()
  //   );
  // }

  // putWithRetry(url: string, data: any, delay: number = 1000, maxRetry: number = 3, backoff: number = 1000) {
  //   return this.http.put(this.BASE_URL + url, data, this.getHeaders()).pipe(
  //     retryBackoff(delay, maxRetry, backoff),
  //     catchError(error => {
  //       console.error(error);
  //       return EMPTY;
  //     }),
  //     shareReplay()
  //   );
  // }

  // deleteWithRetry(url: string, data?: any, delay: number = 1000, maxRetry: number = 3, backoff: number = 1000) {
  //   const options = {
  //     ...this.getHeaders(),
  //     body: data
  //   };
  //   return this.http.delete(this.BASE_URL + url, options).pipe(
  //     retryBackoff(delay, maxRetry, backoff),
  //     catchError(error => {
  //       console.error(error);
  //       return EMPTY;
  //     }),
  //     shareReplay()
  //   );
  // }
}
