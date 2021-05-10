import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  email
  password
  constructor(private _authservice: AuthService) { }

  ngOnInit(): void {
  }
  login(authform: NgForm) {
    if(!authform.valid)
    return
    console.log('Form submitted', authform.value);
    authform.reset();
  /*  this._authservice.login(authform.value).subscribe(res=>{
      console.log(res);
    }) */
  }

}
