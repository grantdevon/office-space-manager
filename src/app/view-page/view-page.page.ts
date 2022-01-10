import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DatabaseServiceService } from '../database-service.service';
import { AlertController } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
import { PopoverController } from '@ionic/angular';
import { AddemployeecomponentComponent } from 'src/app/addemployeecomponent/addemployeecomponent.component'



@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.page.html',
  styleUrls: ['./view-page.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewPagePage implements OnInit {
  @ViewChild('swiper') swiper: SwiperComponent
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
  cardColour: string
  avatar: "assets/avatarIcons/1.png"
  addEmployeeContent: boolean
  isSlideOpen: boolean

  mySlideOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    // width: 200
  };
  

  constructor(private router:Router,
    private dbService: DatabaseServiceService,
    public alertController: AlertController,
    public popoverController: PopoverController
    ) { }

  ngOnInit() {
    this.isSlideOpen = false
    if (this.swiper) {
      this.swiper.updateSwiper({})
    }
    this.isCollapsed = true
    this.navigationExtras = this.router.getCurrentNavigation().extras.state.data;
    this.navigationExtras["employees"] = [{name: "jone", surname: "eh"}]

    this.searchItems = this.navigationExtras["employees"]
    
    this.officeName = this.navigationExtras["name"]
    this.officeAddress = this.navigationExtras["address"]
    this.officePhoneNumber = this.navigationExtras["tel"]
    this.officeCapacity = this.navigationExtras["capacity"]
    this.officeEmail = this.navigationExtras["email"]
    this.cardColour = this.navigationExtras["color"]
  }


  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: AddemployeecomponentComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();
  
    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
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

  // addEmployee(){
  //   let newEmployee =  []
  //   newEmployee = this.navigationExtras["employees"]
  //   let data = {
  //     id: this.navigationExtras["id"],
  //     name: this.officeName,
  //     tel: this.officePhoneNumber,
  //     email: this.officeEmail,
  //     capacity: this.officeCapacity,
  //     address: this.officeAddress,
  //     isCollapsed: true,
  //     employees : newEmployee
  //   }

  //   this.dbService.update(this.navigationExtras["id"], data)
  // }

  goBack(){
    this.router.navigate(["../home"])
  }

  addEmployee(){

    let employee = {
      name: "",
      surname: "",
      avatar: ""
    }

    console.log(this.isSlideOpen);
    this.isSlideOpen = true

  


  }
  eh() {
    this.isSlideOpen = false
  }

  // async chooseeAvatar(){
  //   const addEmployeePopUp = await this.alertController.create({
  //     header: "New Staff Member",
  //     message: "<img src='assets/avatarIcons/1.png' /> <img src='assets/avatarIcons/1.png' />",
  //     animated: true,
     
  //       buttons: [{
  //         text: "NEXT",
  //         handler: (alertData) => {
  //           console.log(alertData.name);
  //           console.log(alertData.surname);
            
  //         }
  //       }]

        
  //   })

  //   await addEmployeePopUp.present()
  // }

}
