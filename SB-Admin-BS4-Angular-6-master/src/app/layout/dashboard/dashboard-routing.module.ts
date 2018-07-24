import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ReservListComponent } from './reserv-list/reserv-list.component';
import { RouterComponent } from './router/router.component';

const routes: Routes = [
    {
        path: '', component: RouterComponent,
        children: [
            { path: 'reserv', component: DashboardComponent },
            { path: 'mytrips', component: ReservListComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
