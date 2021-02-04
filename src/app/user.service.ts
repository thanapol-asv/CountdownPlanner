import { Injectable } from '@angular/core'

@Injectable()
export class UserService{
    private username: string = "None"

    constructor() {

    }

    setUser(userS: string){
        userS = userS.toLowerCase()
        this.username = userS
    }

    getUser(){
        return this.username
    }
}