import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login.model';

@Injectable()

export class LoginProvider
{
    private loginURL = 'https://buyformeplease.herokuapp.com/requestLogin?loginInfo='
    constructor(public http : HttpClient){}
    getLoginAccess(username:string,password:string)
        {
            this.loginURL += username+','+password
            return this.http.get<Login>(this.loginURL);
        }
}