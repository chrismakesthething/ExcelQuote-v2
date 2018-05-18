import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable(
    // providedIn: 'root'
)
export class AuthGuard implements CanActivate {

    constructor(private Auth: AuthService, private router: Router, private afAuth: AngularFireAuth){}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this.Auth.checkUserState().then(res => res );
    }
}
