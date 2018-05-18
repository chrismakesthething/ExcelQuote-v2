import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { User } from '../models/user';

@Injectable(
    // providedIn: 'root'
)

export class AuthService {

    private loggedInStatus = false;
    user$: Observable<User>;
    private authState: any = null;

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private afs: AngularFirestore, private router: Router) {
        
        this.afAuth.authState.subscribe((auth) => {
            this.authState = auth;
        });

        this.user$ = this.afAuth.authState
            .switchMap(user => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
                } else {
                    return Observable.of(null)
                }
            })
    }

    get isLoggedIn() {
        return this.loggedInStatus;
    }

    checkUserState(): Promise<any> {
        return new Promise((resolve) => {
            this.afAuth.auth.onAuthStateChanged((user) => {
                if (user) {
                    console.log('logged in')
                    resolve(true)
                } else {
                    console.log('not logged in')
                    this.navigateRouter('login')
                    resolve(false)
                }
            })
        })
    }

    navigateRouter(route: string) {
        this.router.navigate(['../', route]);
    }

    setLoggedIn(value: boolean) {
        this.loggedInStatus = value;
    }

    // Returns true if user is logged in
    get authenticated(): boolean {
        return this.authState !== null;
    }

    // Returns current user data
    get currentUser(): any {
        return this.authenticated ? this.authState : null;
    }

    // Returns current user data
    get currentUserRole(): any {
        // return this.authState.role === 'admin' ? true : false;
        console.log(this.afAuth.authState)
        return false
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
                // const authString = JSON.parse(this.authState);
                // window.localStorage.setItem('authState', authString);
                this.updateUserData(credential.user)
            })
            .catch(error => console.log(error));
    }

    //// Anonymous Auth ////
    anonymousLogin() {
        return this.afAuth.auth.signInAnonymously()
            .then((user) => {
                this.authState = user
                this.updateUserData(user)
            })
            .catch(error => console.log(error));
    }

    //// Email/Password Auth ////
    emailSignUp(displayName: string, email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                user.updateProfile({ displayName: displayName })
                .then(() => {
                    this.authState = user;
                    this.updateUserData(user);
                })
                .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    }
    
    emailLogin(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.authState = user
                // const authString = this.currentUserId;
                // window.localStorage.setItem('authState', authString);
                this.afAuth.auth.setPersistence('session');
                this.updateUserData(user)
                // console.log(this.router.url)
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
        const gThis = this;
        this.afAuth.auth.signOut().then(function () {
            // Sign-out successful.
            console.log("you've logged out")
            gThis.router.navigate(['../', 'login']);
        }).catch(function (error) {
            // An error happened.
            console.log(error);
        });
        // const authString = this.authState.toString();
        // window.localStorage.removeItem('authState');
    }

    //// Helpers ////
    private updateUserData(user): Promise<void> {
        // Writes user name and email to realtime db
        // useful if your app displays information about users or for admin features
        // let path = `users/${this.currentUserId}`; // Endpoint on firebase
        // let data = {
        //     email: this.authState.email,
        //     name: this.authState.displayName
        // }

        // this.db.object(path).update(data)
        //     .catch(error => console.log(error));
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

        const data: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            role: 'user'
        }

        return userRef.set(data, { merge: true })

    }
}
