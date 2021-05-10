import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    constructor(private httpclient:HttpClient) {
      
    }
login(data) {
    return this.httpclient.post('/login',data);

}

}