import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

export class OFFICE {
  $key: string;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {

  constructor(private ngFirestore: AngularFirestore,
    private router:Router,) { }

  create(office) {
    return this.ngFirestore.collection('office').add(office).then((res => {
      console.log(res.id);
      this.createEmployee(res.id)
    }));
  }

  createEmployee(id){
    return this.ngFirestore.collection('employees').doc(id)
  }

  addEmployee(employee, id){
    return this.ngFirestore.collection('employees').doc(id).set(employee).then(ref => {
      console.log(ref);
      
    }).catch(err => {
      console.log(err);
      
    });
  }

  getEmployees(id){
    return new Promise<any>((resolve, reject) => {
      this.ngFirestore.collection("employees").doc(id).get().toPromise().then(res => {
        resolve(res.data())
      })
    })
    
  }

  getTasks() {
    return this.ngFirestore.collection('office').snapshotChanges();
  }

  get(){
    return this.ngFirestore.collection("office").get().toPromise().then(data => {
      console.log(data.size);
      
    })
  }
  
  

  update(id, office) {
    this.ngFirestore.collection('office').doc(id).update(office)
      .then(() => {
        this.router.navigate(["../home"]);
      }).catch(error => console.log(error));;
  }

  delete(id: string) {
    this.ngFirestore.doc('office/' + id).delete();
    this.router.navigate(["../home"])
  }
}
