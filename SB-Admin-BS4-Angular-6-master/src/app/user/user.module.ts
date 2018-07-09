import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ListComponent } from './list/list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { LayoutModule } from '../layout/layout.module';
import { PageHeaderModule } from '../shared/modules/page-header/page-header.module';
import { BsComponentModule } from '../layout/bs-component/bs-component.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        LayoutModule,
        PageHeaderModule,
        BsComponentModule, 
        NgbAlertModule.forRoot(),
        NgbModule.forRoot()
    ],
    declarations: [
        UserComponent,
        AddUserComponent,
        ListComponent
    ],
    //exports: [CarComponent,AddCarComponent,ListComponent]
})
export class UserModule {}
