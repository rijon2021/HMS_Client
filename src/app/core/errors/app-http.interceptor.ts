import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GetAccessToken } from '../models/localstorage-item';
import { LocalStorageService } from '../services/localstorage/localstorage.service';
import { SweetAlertService, SweetAlertEnum } from '../helpers/sweet-alert.service';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class AppHttpInterceptor implements HttpInterceptor {
    static errorStatuses = [0, 401, 4.3, 409, 500];

    constructor(private router: Router, private localStorageService: LocalStorageService, private swal: SweetAlertService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // get and show loader
        let loader = document.getElementById('pageLoaderID');
        loader.classList.add('loader-show');

        // if not login endpoint
        if (request.url.indexOf('Authenticate/authenticate') === -1) {
            // set content type and authorization header
            let token = GetAccessToken();
            if (token) {
                request = request.clone({
                    setHeaders: {
                        'Content-Type': request.headers.get('Content-Type') || 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    reportProgress: true,
                });
            }
            else {
                this.goToLogin(loader);
                return throwError('Please login first.');
            }
        }

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                // service stopped, unauthorized, forbidden, conflict or internal server error
                if (AppHttpInterceptor.errorStatuses.includes(error.status)) {
                    if (error.status === 409) {
                        this.swal.message(`${error.statusText} - ${error.error?.error}`, SweetAlertEnum.error);
                    } else {
                        this.swal.message(error.statusText, SweetAlertEnum.error);
                    }

                    if (!environment.production) {
                        let errorMsg = error.error?.error || error.message, stackTrace = `\n${error.error?.stackTrace ?? ''}`;
                        console.error(`${errorMsg}${stackTrace}`);
                    }

                    if (error.status === 401) this.goToLogin(loader);

                    return of(error);
                } else return throwError(error);    // pass the error to the caller of the function
            }),
            finalize(() => {
                // hide loader
                loader.classList.remove('loader-show');
            })
        ) as Observable<HttpEvent<any>>;
    }

    goToLogin(loader: HTMLElement) {
        // clear local storage
        this.localStorageService.clearAllLocalStorageKeyAndValue();
        // hide loader
        loader.classList.remove('loader-show');
        // redirect to login page
        this.router.navigate(['/account/login'], {
            queryParams: {
                returnUrl: this.router.routerState.snapshot.url
            }
        });
    }
}
