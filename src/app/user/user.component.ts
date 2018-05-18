import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    user;

    @Output('currentRoute') curRoute: Promise<string>;

    constructor(private auth: AuthService, private router: Router) {
        // console.log(this.auth.currentUser)
        this.user = this.auth.currentUser.displayName;
        // console.log(this.auth.currentUser.displayName)

        this.router.events.forEach((event) => {
            if (event instanceof NavigationEnd) {
                this.curRoute = new Promise(resolve => {
                    resolve(event.url.replace('/', ''))
                });
            }
        })
    }

    ngOnInit() {
    }

}
