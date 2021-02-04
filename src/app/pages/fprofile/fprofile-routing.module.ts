import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FprofilePage } from './fprofile.page';

const routes: Routes = [
  {
    path: '',
    component: FprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FprofilePageRoutingModule {}
