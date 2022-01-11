import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSlides, PopoverController } from '@ionic/angular';
import { DatabaseServiceService } from '../database-service.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.page.html',
  styleUrls: ['./edit-employee.page.scss'],
})
export class EditEmployeePage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  id: string;
  name: string;
  surname: string;
  avatar: string;
  mySlideOptions = {
    slidesPerView: 1,
  };
  avatars = ["1.png", "2.png", "3.png", "4.png", "5.png","6.png","7.png"]
  @Input() data: {};
  @Input() officeId: string;

  constructor(private alert: AlertController,
    private popoverController: PopoverController,
    private db: DatabaseServiceService) { }

  ngOnInit() {
    
    
    this.id = this.data["id"]
    this.name = this.data["name"]
    this.surname = this.data["surname"]
    this.avatar = this.data["avatar"]
    

    console.log(this.name);

    
  }

  dismiss() {
    this.popoverController.dismiss()
  }

  selectedAvatar(av){
    this.avatar = av
  }

  editStaffMember(){

    if (this.name != undefined && this.surname != undefined && this.avatar != undefined) {
      let empID = this.id 

    this.db.removeEmployee(this.officeId, this.data).then(() => {
    })

    let newData = {
        id: empID,
        name: this.name,
        surname: this.surname,
        avatar: this.avatar
    }
    
    this.db.addEmployee(this.officeId, newData).then(() => {

    })

    this.dismiss()
    } else {
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

  nextSlide(){
    this.slides.slideNext()
  }

  previousSlide() {
    this.slides.slidePrev()
  }

  // generateEmployeeID(){
  //   return '_' + Math.random().toString(36).substring(2,9)
  // }

}
