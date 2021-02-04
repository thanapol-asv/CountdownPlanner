import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { FriendService } from '../../friend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
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

  constructor(
    public userS: UserService,
    public afData: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public alertController: AlertController,
    public route: Router,
    public friendname: FriendService
  ) {
      this.afData.list("/" + this.username + "/following/").valueChanges().subscribe(data =>{
        this.friendList = data;
        this.friendList.sort()
        console.log(this.friendList);
        this.showSkeleton = false
    })
  }

  ngOnInit() {
    if(this.userS.getUser() == "None"){
      this.route.navigate(['/login']) 
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
  this.afData.list("/" + thisFriend + "/follower/").valueChanges().subscribe(data =>{
    this.friendList2 = data;
    this.friendList.sort()
  })
  
  }

  toStringImg(link: string){
    this.friendImg = link
  }

  async addFriend(NF: string) {
    NF = NF.toLowerCase()
    if(NF == this.username){
      this.showAlert("You can't follow yourself")
    } else{
      this.getFriend = NF
    if(!this.friendList.includes(NF)){
      try {
        const res = await this.afAuth.auth.signInWithEmailAndPassword(NF + "@countdownplanner.com","testing")
        console.dir(res)  
        this.afData.list("/" + this.username + "/following/").push(NF)
        this.afData.list("/" + NF + "/follower/").push(this.username)
        this.showAlert("Start following '" + NF + "'")
        this.addF = false
      } catch(error){
        console.dir(error)
        if(error.code != "auth/user-not-found" && error.code != "auth/invalid-email"){
          this.afData.list("/" + this.username + "/following/").push(NF)
          this.afData.list("/" + NF + "/follower/").push(this.username)
          this.showAlert("Start following '" + NF + "'")
          this.addF = false
        } else{
          this.showAlert("User '" + NF + "' does not exist")
          this.addF = false
        }
      }
    } else{
      this.showAlert("You already follows that user")
      this.addF = false
    }
    }
  }

  addFR(){
    if(this.addF){
      this.addF = false
    } else{
      this.addF = true
    }
  }

  delete(delFriend: string){
    this.spareData = this.friendList
    this.friendList = []
    this.afData.list("/" + this.username + "/following/").remove()
    for(let i = 0; i < this.spareData.length; i++){
      if(this.spareData[i] != delFriend){
        this.friendList.push(this.spareData[i])
        this.afData.list("/" + this.username + "/following/").push(this.spareData[i])
      }
      
    }

    this.afData.list("/" + delFriend + "/follower/").remove()
    for(let i = 0; i < this.spareData2.length; i++){
      if(this.spareData2[i] != this.username){
        this.afData.list("/" + delFriend + "/follower/").push(this.spareData2[i])
      }
    }
  }

  toFriendProfile(friendname: string){
    this.friendname.setUser(friendname)
    this.route.navigate(['/fprofile'])
  }
}
