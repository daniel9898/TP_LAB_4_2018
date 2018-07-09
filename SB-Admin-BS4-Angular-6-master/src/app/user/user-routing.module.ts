import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { ListComponent } from './list/list.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
    {
        path: '', component: UserComponent,
        children: [
            { path: 'add', component: AddUserComponent },
            { path: 'list', component: ListComponent},
    
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}
