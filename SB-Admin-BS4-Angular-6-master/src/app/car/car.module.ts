import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CarRoutingModule } from './car-routing.module';
import { CarComponent } from './car.component';
import { ListComponent } from './list/list.component';
import { AddCarComponent } from './add-car/add-car.component';
import { LayoutModule } from '../layout/layout.module';
import { PageHeaderModule } from '../shared/modules/page-header/page-header.module';
import { BsComponentModule } from '../layout/bs-component/bs-component.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    imports: [
        CommonModule,
        CarRoutingModule,
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
        CarComponent,
        AddCarComponent,
        ListComponent
    ],
    //exports: [CarComponent,AddCarComponent,ListComponent]
})
export class CarModule {}
