import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, setDoc,getDoc, CollectionReference, DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  firestore: Firestore = inject(Firestore);
  constructor() { }

  getCollection(name:string): CollectionReference<any> {
    // const subCollections : any = name.split('/');
    // // const refArgs : any = [this.firestore].concat(subCollections);
    // return collection.apply(this, [this.firestore,'users',]);
    return collection(this.firestore,name)
  }

  getUserCollection(){
    return collection(this.firestore,'users')
  }

  getUserData(collectionName: string, documentName: string): Promise<DocumentSnapshot<DocumentData>> {
    return getDoc(doc(this.firestore, collectionName, documentName));
  }

  getData(collection: CollectionReference): Observable<any[]> {
    return collectionData(collection);
  }

  updateData(collectionName: string, documentName: string, data: Object) {
    return setDoc(doc(this.firestore, collectionName, documentName), data);
  }

  addData(collection: CollectionReference, data: Object) {
    return addDoc(collection, data)
  }
}
