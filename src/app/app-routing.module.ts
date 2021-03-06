import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    // { path: 'dashboard', canActivate: [AuthGuard, AdminGuard], loadChildren: './admin/admin.module#AdminModule' },
    { path: 'dashboard', canActivate: [AuthGuard], loadChildren: './user/user.module#UserModule' },
    { path: '', loadChildren: './home/home.module#HomeModule' },
    // { path: 'login', loadChildren: './home/home.module#HomeModule' },
    // { path: 'home', component: AppComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})
export class AppRoutingModule { }
