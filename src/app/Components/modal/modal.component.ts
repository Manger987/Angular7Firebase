import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataItemService } from 'src/app/Services/data-item.service';
import { itemInterface } from './../../Models/item';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private itemService: DataItemService) { }
  @ViewChild('btnClose',{static: true}) btnClose: ElementRef; //hace referencia al elemento del Dom en este caso al boton cerrar.
  @Input() userUid: string;//permite el enlace y recepcion de variable userUid en modal.component
  ngOnInit() {
  }

  onSaveItem(itemForm: NgForm): void {
    
    if (itemForm.value.id == null){
      //New Register
      itemForm.value.userUid = this.userUid;
      this.itemService.addItem(itemForm.value);
    } else {
      //Modified Register
      this.itemService.updateItem(itemForm.value);
    }
    itemForm.resetForm();
    this.btnClose.nativeElement.click();// Evento que simula el click del boton cerrar
  }

}
