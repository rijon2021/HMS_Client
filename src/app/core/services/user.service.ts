import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUser } from '../models/auth.models';


@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<AuthUser[]>(`/api/login`);
    }

    register(user: AuthUser) {
        return this.http.post(`/users/register`, user);
    }
}
