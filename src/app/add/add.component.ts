import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared/share.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  Reserves
  EPS
  Debt
  ROE
  ROCE
  MarketCap
  Dividend
  Stock
  name
  shortname
  CurrentMarketPrice
  constructor(public _sharedservice: SharedDataService) { }

  ngOnInit(): void {
  }
  savedeatils() {
    let data = {
      Reserves: this.Reserves,
      EPS: this.EPS,
      Debt: this.Debt,
      ROE: this.ROE,
      ROCE: this.ROCE,
      MarketCap: this.MarketCap,
      Dividend: this.Dividend,
      Stock: this.Stock,
      name: this.name,
      shortname: this.shortname,
      CurrentMarketPrice: this.CurrentMarketPrice
    }
  }
}
