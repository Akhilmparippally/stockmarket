import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SharedDataService } from '../shared/share.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        public jwtHelper: JwtHelperService,
        public _shared: SharedDataService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('Auth checking');
        const token = localStorage.getItem("#token#");
        if (token != null) {
            // authorised so return true
            if(this.jwtHelper.isTokenExpired(token))
            {
                this.logout();
                return false;
            }
            else {
            this._shared.changeLoginstatus(true);
            return true
            }
        }

        // not logged in so redirect to login page with the return url
        this.logout();
        return false;
    }
    logout(){
        localStorage.clear();
        this._shared.changeLoginstatus(false);
        this.router.navigate(['../login']);
        }
}