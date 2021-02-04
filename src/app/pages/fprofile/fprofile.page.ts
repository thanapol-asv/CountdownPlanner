import { Component, OnInit } from '@angular/core';
import { FriendService } from 'src/app/friend.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fprofile',
  templateUrl: './fprofile.page.html',
  styleUrls: ['./fprofile.page.scss'],
})
export class FprofilePage implements OnInit {
  fuser: string = this.friendS.getUser()
  profileData = []

  priorityData = []
  
  imageData = []
  imageURL: string = ""

  constructor(
    public friendS: FriendService,
    public afData: AngularFireDatabase,
    public route: Router
  ) {
    this.afData.list("/" + this.fuser + "/priority/").valueChanges().subscribe(data =>{
      this.priorityData = data;
      console.log(this.priorityData);
    }),
    this.afData.list("/" + this.fuser + "/profile/").valueChanges().subscribe(data =>{
      this.profileData = data;
      console.log(this.profileData);
    }),
    this.afData.list("/" + this.fuser + "/image/").valueChanges().subscribe(data =>{
      this.imageData = data;
      console.log(this.imageData);
    })
  }

  ngOnInit() {
    if(this.friendS.getUser() == "None"){
      this.route.navigate(['/login']) 
    }
  }

  toStringImg(link: string){
    this.imageURL = link
  }

}
