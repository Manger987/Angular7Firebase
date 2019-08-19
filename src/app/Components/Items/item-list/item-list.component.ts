import { Component, OnInit } from '@angular/core';
import { DataItemService } from 'src/app/Services/data-item.service';
import { itemInterface } from 'src/app/Models/item';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from './../../../Models/user';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  constructor(
    private itemService: DataItemService,
    private AuthService: AuthService
  ) { }

  private items:itemInterface[]; //[]
  private isAdmin: any = null;
  private userUid: string = null;
  private rolUser: any = {};
  ngOnInit() {
    this.getListItems();
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.AuthService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.AuthService.isUserAdmin(this.userUid).subscribe(userRole => {
          //this.isAdmin = Object.assign({},userRole.roles).hasOwnProperty('type'); //hasOwnProperty() funcion propia de javascript... comprueba si existe la propiedad mencionada 
          const rolType = this.AuthService.rolUser(userRole.roles.type);
          this.rolUser = userRole.roles; //Rol para esconder botones en lista de items
          this.rolUser.name_rol = rolType;
        })
      }
    })
  }

  getListItems(){
    this.itemService.getAllItems().subscribe(items => {
      this.items = items;
    })
  }

  onDeleteItem(idItem: string){
    if(confirm("Are you sure to delete?")) {
      this.itemService.deleteItem(idItem);
    }
  }

  onPreUpdateItem(item: itemInterface) {
    this.itemService.selectedItem = Object.assign({},item);
  }

}
