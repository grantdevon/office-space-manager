import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditOfficePage } from './edit-office.page';

const routes: Routes = [
  {
    path: '',
    component: EditOfficePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditOfficePageRoutingModule {}
