import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/operator/switchMap';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable(
    // providedIn: 'root'
)

export class AuthService {

    private loggedInStatus = false;
    user$: Observable<User>;
    private authState: any = null;

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
        
        this.afAuth.authState.subscribe((auth) => {
            this.authState = auth
        });
    }

    // get isLoggedIn() {
    //     return this.loggedInStatus;
    // }

    // setLoggedIn(value: boolean) {
    //     this.loggedInStatus = value;
    // }

    // Returns true if user is logged in
    get authenticated(): boolean {
        return this.authState !== null;
    }

    // Returns current user data
    get currentUser(): any {
        return this.authenticated ? this.authState : null;
    }

    // Returns
    get currentUserObservable(): any {
        return this.afAuth.authState
    }

    // Returns current user UID
    get currentUserId(): string {
        return this.authenticated ? this.authState.uid : '';
    }

    // Anonymous User
    get currentUserAnonymous(): boolean {
        return this.authenticated ? this.authState.isAnonymous : false
    }

    // Returns current user display name or Guest
    get currentUserDisplayName(): string {
        if (!this.authState) { return 'Guest' }
        else if (this.currentUserAnonymous) { return 'Anonymous' }
        else { return this.authState['displayName'] || 'User without a Name' }
    }

    //// Social Auth ////
    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider()
        return this.socialSignIn(provider);
    }

    private socialSignIn(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((credential) => {
                this.authState = credential.user
                this.updateUserData()
            })
            .catch(error => console.log(error));
    }

    //// Anonymous Auth ////
    anonymousLogin() {
        return this.afAuth.auth.signInAnonymously()
            .then((user) => {
                this.authState = user
                this.updateUserData()
            })
            .catch(error => console.log(error));
    }

    //// Email/Password Auth ////
    emailSignUp(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                this.authState = user
                // this.updateUserData()
            })
            .catch(error => console.log(error));
    }

    emailLogin(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.authState = user
                this.updateUserData()
                console.log(this.router.url)
                this.router.navigate(['../', 'dashboard'])
            })
            .catch(error => {
                console.log(error)
                // return error;
            });
    }

    // Sends email allowing user to reset password
    resetPassword(email: string) {
        var auth = firebase.auth();

        return auth.sendPasswordResetEmail(email)
            .then(() => console.log("email sent"))
            .catch((error) => console.log(error))
    }

    //// Sign Out ////
    signOut(): void {
        this.afAuth.auth.signOut();
        this.router.navigate(['/'])
    }

    //// Helpers ////
    private updateUserData(): void {
        // Writes user name and email to realtime db
        // useful if your app displays information about users or for admin features
        let path = `users/${this.currentUserId}`; // Endpoint on firebase
        let data = {
            email: this.authState.email,
            name: this.authState.displayName
        }

        this.db.object(path).update(data)
            .catch(error => console.log(error));

    }
}
