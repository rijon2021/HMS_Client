// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { LocalStorageService } from '../services/localstorage/localstorage.service';


// @Injectable()
// export class HttpHelperService {
//   static numberOfRequest = 0;
//   // private baseUrl = 'https://localhost:44383/';
//   //private baseUrl = 'http://10.1.0.12:8077/';

//   baseUrl: string = '';
//   constructor(
//     private httpClient: HttpClient,
//     private router: Router,
//     private localStorageService: LocalStorageService,
//     // private loadingSpinner: Loader
//   ) {
//     this.getbaseURL();
//   }

//   getbaseURL() {
//     const Ui_origin = window.location.origin;
//     let api_endpoint = '';
//     let pic_endpoint = '';
//     switch (Ui_origin) {
//       case 'http://localhost:4200': //for local development
//         api_endpoint = 'http://localhost:56006/';
//         break;
//       default:
//         break;
//     }
//     this.baseUrl = api_endpoint;
//   }

//   // public hideLoader() {
//   //   HttpHelper.numberOfRequest = 0;
//   //   this.loadingSpinner.hide();
//   // }

//   postHelper(url: string, obj: [], pageIndex = 0, pageSize = 0, sortBy = '', sortOrder = '', filterBy = ''): Observable<any> {
//     url = this.baseUrl + url;
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
//     return this.httpClient.post(url, obj, { headers: headers }).pipe(map(
//       value => {


//         localStorage.setItem('currentUser', JSON.stringify(value));
//         return value;
//       },
//     ));
//   }
//   // postFileHelper(url, obj, pageIndex?, pageSize?, sortBy?, sortOrder?, filterBy?): Observable<any> {
//   //   url = this.baseUrl + url;
//   //   HttpHelper.numberOfRequest++;
//   //   console.log(url);
//   //   if (HttpHelper.numberOfRequest === 1) {
//   //     this.loadingSpinner.show();
//   //   }
//   //   this.requestMessage.requestObj = obj;
//   //   this.requestMessage.branchID = 1;
//   //   this.requestMessage.Token = this.localStorageService.get('token');
//   //   this.requestMessage.OrganizationID = this.localStorageService.get('organizationID') != null ? parseInt(this.localStorageService.get('organizationID')) : 0;
//   //   this.requestMessage.pageIndex = pageIndex;
//   //   this.requestMessage.pageSize = pageSize;
//   //   this.requestMessage.sortBy = sortBy;
//   //   this.requestMessage.sortOrder = sortOrder;
//   //   this.requestMessage.filterBy = filterBy;
//   //   //alert(this.localStorageService.get("token"));

//   //   console.log('----------------Requested Object----------------------------');
//   //   console.log(JSON.stringify(this.requestMessage, null, 2));
//   //   console.log('----------------Requested Object----------------------------');

//   //   // const headers = new Headers({'Content-Type': 'application/json'});
//   //   //
//   //   // const options = new RequestOptions({headers: headers, params: JSON.stringify(this.requestMessage)});
//   //   const httpOptions = {
//   //     responseType: 'blob' as 'json',
//   //     headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
//   //   };
//   //   const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

//   //   return this.httpClient.post(url, JSON.stringify(this.requestMessage), httpOptions).pipe(map(
//   //     value => {

//   //       // console.log('----------------Response Object----------------------------');
//   //       //  console.log(JSON.stringify(value, null, 2));
//   //       // console.log('----------------Response Object----------------------------');
//   //       return value;
//   //     },
//   //     error => {
//   //       alert('error');
//   //     },
//   //   )).catch(this.handleError.bind(this)).pipe(finalize(() => {
//   //     HttpHelper.numberOfRequest--;
//   //     if (HttpHelper.numberOfRequest === 0) {
//   //       this.loadingSpinner.hide();
//   //     }
//   //   }));
//   // }

//   // postHelperWithoutLoading(url: string, obj: any): Observable<any> {
//   //   url = this.baseUrl + url;
//   //   console.log(url);

//   //   this.requestMessage.requestObj = obj;
//   //   this.requestMessage.branchID = 1;
//   //   // this.requestMessage.Token = this.localStorageService.get('token');
//   //   this.requestMessage.pageIndex = 1;
//   //   this.requestMessage.pageSize = 0;
//   //   const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

//   //   return this.httpClient.post(url, JSON.stringify(this.requestMessage), { headers: headers }).pipe(map(
//   //     value => {

//   //       // console.log('----------------Response Object----------------------------');
//   //       //  console.log(JSON.stringify(value, null, 2));
//   //       // console.log('----------------Response Object----------------------------');
//   //       return value;
//   //     },
//   //     // error => {
//   //     //   alert('error');
//   //     // },
//   //   )).pipe(finalize(() => {

//   //   }));
//   // }

//   // handleError(error: any) {
//   //   console.log(error);
//   //   let errMsg = (error.message) ? error.message :
//   //     error.status ? `${error.status} - ${error.statusText}` : 'Server error';
//   //   if (HttpHelperService.numberOfRequest == 1) {
//   //     if (error.status == 401) {
//   //       // this.messageHelper.showMessage(1000, "Session Timeout. Please Log in Again");
//   //       this.localStorageService.clear();
//   //       this.router.navigate(['/account/login']);
//   //     } else if (error.message == 'Timeout has occurred') {
//   //       // this.messageHelper.showMessage(1000, "response time out");
//   //     } else {
//   //       // this.messageHelper.showMessage(1000, "error connection");
//   //     }
//   //   }
//   //   return throwError(errMsg);
//   // }


//   // getHelper(url): Observable<any> {
//   //   HttpHelper.numberOfRequest++;
//   //   console.log(url);
//   //   if (HttpHelper.numberOfRequest === 1) {
//   //     this.loadingSpinner.show();
//   //   }

//   //   return this.httpClient.get(url).pipe(map(
//   //     value => {
//   //       this.loadingSpinner.hide();
//   //       return value;

//   //     },
//   //     function (error) {
//   //       alert('error');
//   //     },
//   //   )).catch(this.handleError.bind(this)).pipe(finalize(() => {
//   //     HttpHelper.numberOfRequest--;
//   //     if (HttpHelper.numberOfRequest === 0) {
//   //       this.loadingSpinner.hide();
//   //     }
//   //   }));
//   // }

// }
