import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DetailsComponent } from './details.component';
import { PageHeaderModule } from '../page-header/page-header.module';
import { NguiMapModule } from '@ngui/map';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, PageHeaderModule, NguiMapModule],
    declarations: [DetailsComponent],
    exports: [DetailsComponent]
})
export class DetailsModule {}