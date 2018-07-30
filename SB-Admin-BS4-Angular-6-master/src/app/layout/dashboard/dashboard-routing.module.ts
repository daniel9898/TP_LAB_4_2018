import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ReservListComponent } from './reserv-list/reserv-list.component';
import { RouterComponent } from './router/router.component';
import { ListComponent } from '../../shared/modules/list/list.component';
import { DetailsComponent } from '../../shared/modules/details/details.component';

const routes: Routes = [
    {
        path: '', component: RouterComponent,
        children: [
            { path: 'reserv', component: DashboardComponent },
            { path: 'myreservs', component: ReservListComponent },
            { path: 'assign', component: ListComponent },
            { path: 'assignments', component: ListComponent },
            { path: 'trips', component: ListComponent },
            { path: 'history/client', component: ListComponent },
            { path: 'history/driver', component: ListComponent },
            { path: 'view/assign', component: DetailsComponent },
            { path: 'view/assignments', component: DetailsComponent },
            { path: 'view/trips', component: DetailsComponent },
            { path: 'view/details', component: DetailsComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
