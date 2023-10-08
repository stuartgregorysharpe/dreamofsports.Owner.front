import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CAuthService } from '../auth.service';

// check the fact of authentication
@Injectable()
export class CAuthGuard {    
    constructor (
        private authService: CAuthService,
        private router: Router,
    ) { }
    
    public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {        
        if (this.authService.authData !== null) {
            return true;
        } else {
            this.router.navigateByUrl ("/auth/login");
            return false;
        }        
    }    
}
