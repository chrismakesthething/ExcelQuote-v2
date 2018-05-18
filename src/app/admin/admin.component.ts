import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    user;

    @Output('currentRoute') curRoute;

    constructor(private auth: AuthService, private router: Router) {
        // console.log(this.auth.currentUser)
        this.user = this.auth.currentUser.displayName;
        // console.log(this.auth.currentUser.displayName)

        this.router.events.forEach((event) => {
            if (event instanceof NavigationEnd) {
                this.curRoute = event.url.replace('/', '');
            }
        })
    }

    ngOnInit() {
    }

}
