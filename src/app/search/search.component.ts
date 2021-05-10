import { Component, OnInit } from '@angular/core';
import { Search } from './search.model';
import {SharedDataService} from '../shared/share.service'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
searchlist: Search[]; 
searching
Updatedsearchlist = []
dataset
modelChanged: Subject<object> = new Subject<object>()
  constructor( public _SharedDataService: SharedDataService) { 
    
  //  this.searchlist = [new Search('Tata consultancy Service','TCS', 12),new Search('Infosys','Infy', 12)];
  this.modelChanged.pipe(debounceTime(100)).subscribe(model => {
    this.dataset = model
    this.searchnow(this.dataset)
})
  }

  ngOnInit(): void {
  }
  searchinitiate(event:any) {
    let searchkey = event.target.value
    this.modelChanged.next(searchkey)
  }
  searchnow(searchkey) {
   
    this.searchlist = []
    
    this._SharedDataService.fetchsearchlist(searchkey).then( (data5: Array<any>) => {
      this.searchlist = []
      data5.map(d=> {
        this.searchlist.push(new Search(d.name,d.shortname,d.id))
      })
    })

   
  }
  selected(id:number) {
    console.log(id);
    this.searching = ''
    this._SharedDataService.changeCompany(id);
    this.searchlist = [];
  }
}
