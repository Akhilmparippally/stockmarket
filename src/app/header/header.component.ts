import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared/share.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
loginstatus:boolean = false
  constructor(
    public _shared: SharedDataService,
    public router:Router
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem("#token#");
    if(token !=null) {
      this.loginstatus = true
    }
    console.log('header', this.loginstatus)
    this._shared.userloggedIn.subscribe(status =>{
      if(status ===true || status === false)
      this.loginstatus = status
      console.log('header subscribe', this.loginstatus)
    })
  }
  logout(){
    localStorage.clear();
    this._shared.changeLoginstatus(false);
    this.router.navigate(['../login']);
    }

}
