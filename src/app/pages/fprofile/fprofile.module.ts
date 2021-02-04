import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FprofilePageRoutingModule } from './fprofile-routing.module';

import { FprofilePage } from './fprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FprofilePageRoutingModule
  ],
  declarations: [FprofilePage]
})
export class FprofilePageModule {}
