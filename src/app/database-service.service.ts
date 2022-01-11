import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { arrayUnion, arrayRemove } from "firebase/firestore";


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
    }));
  }

  getEmployees(id){    
    return new Promise<any>((resolve, reject) => {
      this.ngFirestore.collection("office").doc(id).get().toPromise().then(res => {        
        resolve(res.data())
      })
    })
    
  }

  getOffices() {
    return this.ngFirestore.collection('office').snapshotChanges();
  }


  addEmployee(id, data){
    return this.ngFirestore.collection("office").doc(id).update({employees: arrayUnion(data)})

  }

  removeEmployee(id, data){
    return this.ngFirestore.collection("office").doc(id).update({employees: arrayRemove(data)})

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
