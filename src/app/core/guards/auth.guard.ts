import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GetAccessToken, LOCALSTORAGE_KEY } from '../models/localstorage-item';
import { Permission } from '../models/settings/permission';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    private siteRoot: string = '/';
    private loginUrl: string = '/account/login';
    private isUrlAllowed: boolean = false;

    permissions: Permission[] = new Array<Permission>();

    constructor(private router: Router) { }

    canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let loginToken = GetAccessToken();
        if (loginToken) {
            let claimObj = JSON.parse(atob(loginToken.split('.')[1])),
                expiry = (claimObj?.exp ?? 0) * 1000;

            if (Date.now() > expiry) this.redirect(state);
            else if (state.url === this.siteRoot) this.isUrlAllowed = true;
            else {
                this.permissions = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY.PERMISSIONS));
                if (this.permissions && this.permissions.length > 0) {
                    let requestedUrlPermission = this.permissions.find(
                        mi =>
                            mi.routePath &&
                            mi.routePath.trim().length > 0 &&
                            state.url.indexOf(mi.routePath) !== -1
                    )

                    if (requestedUrlPermission) {
                        this.isUrlAllowed = true;
                    } else this.redirect(state, this.siteRoot);
                } else this.redirect(state, this.siteRoot);
            }
        } else this.redirect(state);

        return this.isUrlAllowed;
    }

    redirect(state: RouterStateSnapshot, url?: string) {
        if (url) {
            this.router.navigate([url]);
        } else {
            this.router.navigate([this.loginUrl], { queryParams: { returnUrl: state.url } });
        }
    }
}
