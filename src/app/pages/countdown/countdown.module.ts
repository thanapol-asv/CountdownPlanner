import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountdownPageRoutingModule } from './countdown-routing.module';

import { CountdownPage } from './countdown.page';
import { HttpClientModule } from '@angular/common/http';
import { TimeProvider } from 'src/providers/time';
import { NgCircleProgressModule } from "ng-circle-progress";
import { red } from 'color-name';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountdownPageRoutingModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      animation: false,
      responsive: true,
      renderOnClick: false,
      clockwise: true,
      title: "QUICKLY!",
      titleColor: "#ff0000"
    })
  ],
  declarations: [CountdownPage],
  providers: [TimeProvider]
})
export class CountdownPageModule {}
