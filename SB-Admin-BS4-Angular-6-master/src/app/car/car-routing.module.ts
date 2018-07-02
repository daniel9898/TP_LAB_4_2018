import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarComponent } from './car.component';
import { ListComponent } from './list/list.component';
import { AddCarComponent } from './add-car/add-car.component';

const routes: Routes = [
    {
        path: '', component: CarComponent,
        children: [
            { path: 'add', component: AddCarComponent },
            { path: 'list', component: ListComponent},
    
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarRoutingModule {}
