import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule,
    ],
    declarations: [
        UserComponent,
        HeaderComponent
    ]
})
export class UserModule { }
