import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { TimeModel } from '../models/time.model';

@Injectable()

export class TimeProvider
{
    // private dataURL = 'https://worldtimeapi.org/api/timezone/Asia/Bangkok' //http://worldtimeapi.org/api/timezone/Asia/Bangkok
    constructor(public http : HttpClient){}
    getData()
        {
            return null;
            // return this.http.get<TimeModel>(this.dataURL);
        }
}