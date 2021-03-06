import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DatabaseServiceService } from '../database-service.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  searchItems = []
  expand: boolean
  data = []
  navigationExtras:NavigationExtras

  constructor(private router:Router,
    private dbService: DatabaseServiceService) {
      
  }

  ngOnInit(){
    this.searchItems = []
    this.data = []
      this.dbService.getOffices().subscribe(res => {
      this.data = res.map((t) => {
        return {
          id: t.payload.doc.id,
          data: t.payload.doc.data()
        }
      })

      let items = []
      for (let i in this.data){
       
        this.data[i]["data"]["id"] =  this.data[i]["id"];
        items.push(this.data[i]["data"])
          this.searchItems = items
      }
    })
  }


  ionViewDidEnter(){
    this.ngOnInit()

  }


  toggleCollapse(e, eue) {
    eue['isCollapsed'] = !eue['isCollapsed']
  }

  addOfficePage(){
    this.router.navigate(["../new-office"])
  }

  viewOffice(data){
    let navigationExtras: NavigationExtras = {
      state: {
        data
      }
    };
    this.router.navigate(['../view-page'],navigationExtras)
  }

  editOffice(data){

    let navigationExtras: NavigationExtras = {
      state: {
        data
      }
    };
    this.router.navigate(['../edit-office'],navigationExtras)
    
  }

}
