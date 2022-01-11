import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatabaseServiceService } from '../database-service.service';

@Component({
  selector: 'app-new-office',
  templateUrl: './new-office.page.html',
  styleUrls: ['./new-office.page.scss'],
})
export class NewOfficePage implements OnInit {
  officeName: string
  officeAddress: string
  officeEmail: string
  officePhoneNumber: string 
  officeCapacity: string
  colors = ['#FFBE0B', '#FF9B71', '#FB5607', '#97512C', '#DBBADD', '#FF006E',
            '#A9F0D1', '#00B402', '#489DDA', '#0072E8', '#8338EC'];

  selectedColor = ''



  constructor(private router: Router,
    private dbService: DatabaseServiceService,
    private alert: AlertController) { }

  ngOnInit() {
  }

  goBack(){
    this.router.navigate(["../home"])
  }

  addNewOffice(){
    if (this.officeName !=undefined &&
      this.officeAddress !=undefined &&
      this.officeEmail !=undefined && 
      this.officePhoneNumber !=undefined &&
      this.officeCapacity !=undefined && 
      this.selectedColor != undefined && 
      this.selectedColor != '') {

        let data = {
          name: this.officeName,
          tel: this.officePhoneNumber,
          email: this.officeEmail,
          capacity: this.officeCapacity,
          address: this.officeAddress,
          isCollapsed: true,
          employees: [],
          color: this.selectedColor
        }

        this.dbService.create(data)

        this.router.navigate(["../home"])

      } else {
        this.presentAlert("Please make sure all values are entered and an office colour is selected")        
        
      }
  }

  selected(color) {
    this.selectedColor = color; 
  }

  async presentAlert(msg){
    const alert = await this.alert.create({
      header: "Alert!!!",
      message: msg,
      buttons: ['OK']
    })

    await alert.present()
  }



}
