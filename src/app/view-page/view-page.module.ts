import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPagePageRoutingModule } from './view-page-routing.module';

import { ViewPagePage } from './view-page.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    SwiperModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPagePageRoutingModule,
  ],
  declarations: [ViewPagePage]
})
export class ViewPagePageModule {}
