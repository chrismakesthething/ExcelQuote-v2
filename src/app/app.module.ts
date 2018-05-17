import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthService } from './core/services/auth.service';
// import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { config } from './firebaseconfig';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent
        // HomeComponent,
        // MainComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(config),
        AngularFireAuthModule,
        AngularFireDatabaseModule
    ],
    // exports: [
    //     FormsModule,
    //     ReactiveFormsModule
    // ],
    providers: [
        AuthGuard,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
