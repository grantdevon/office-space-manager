import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DatabaseServiceService } from '../database-service.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.page.html',
  styleUrls: ['./view-page.page.scss'],
})
export class ViewPagePage implements OnInit {
  navigationExtras:NavigationExtras;
  officeName: string
  officeAddress: string
  officeEmail: string
  officePhoneNumber: string
  officeCapacity: string
  isCollapsed: boolean
  searchItems: any;
  name: string;
  surname: string;
  avatar:string

  constructor(private router:Router,
    private dbService: DatabaseServiceService,
    public alertController: AlertController) { }

  ngOnInit() {
    this.isCollapsed = true
    this.navigationExtras = this.router.getCurrentNavigation().extras.state.data;
    this.navigationExtras["employees"] = [{name: "eh"}, {name: "bleh"}]
    

    this.searchItems = this.navigationExtras["employees"]
    console.log(this.searchItems);
    for (let i in this.searchItems){
      console.log(this.searchItems[i])
    }
    this.officeName = this.navigationExtras["name"]
    this.officeAddress = this.navigationExtras["address"]
    this.officePhoneNumber = this.navigationExtras["tel"]
    this.officeCapacity = this.navigationExtras["capacity"]
    this.officeEmail = this.navigationExtras["email"]
  }

  editOffice(){
    let data = this.navigationExtras
    let navigationExtras: NavigationExtras = {
      state: {
        data
      }
    };
    this.router.navigate(['../edit-office'],navigationExtras)
    
  }

  toggleCollapse(){
    if (this.isCollapsed){
      this.isCollapsed = false
    } else {
       this.isCollapsed = true
    }
  }

  getItems(ev) {
    // Reset items back to all of the items
    // this.initializeItems();
    // set val to the value of the ev target
    var val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != "") {
      this.searchItems = this.searchItems
    }
  }

  addEmployee(){
    let newEmployee =  []
    newEmployee = this.navigationExtras["employees"]
    let data = {
      id: this.navigationExtras["id"],
      name: this.officeName,
      tel: this.officePhoneNumber,
      email: this.officeEmail,
      capacity: this.officeCapacity,
      address: this.officeAddress,
      isCollapsed: true,
      employees : newEmployee
    }

    this.dbService.update(this.navigationExtras["id"], data)
  }

  goBack(){
    this.router.navigate(["../home"])
  }

}