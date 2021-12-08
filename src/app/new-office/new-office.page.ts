import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router,
    private dbService: DatabaseServiceService) { }

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
      this.officeCapacity !=undefined){

        let data = {
          name: this.officeName,
          tel: this.officePhoneNumber,
          email: this.officeEmail,
          capacity: this.officeCapacity,
          address: this.officeAddress,
          isCollapsed: true,
          employees: []
        }

        this.dbService.create(data)

        this.router.navigate(["../home"])

      } else {
        console.log("enter values");
        
      }
  }



}
