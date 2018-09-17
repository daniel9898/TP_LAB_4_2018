import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DetailsComponent } from './details.component';
import { PageHeaderModule } from '../page-header/page-header.module';
import { NguiMapModule } from '@ngui/map';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      PageHeaderModule,
      NguiMapModule,
      NgbAlertModule.forRoot()
    ],
    declarations: [DetailsComponent],
    exports: [DetailsComponent]
})
export class DetailsModule {}