import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
@Injectable()

export class SharedDataService {
    constructor(
        private _http: HttpClient
    ) { }
    //Using any
    public loginDataDetails: any = [];
   
    private loginSource = new BehaviorSubject(this.loginDataDetails);
    userloggedIn = this.loginSource.asObservable();

    public editDataDetails: any = [];
    public subject = new Subject<any>();
    private messageSource = new BehaviorSubject(this.editDataDetails);
    currentCompany = this.messageSource.asObservable();
    changeCompany(id: number) {
        this.messageSource.next(id)
    }
    changeLoginstatus(status: boolean) {
        this.loginSource.next(status)
    }
    fetchsearchlist(key) {
        const params = new HttpParams().set('key', key);
        
        let promise = new Promise((resolve, reject) => {
           
            this._http.get('/company/search',{params})
              .toPromise()
              .then(
                res => { 
                  resolve(res);
                }
              );
          });
          return promise;
      
    }
    fetchsearchlistbyid(id): Observable<any> {
        const params = new HttpParams().set('id', id);
        return this._http.get('/company/findbyid',{params});
    }
    insertstockdetails(data):Observable<any>{
        console.log(data);
        const body=JSON.stringify(data);
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post('/company/createcompany',body,{headers: headers});
    }

}