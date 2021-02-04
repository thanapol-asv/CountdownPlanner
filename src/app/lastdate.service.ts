import { Injectable } from '@angular/core'

@Injectable()
export class LastDate{
    private lastdate: string = "None"

    constructor() {

    }

    setLastDate(date: string){
        this.lastdate = date
    }

    getUser(){
        return this.lastdate
    }
}