import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CarRoutingModule } from './car-routing.module';
import { CarComponent } from './car.component';
import { ListComponent } from './list/list.component';
import { AddCarComponent } from './add-car/add-car.component';
import { LayoutModule } from '../layout/layout.module';
import { PageHeaderModule } from '../shared/modules/page-header/page-header.module';

@NgModule({
    imports: [
        CommonModule,
        CarRoutingModule,
        FormsModule,
        LayoutModule,
        PageHeaderModule,
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