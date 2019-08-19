import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { itemInterface } from 'src/app/Models/item';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataItemService {

  constructor(
    private afs: AngularFirestore
  ) { }
   //propiedades
  private itemCollection: AngularFirestoreCollection<itemInterface>;
  private items: Observable<itemInterface[]>;
  private itemDoc : AngularFirestoreDocument<itemInterface>;
  private item: Observable<itemInterface>;
  public selectedItem: itemInterface = {
    id: null
  };

  getAllItems(){
    this.itemCollection = this.afs.collection<itemInterface>('items');
    return this.items = this.itemCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as itemInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }
  getDetailItem(idItem: string){
    this.itemDoc = this.afs.doc<itemInterface>(`items/${idItem}`);
    return this.item = this.itemDoc.snapshotChanges().pipe(map(action=>{
      if(action.payload.exists === false){
        return null;
      }else {
        const data = action.payload.data() as itemInterface;
        data.id = action.payload.id;
        return data;
      } 
    })
    );
  }
  addItem(item: itemInterface): void {
    this.itemCollection.add(item);
  }
  updateItem(item: itemInterface): void {
    let idItem = item.id;
    this.itemDoc = this.afs.doc<itemInterface>(`items/${idItem}`);
    this.itemDoc.update(item);
  }
  deleteItem(idItem: string): void {
    this.itemDoc = this.afs.doc<itemInterface>(`items/${idItem}`);
    this.itemDoc.delete();
  }
}
