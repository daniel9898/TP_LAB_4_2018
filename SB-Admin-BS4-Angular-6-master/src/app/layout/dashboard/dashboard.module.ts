import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { BsComponentModule } from '../bs-component/bs-component.module';
import { DashboardComponent } from './dashboard.component';
import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';
import { NguiMapModule} from '@ngui/map';
import {
    TimelineComponent,
    NotificationComponent,
    ChatComponent
} from './components';
import { StatModule } from '../../shared';
import { ReservListComponent } from './reserv-list/reserv-list.component';
import { RouterComponent } from './router/router.component';

@NgModule({
    imports: [
        CommonModule,
        PageHeaderModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        FormsModule,
        DashboardRoutingModule,
        StatModule,               //api de proyecto firebase danielpereirautn(plan pago por uso)
        NguiMapModule.forRoot( 
          {apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyCc7ie0QU50WYMpcrHz_U6Hn_DrxCFFvfo&libraries=places'}),
        BsComponentModule
    ],
    declarations: [
        DashboardComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent,
        ReservListComponent,
        RouterComponent
    ]
})
export class DashboardModule {}
