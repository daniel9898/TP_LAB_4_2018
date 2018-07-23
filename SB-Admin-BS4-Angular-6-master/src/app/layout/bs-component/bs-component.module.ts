import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsComponentRoutingModule } from './bs-component-routing.module';
import { BsComponentComponent } from './bs-component.component';
import { PageHeaderModule } from '../../shared';
import { NgxSpinnerModule } from 'ngx-spinner';

//PRIME NG
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule,SharedModule,PanelModule,DialogModule,ButtonModule} from 'primeng/primeng'; 

import {
    AlertComponent,
    ButtonsComponent,
    ModalComponent,
    ModalBajaUserComponent,
    CollapseComponent,
    DatePickerComponent,
    DropdownComponent,
    PaginationComponent,
    PopOverComponent,
    ProgressbarComponent,
    TabsComponent,
    RatingComponent,
    TooltipComponent,
    TimepickerComponent
} from './components';

import { ModalPreferenciasComponent } from './components/modal-preferencias/modal-preferencias.component';
import { ModalConfirmacionComponent } from './components/modal-confirmacion/modal-confirmacion.component';


@NgModule({
    imports: [
        CommonModule,
        BsComponentRoutingModule,
        FormsModule,
        NgxSpinnerModule,
        DataViewModule,
        DropdownModule,
        PanelModule,
        DialogModule,
        ButtonModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        PageHeaderModule
    ],
    declarations: [
        BsComponentComponent,
        ButtonsComponent,
        AlertComponent,
        ModalComponent,
        ModalBajaUserComponent,
        CollapseComponent,
        DatePickerComponent,
        DropdownComponent,
        PaginationComponent,
        PopOverComponent,
        ProgressbarComponent,
        TabsComponent,
        RatingComponent,
        TooltipComponent,
        TimepickerComponent,
        ModalPreferenciasComponent,
        ModalConfirmacionComponent
    ],
     exports: [ModalComponent,ModalBajaUserComponent,DatePickerComponent,TimepickerComponent,ModalPreferenciasComponent,ModalConfirmacionComponent]
})
export class BsComponentModule {}
