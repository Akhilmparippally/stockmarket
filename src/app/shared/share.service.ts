import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http'
@Injectable()

export class SharedDataService {
    constructor(
        private _http: HttpClient
    ) { }
    //Using any
    public editDataDetails: any = [];
    public subject = new Subject<any>();
    private messageSource = new BehaviorSubject(this.editDataDetails);
    currentCompany = this.messageSource.asObservable();
    changeCompany(id: number) {
        this.messageSource.next(id)
    }
    fetchsearchlist(key) {
        const params = new HttpParams().set('key', key);
        
        let promise = new Promise((resolve, reject) => {
           
            this._http.get('/companies/',{params})
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
        return this._http.get('/companies/',{params});
    }
    insertstockdetails(data):Observable<any>{
       // const params = new HttpParams().set('id', id);
        return this._http.post('/addstock/',data);
    }
}