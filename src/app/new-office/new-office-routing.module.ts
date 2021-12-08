import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewOfficePage } from './new-office.page';

const routes: Routes = [
  {
    path: '',
    component: NewOfficePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewOfficePageRoutingModule {}
