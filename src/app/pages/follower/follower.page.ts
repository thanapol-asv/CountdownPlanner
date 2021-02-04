import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FriendService } from 'src/app/friend.service';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.page.html',
  styleUrls: ['./follower.page.scss'],
})
export class FollowerPage implements OnInit {
  username: string = this.userS.getUser()
  addF: boolean = false
  friendList = []
  friendList2 = []
  friendProfile = []
  friendPriority = []
  spareData = []
  spareData2 = []
  forSkeleton = [0,0,0,0,0,0]
  newFriend: string = ""
  showSkeleton: boolean = true
  getFriend: string = ""
  friendShow: string = ""
  showF = false
  date= new Date
  dateModify = this.date.getFullYear() + "-" + (this.date.getMonth()+1) + "-" + this.date.getDate()
  value: string = ""
  friendImage = []
  friendImg: string = ""

  ngOnInit() {
    if(this.userS.getUser() == "None"){
      this.route.navigate(['/login']) 
    }
  }

  constructor(
    public userS: UserService,
    public afData: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public alertController: AlertController,
    public route: Router,
    public friendname: FriendService
  ) {
      this.afData.list("/" + this.username + "/follower/").valueChanges().subscribe(data =>{
        this.friendList = data;
        this.friendList.sort()
        console.log(this.friendList);
        this.showSkeleton = false
    })
  }

  delete(delFriend: string){
    
    this.spareData = this.friendList
    this.friendList = []
    this.afData.list("/" + this.username + "/follower/").remove()
    for(let i = 0; i < this.spareData.length; i++){
      if(this.spareData[i] != delFriend){
        this.friendList.push(this.spareData[i])
        this.afData.list("/" + this.username + "/follower/").push(this.spareData[i])
      }
    }
    
    
    this.afData.list("/" + delFriend + "/following/").remove()
    for(let i = 0; i<this.spareData2.length ; i++){
      if(this.spareData2[i] != this.username){
        this.afData.list("/" + delFriend + "/following/").push(this.spareData2[i])
      }
    }
  }

  getFriendInfo(FN: string) {
    this.getFriend = FN
    this.spareData2 = this.friendList2
  }

  async showAlert(message: string)
  {
    const alert = await this.alertController.create({
      header: message,
      buttons: ["OK"]
    })

    await alert.present()
  }
  
  getLastDate(d:any ,v: any){
    if(d==this.dateModify){
      this.value = v
    }else{
      this.value = "Your friend's priority is not set yet"
    }
  }

  showThisFriend(thisFriend: string) {
    thisFriend=thisFriend.toLowerCase()
    this.friendShow = thisFriend
    this.afData.list("/" + this.friendShow + "/profile/").valueChanges().subscribe(data =>{
    this.friendProfile = data;
    console.log(this.friendProfile);
  })
    this.afData.list("/" + this.friendShow + "/priority/").valueChanges().subscribe(data =>{
    this.friendPriority = data;
    console.log(this.friendPriority);
  })
    this.afData.list("/" + this.friendShow + "/image/").valueChanges().subscribe(data =>{
    this.friendImage = data;
    console.log(this.friendImage);
  })
  this.afData.list("/" + thisFriend + "/following/").valueChanges().subscribe(data =>{
    this.friendList2 = data;
    this.friendList2.sort()
  })
  }

  toStringImg(link: string){
    this.friendImg = link
  }

  toFriendProfile(friendname: string){
    this.friendname.setUser(friendname)
    this.route.navigate(['/fprofile'])
  }
}
