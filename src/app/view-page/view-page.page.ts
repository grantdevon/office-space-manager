import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DatabaseServiceService } from '../database-service.service';
import { AlertController } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
import { PopoverController } from '@ionic/angular';
import { NewEmployeePage } from 'src/app/new-employee/new-employee.page'
import { EditEmployeePage } from 'src/app/edit-employee/edit-employee.page'


@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.page.html',
  styleUrls: ['./view-page.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewPagePage implements OnInit {
  @ViewChild('swiper') swiper: SwiperComponent
  id: string
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
  addEmployeeContent: boolean
  employeeOptionsPopUp: boolean
  currentEmpData : {}
  empDeleteCheck: boolean
  peopleInOffice: string

  constructor(private router:Router,
    private dbService: DatabaseServiceService,
    public alertController: AlertController,
    public popoverController: PopoverController
    ) { }

  ngOnInit() {
    this.employeeOptionsPopUp = false
    this.isCollapsed = true
    this.navigationExtras = this.router.getCurrentNavigation().extras.state.data;
    this.id = this.navigationExtras["id"]

    this.searchItems = this.navigationExtras["employees"]
    
    this.officeName = this.navigationExtras["name"]
    this.officeAddress = this.navigationExtras["address"]
    this.officePhoneNumber = this.navigationExtras["tel"]
    this.officeCapacity = this.navigationExtras["capacity"]
    this.officeEmail = this.navigationExtras["email"]
    this.cardColour = this.navigationExtras["color"]
    this.getEmployees()
    
    this.peopleInOffice = this.searchItems.length
    
  }

  getEmployees(){
    let empData = []
    this.dbService.getEmployees(this.id).then(res => {
      empData = res.employees
      this.searchItems = empData
      this.peopleInOffice = this.searchItems.length
    })
    
  }

  async presentPopover(ev: any, id) {
    id = this.id
    const popover = await this.popoverController.create({
      component: NewEmployeePage,
      cssClass: 'new-employee-class',
      event: ev,
      translucent: true,
      componentProps: {
        id: id
      }
    });
    await popover.present();

    popover.onDidDismiss().then(() => {
      console.log("did dismiss");
      this.getEmployees()
      
    })
  
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
    this.initializeItems()

    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != "") {
      this.searchItems = this.searchItems.filter(item => {
        return item.name.concat(' ', item.surname).toLowerCase().indexOf(val.toLowerCase()) > -1
      })
      console.log(this.searchItems);
      
    }
  }

  initializeItems(){
    this.searchItems = this.navigationExtras["employees"]
  }


  goBack(){
    this.router.navigate(["../home"])
  }

  ionViewDidEnter(){
    console.log("did enter");
  }

  employeeOptions(data){
    this.currentEmpData = data    
    if (!this.employeeOptionsPopUp) {
      this.employeeOptionsPopUp = true
    }
  }

  editStaffMember(ev:any){
    this.presentEditEmployeePopOver(ev);
  }

  async presentEditEmployeePopOver(ev: any) {
    this.employeeOptionsPopUp = false
    let id = this.id
    let data = this.currentEmpData
    const popover = await this.popoverController.create({
      component: EditEmployeePage,
      cssClass: 'edit-employee-class',
      event: ev,
      translucent: true,
      componentProps: {
        data: data,
        officeId: id
      }
    });
    await popover.present();

    popover.onDidDismiss().then(() => {
      console.log("did dismiss");
      this.getEmployees()
      
    })
  
    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
    
  }

  cancel(){
    this.employeeOptionsPopUp = false
  }

  deleteStaffMember(){    
    this.dbService.removeEmployee(this.id, this.currentEmpData)
    this.employeeOptionsPopUp = false
    this.getEmployees()
    this.empDeleteCheck = false

  }

  areYouSure(){
    if (this.employeeOptions){
      this.employeeOptionsPopUp = false
    }

    if (!this.empDeleteCheck){
      this.empDeleteCheck = true
    }

  }

  keepMember(){
    if (this.empDeleteCheck){
      this.empDeleteCheck = false
    }
  }

  prevPopUp(){
    this.empDeleteCheck = false
    this.employeeOptionsPopUp = true
  }

}
