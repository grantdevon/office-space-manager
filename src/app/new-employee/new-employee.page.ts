import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSlides, PopoverController, } from '@ionic/angular';
import { DatabaseServiceService } from 'src/app/database-service.service'


@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.page.html',
  styleUrls: ['./new-employee.page.scss'],
})
export class NewEmployeePage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  name: string;
  surname: string;
  avatar: string
  mySlideOptions = {
    slidesPerView: 1,
  };
  @Input() id: string;

  avatars = ["1.png", "2.png", "3.png", "4.png", "5.png","6.png","7.png"]
  constructor(private popoverController: PopoverController,
    private db: DatabaseServiceService,
    private alert: AlertController
) { }

  ngOnInit() {
    
  }

  dismiss() {
    this.popoverController.dismiss()
  }

  nextSlide(){
    this.slides.slideNext()
  }

  previousSlide() {
    this.slides.slidePrev()
  }

  addStaffMember(){
    let empID = this.generateEmployeeID()    
    if (this.name != undefined && this.surname != undefined && this.avatar != undefined){

      let data = {
        id: empID,
        name: this.name,
        surname: this.surname,
        avatar: this.avatar
      }
  
      this.db.addEmployee(this.id, data).then(res => console.log(res));
      
      this.dismiss()
    } else {
      console.log("enter values");
      this.presentAlert("Please make sure all values are entered")        

    }

  }

  async presentAlert(msg){
    const alert = await this.alert.create({
      header: "Alert!!!",
      message: msg,
      buttons: ['OK']
    })

    await alert.present()
  }


  selectedAvatar(av){
    this.avatar = av
  }

  generateEmployeeID(){
    return '_' + Math.random().toString(36).substring(2,9)
  }
}
