import { Component, OnInit } from '@angular/core';
import { DataItemService } from 'src/app/Services/data-item.service';
import { itemInterface } from 'src/app/Models/item';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  constructor(
    private itemService:DataItemService,
    private route: ActivatedRoute
  ) { }

  public item: itemInterface = {};
  ngOnInit() {
    const idItem = this.route.snapshot.params['id'];
    this.getDetail(idItem);
  }

  getDetail(idItem: string): void{
    this.itemService.getDetailItem(idItem).subscribe(item =>{
      this.item = item;
    })
  }

}
