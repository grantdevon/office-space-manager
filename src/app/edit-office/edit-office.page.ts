import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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

  navigationExtras:NavigationExtras;


  constructor(
    private router:Router,
    private dbService: DatabaseServiceService
  ) { }

  ngOnInit() {
    this.navigationExtras = this.router.getCurrentNavigation().extras.state.data;
    console.log(this.navigationExtras);
    
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
      this.officeCapacity !=undefined){

        let data = {
          id: this.navigationExtras["id"],
          name: this.officeName,
          tel: this.officePhoneNumber,
          email: this.officeEmail,
          capacity: this.officeCapacity,
          address: this.officeAddress,
          isCollapsed: true,
        }

        this.dbService.update(this.navigationExtras["id"], data)

        this.router.navigate(["../home"])

      } else {
        console.log("enter values");
        
      }
  }

  goBack(){
    this.router.navigate(["../home"])
  }

  deleteOffice(){
    this.dbService.delete(this.navigationExtras["id"])
  }
}
