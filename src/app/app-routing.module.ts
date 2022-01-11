import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'view-page',
    loadChildren: () => import('./view-page/view-page.module').then( m => m.ViewPagePageModule)
  },
  {
    path: 'new-office',
    loadChildren: () => import('./new-office/new-office.module').then( m => m.NewOfficePageModule)
  },
  {
    path: 'edit-office',
    loadChildren: () => import('./edit-office/edit-office.module').then( m => m.EditOfficePageModule)
  },
  {
    path: 'new-employee',
    loadChildren: () => import('./new-employee/new-employee.module').then( m => m.NewEmployeePageModule)
  },
  {
    path: 'edit-employee',
    loadChildren: () => import('./edit-employee/edit-employee.module').then( m => m.EditEmployeePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
