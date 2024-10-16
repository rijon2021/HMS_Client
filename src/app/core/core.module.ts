// import { ErrorHandler, NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { GlobalErrorHandler } from './errors/global-error-handler';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { SweetAlertService } from './helpers/sweet-alert.service';
// import { HttpLoadingInterceptor } from './errors/http-loading.interceptor';

// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ],
//   providers:[
//     {
//       // processes all errors
//       provide: ErrorHandler,
//       useClass: GlobalErrorHandler,
//     },
//     {
//       // interceptor to show loading spinner
//       provide: HTTP_INTERCEPTORS,
//       useClass: HttpLoadingInterceptor,
//       multi: true,
//     },
//   ]
// })
// export class CoreModule { }
