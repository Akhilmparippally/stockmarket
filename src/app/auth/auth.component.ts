import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SharedDataService } from '../shared/share.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  email
  password
  loginform:boolean = true
  
  constructor(private _authservice: AuthService,  private router: Router, public _shared: SharedDataService) { }

  ngOnInit(): void {
  }
  submitbutton(authform:NgForm) {
    if(this.loginform) {
      this.signin(authform)
    }
    else {
      this.signup(authform)
    }
  }
signup(authform: NgForm) {
  if(!authform.valid)
  return
  console.log('Form submitted', authform.value);
  
  this._authservice.register(authform.value).subscribe(res=>{
    Swal.fire('Successfully Registered, Login Now.. !!');
    this.loginform = true
    authform.reset();
  }, err=>{
    Swal.fire('Email already exist.. !!');
    authform.reset();
  }) 
}
  signin(authform: NgForm) {
    if(!authform.valid)
    return
    console.log('Form submitted', authform.value);
    
    this._authservice.login(authform.value).subscribe(res=>{
      let _resultData : any = res;
      localStorage.setItem("#token#",_resultData.token);
      this._shared.changeLoginstatus(true);
      Swal.fire('Successfully Logged In .. !!');
      authform.reset();
      this.router.navigate(['../add']);
    }, err=>{
      Swal.fire('Please check your email & password .. !!');
      authform.reset();
    }) 
  }
  togglebuttons() {
    this.loginform = !this.loginform
  }

}
