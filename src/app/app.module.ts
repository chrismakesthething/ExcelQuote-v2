import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { HomeModule } from './home/home.module';
// import { HomeComponent } from './home/home.component';
// import { UserComponent } from './user/user.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthService } from './core/services/auth.service';
// import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { config } from './firebaseconfig';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent
        // MainComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(config),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFirestoreModule
    ],
    // exports: [
    //     FormsModule,
    //     ReactiveFormsModule
    // ],
    providers: [
        AuthGuard,
        AdminGuard,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
