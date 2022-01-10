import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController, } from '@ionic/angular';
import {IonSlides} from '@ionic/angular';

@Component({
  selector: 'app-addemployeecomponent',
  templateUrl: './addemployeecomponent.component.html',
  styleUrls: ['./addemployeecomponent.component.scss'],
})
export class AddemployeecomponentComponent implements OnInit {
  // @ViewChild('mySlider') slider: Slides;
  @ViewChild(IonSlides) slides: IonSlides;

  mySlideOptions = {
    slidesPerView: 1,
  };
  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  dismiss() {
    this.popoverController.dismiss()
  }

  nextSlide(){
    this.slides.slideNext()
  }
}
