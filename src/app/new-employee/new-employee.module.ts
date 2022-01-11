import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewEmployeePageRoutingModule } from './new-employee-routing.module';

import { NewEmployeePage } from './new-employee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewEmployeePageRoutingModule
  ],
  declarations: [NewEmployeePage]
})
export class NewEmployeePageModule {}
