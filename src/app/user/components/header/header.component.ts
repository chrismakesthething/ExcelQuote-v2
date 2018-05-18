import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { RouterStateSnapshot } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    title: string;
    @Input('currentRoute') currentRoute;

    constructor(private Auth: AuthService) {
        // console.log(this.currentRoute)        
    }

    ngOnInit() {
        this.currentRoute.then(res => this.title = res)
    }

    logout() {
        this.Auth.signOut()
    }

}
