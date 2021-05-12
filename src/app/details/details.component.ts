import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared/share.service';
import { details } from './details.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  selectedCompany:any;
  loading :boolean = false;
  //Using details model
  detailsdisplay : details; 
  loaddata: boolean = false;
  constructor(public _sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    
    this._sharedDataService.currentCompany.subscribe(company =>{
      this.selectedCompany= company
      console.log(this.selectedCompany)
      if(this.selectedCompany === 0) {
        this.loaddata = false 
      }
      if(this.selectedCompany && !Array.isArray(this.selectedCompany))
      {
        this.loading = true
      this._sharedDataService.fetchsearchlistbyid(this.selectedCompany).subscribe(data5 => {
        this.loading = false
        let response = JSON.parse(JSON.stringify(data5))
        this.detailsdisplay = new details(response[0].name,
          response[0].id,
          response[0].shortname,
           response[0].MarketCap,
           response[0].CurrentMarketPrice,
          response[0].Stock,
           response[0].Dividend,
          response[0].ROCE,
          response[0].ROE,
          response[0].Debt,
           response[0].EPS,
          response[0].Reserves)
          this.loaddata = true
      }); }
      
    } ); 
  }

}
