import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    constructor(private httpclient:HttpClient) {
      
    }
login(data) {
    const body=JSON.stringify(data);
    console.log(body);
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpclient.post('/user/signin',body,{headers: headers});
}
register(data) {
    const body=JSON.stringify(data);
    console.log(body);
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpclient.post('/user/signup',body,{headers: headers});
}

}