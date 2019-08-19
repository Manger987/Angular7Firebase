import { Component, OnInit } from '@angular/core';
import { DataItemService } from 'src/app/Services/data-item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private itemService: DataItemService
  ) { }
  public items = [];
  public item = '';
  ngOnInit() {
    this.itemService.getAllItems().subscribe(items => {
      this.items = items;
    })
  }

}
