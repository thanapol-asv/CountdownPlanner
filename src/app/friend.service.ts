import { Injectable } from '@angular/core'

@Injectable()
export class FriendService{
    private friendname: string = "None"

    constructor() {

    }

    setUser(friendS: string){
        friendS=friendS.toLowerCase()
        this.friendname = friendS
    }

    getUser(){
        return this.friendname
    }
}