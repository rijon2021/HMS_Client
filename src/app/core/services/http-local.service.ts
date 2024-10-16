// import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { environment } from 'src/environments/environment';
// import { GetAccessToken } from '../models/localstorage-item';
// import { LocalStorageService } from './localstorage/localstorage.service';

// @Injectable({
//   providedIn: 'root'
// })

// export class HttpLocalService {
//   public BASE_URL: string;

//   token: string | undefined;
//   headers:any;
//   constructor(
  
//     public http: HttpClient,
//     private router: Router,
//     private localStorageService: LocalStorageService
//   ) {
//     this.BASE_URL = environment.base_url;
    
//     this.setTokenAndHeader();
    
//   }

//   setToken() {
//     let user = GetAccessToken()
//     if (user) {
//       try {
//         this.token = user.access_token;
//       }
//       catch (error) {
//         this.localStorageService.clearAllLocalStorageKeyAndValue();
//         this.router.navigate(['/account/login']);
//       }
//     } else {
//       this.localStorageService.clearAllLocalStorageKeyAndValue();
//       this.router.navigate(['/account/login']);
//     }
//   }

//   setTokenAndHeader() {
//     let user = GetAccessToken()
//     if (user) {
//       try {
//         this.token = user.access_token;
//         this.createAuthorizationHeaders();
//       }
//       catch (error) {
//         this.localStorageService.clearAllLocalStorageKeyAndValue();
//         this.router.navigate(['/account/login']);
//       }
//     }
//   }

//   createAuthorizationHeaders() {
//     let headers = new HttpHeaders();
//     headers.append("Authorization", "bearer " + this.token);
//     this.headers = { headers };
//   }

//   appendAuthorizationHeader(headers: HttpHeaders) {
//     this.setToken();
//     headers.append("Authorization", "bearer " + this.token);
//     return headers;
//   }

//   get(url: string) {
//     return this.http.get(this.BASE_URL + url, this.getHeaders());
//   }



//   post(url: string, data: any) {
//     // return this.http.post(this.BASE_URL + url, data, this.headers);
//     return this.http.post(this.BASE_URL + url + "?", data, this.getHeaders());
//   }
//   postJson(url: string, data: any, token = "") {
//     return this.http.post(this.BASE_URL + url + "?", data, this.getHeaders());
//   }

//   put(url: string, data: any) {
//     return this.http.put(this.BASE_URL + url, data, this.getHeaders());
//   }

//   delete(url: string, data?: any) {
//     const options = {
//       ...this.getHeaders(),
//       body: data
//     }
//     return this.http.delete(this.BASE_URL + url, options);
//   }

//   getHeaders() {
//     this.setToken();
//     const headers = new HttpHeaders({
//       "Content-Type": "application/json",
//       "Authorization": "bearer " + this.token,
//     });

//     return {
//       headers: headers,
//       reportProgress: true
//     };
//   }


//   getFile(url: string) {
//     this.setToken();
//     const httpOptions = {
//       responseType: 'blob' as 'json',
//       headers: new HttpHeaders({
//         "Content-Type": "application/json",
//         "Authorization": "bearer " + this.token,
//       })
//     };
//     return this.http.get(this.BASE_URL + url, httpOptions);
//   }
//   postFile(url: string, data: any, token = "") {
//     const req = new HttpRequest('POST', this.BASE_URL + url, data, this.getFileHeaders());
//     return this.http.request(req);
//   }
//   getFileHeaders() {
//     this.setToken();
//     const headers = new HttpHeaders({
//       "Authorization": "bearer " + this.token
//     });

//     return {
//       headers: headers,
//       reportProgress: true,
//       observe: 'events'
//     };
//   }
//   get BaseUrl() {
//     return this.BASE_URL;
//   }
//   /**
//    * T is the Response model 
//    * @param url 
//    * @returns T
//    */
//   getT<T>(url: string) {
//     return this.http.get<T>(this.BASE_URL + url, this.getHeaders());
//   }
//   /**
//    * T is the POST model 
//    * @param url 
//    * @param data 
//    * @returns any
//    */
//   postJsonT<T>(url: string, data: T) {
//     return this.http.post<any>(this.BASE_URL + url + "?", data, this.getHeaders());
//   }
//   /**
//    * R is the Response model 
//    * @param url 
//    * @param data 
//    * @returns R
//    */
//   postJsonR<R>(url: string, data: any) {
//     return this.http.post<R>(this.BASE_URL + url + "?", data, this.getHeaders());
//   }
//   /**
//    * T is the POST model 
//    * 
//    * R is the Response model
//    * @param url 
//    * @param data 
//    * @returns R
//    */
//   postJsonTR<T, R>(url: string, data: T) {
//     return this.http.post<R>(this.BASE_URL + url + "?", data, this.getHeaders());
//   }
//   putT<T>(url: string, data: any) {
//     return this.http.put<T>(this.BASE_URL + url, data, this.getHeaders());
//   }
//   deleteT<T>(url: string, data?: any) {
//     const options = {
//       ...this.getHeaders(),
//       body: data
//     }
//     return this.http.delete<T>(this.BASE_URL + url, options);
//   }

 
// }
