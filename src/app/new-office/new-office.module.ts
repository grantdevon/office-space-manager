import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewOfficePageRoutingModule } from './new-office-routing.module';

import { NewOfficePage } from './new-office.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewOfficePageRoutingModule
  ],
  declarations: [NewOfficePage]
})
export class NewOfficePageModule {}
