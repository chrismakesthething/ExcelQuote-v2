import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private Auth: AuthService, private Route: Router) { }

    model: object = {
        email: null,
        password: null
    };

    ngOnInit() {
    }

    emailLogin(form: HTMLFormElement) {
        let credentials: string[] = [];
        Array.from(form.children).forEach(element => {
            if (element.children[0] as HTMLInputElement) {
                let val = (element.children[0] as HTMLInputElement).value;
                credentials.push(val)
            }
        });
        this.Auth.emailLogin(credentials[0], credentials[1])
            // .then(() => {
            //     // let foo = null;
            //     // foo = async () => {
            //         this.Route.navigate(['../', 'dashboard'])
            //     // };
            // })
            // .catch((error) => {
            //     console.log(error)
            // });
    }

}
