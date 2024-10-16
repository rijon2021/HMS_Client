import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthUser } from '../models/auth.models';
import { HttpClientService } from './http-client.service';


@Injectable({ providedIn: 'root' })
export class AuthfakeauthenticationService {
    private currentUserSubject: BehaviorSubject<AuthUser>;
    public currentUser: Observable<AuthUser>;

    constructor(
        private httpClientService: HttpClientService
    ) {
        // this.currentUserSubject = new BehaviorSubject<AuthUser>(JSON.parse(localStorage.getItem('currentUser')));
        // this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): AuthUser {
        return this.currentUserSubject.value;
    }

    login(obj: any): Observable<any> {
        let url = 'Authenticate/authenticate';
        return this.httpClientService.postJson(url, obj);
    }

    logout() {
        // remove user from local storage to log user out
        // localStorage.removeItem('currentUser');
        // this.currentUserSubject.next(null);
    }
}
