import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    constructor(private Auth: AuthService, private Route: Router) { }

    model: object = {
        email: null,
        password: null,
        displayName: null
    };

    ngOnInit() {
    }

    signUp(form: HTMLFormElement) {
        let credentials = [];
        Array.from(form.children).forEach(element => {
            if (element.children[0] as HTMLInputElement) {
                let val = (element.children[0] as HTMLInputElement).value;
                credentials.push(val)
            }
        });
        this.Auth.emailSignUp(credentials[0], credentials[1], credentials[2])
            .then(() => {
                this.Route.navigate(['dashboard'])
            })
            .catch((err) => {
                console.log(err)
            });
    }

}
