import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatabaseServiceService } from '../database-service.service';

@Component({
  selector: 'app-edit-office',
  templateUrl: './edit-office.page.html',
  styleUrls: ['./edit-office.page.scss'],
})
export class EditOfficePage implements OnInit {

  officeName: string
  officeAddress: string
  officeEmail: string
  officePhoneNumber: string
  officeCapacity: string
  colors = ['#FFBE0B', '#FF9B71', '#FB5607', '#97512C', '#DBBADD', '#FF006E',
  '#A9F0D1', '#00B402', '#489DDA', '#0072E8', '#8338EC'];
  selectedColor = '';


  navigationExtras:NavigationExtras;


  constructor(
    private router:Router,
    private dbService: DatabaseServiceService,
    private alert: AlertController
  ) { }

  ngOnInit() {
    this.navigationExtras = this.router.getCurrentNavigation().extras.state.data;
    
    this.officeName = this.navigationExtras["name"]
    this.officeAddress = this.navigationExtras["address"]
    this.officePhoneNumber = this.navigationExtras["tel"]
    this.officeCapacity = this.navigationExtras["capacity"]
    this.officeEmail = this.navigationExtras["email"]

  }

  editOffice(){
    if (this.officeName !=undefined &&
      this.officeAddress !=undefined &&
      this.officeEmail !=undefined && 
      this.officePhoneNumber !=undefined &&
      this.officeCapacity !=undefined &&
      this.selectedColor != undefined && 
      this.selectedColor != ''){

        let data = {
          id: this.navigationExtras["id"],
          name: this.officeName,
          tel: this.officePhoneNumber,
          email: this.officeEmail,
          capacity: this.officeCapacity,
          address: this.officeAddress,
          isCollapsed: true,
          color: this.selectedColor
        }

        this.dbService.update(this.navigationExtras["id"], data)

        this.router.navigate(["../home"])

      } else {
        console.log("enter values");
        this.presentAlert("Please make sure all values are entered and an office colour is selected")        

      }
  }

  selected(color) {
    this.selectedColor = color; 
  }

  goBack(){
    this.router.navigate(["../home"])
  }

  deleteOffice(){
    this.dbService.delete(this.navigationExtras["id"])
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
