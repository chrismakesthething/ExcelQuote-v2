import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable(
    // providedIn: 'root'
)
export class AuthGuard implements CanActivate {

    constructor(private Auth: AuthService, private Router: Router){
        
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        // console.log()
        // let foo$ = this.Auth.currentUserObservable;
        // foo$.subscribe((res) => {console.log(res)})
        if (this.Auth.currentUser) {
            console.log('Your logged in');
            // console.log(this.Auth.currentUserObservable);
            // console.log(this.Auth.authenticated);
            return true;
        } else {
            console.log('Your not logged in');
            // console.log(this.Auth.currentUserObservable);
            this.Router.navigate(['/login']);
            return false;
        }
    }
}
