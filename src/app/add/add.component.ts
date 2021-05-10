import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared/share.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { takeUntil } from 'rxjs/operators'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
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
  stockform: FormGroup
  MarketCap
  Dividend
  Stock
  name
  shortname
  CurrentMarketPrice
  formErrors
  private _unsubscribeAll: Subject<any>
  constructor(public _sharedservice: SharedDataService, private _formBuilder: FormBuilder) {
    this.formErrors = {
      Reserves: {},
  EPS: {},
  Debt: {},
  ROE: {},
  ROCE: {},
  MarketCap: {},
  Dividend: {},
  Stock: {},
  name: {},
  shortname: {},
  CurrentMarketPrice: {},
  }
  this.stockform = this.createRoleForm()
   }

  ngOnInit(): void {
    /*this.stockform.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
      this.onFormValuesChanged()
  }) */
 
  }
  createRoleForm(): FormGroup {
    return this._formBuilder.group({
        Reserves:['', [Validators.required, Validators.min(1), Validators.max(10),Validators.pattern("^[0-9.]*$")]],
        EPS: ['', [Validators.required,Validators.min(1),Validators.pattern("^[0-9.]*$")]],
        Debt:['', [Validators.required,Validators.min(1),Validators.pattern("^[0-9.]*$")]],
        ROE:['', [Validators.required,Validators.min(1),Validators.pattern("^[0-9.]*$")]],
        ROCE:['', [Validators.required,Validators.min(1),Validators.pattern("^[0-9.]*$")]],
        MarketCap:['', [Validators.required,Validators.min(1),Validators.pattern("^[0-9.]*$")]],
        Dividend:['', [Validators.required,Validators.min(1),Validators.pattern("^[0-9.]*$")]],
        Stock:['', [Validators.required,Validators.min(1),Validators.pattern("^[0-9.]*$")]],
        name:['', Validators.required],
        shortname:['', Validators.required],
        CurrentMarketPrice:['', [Validators.required,Validators.min(1),Validators.pattern("^[0-9.]*$")]],
    })
}
onFormValuesChanged(): void {
  console.log('here')
  for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
          continue
      }
      // Clear previous errors
      this.formErrors[field] = {}
      // Get the control
      const control = this.stockform.get(field)

      if (control && control.dirty && !control.valid) {
          this.formErrors[field] = control.errors
      }
      console.log( this.formErrors);
  }
  this.stockform.markAllAsTouched();
}
  savedeatils() {
    let formObj = this.stockform.getRawValue(); // {name: '', description: ''}
    let serializedForm = JSON.parse(JSON.stringify(formObj));
console.log(serializedForm)
    /*let data = {
      Reserves: serializedForm.Reserves,
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
    console.log(data);
    */

    this._sharedservice.insertstockdetails(serializedForm).subscribe(res=>{
      console.log(res);
      Swal.fire('Stock details added .. !!');
      this.stockform.reset()
    }) 
  }
}
