import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  //Username >> for access data & is used on the system via UserService
  username = this.userS.getUser()
  //Date for setting Priority
  date = new Date()
  dateModify = this.date.getFullYear() + "-" + (this.date.getMonth()+1) + "-" + this.date.getDate()
  //Use for CHECK whether some action is allow or not
  value: string
  priorityAllow: boolean = true
  profileAllow: boolean = false
  logout: boolean = false
  showProfile: boolean = true

  //Priority Setting
  priorityData = []
  message: string = ""

  //Profile Setting
  imageData = []
  imageURL = ""
  cimageURL = ""
  cPic: boolean = false
  profileData = []
  fname: string = ""
  nname: string = ""
  age: string = ""
  sex: string = ""
  desc: string = ""
  

  constructor(public afData: AngularFireDatabase, 
    public userS: UserService,
    public route: Router,
    public alertController: AlertController
    ) { 
    this.afData.list("/" + this.username + "/priority/").valueChanges().subscribe(data =>{
      this.priorityData = data;
      console.log(this.priorityData);
    }),
    this.afData.list("/" + this.username + "/profile/").valueChanges().subscribe(data =>{
      this.profileData = data;
      console.log(this.profileData);
    }),
    this.afData.list("/" + this.username + "/image/").valueChanges().subscribe(data =>{
      this.imageData = data;
      console.log(this.imageData);
    })
  }

  ngOnInit() {
    if(this.userS.getUser() == "None"){
      this.route.navigate(['/login']) 
    }
  }

  //Confirm Priority Setting
  async showConfirm(mess: string)
  {
    const alert = await this.alertController.create({
      header: "Confirm?",
      subHeader: mess,
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.afData.list("/" + this.username + "/priority/").push([this.dateModify,mess])
            this.priorityAllow = false
          }
        }
      ]
    })

    await alert.present()
  }

  cancelCP(){
    this.profileAllow = false
  }
  cancelCI(){
    this.cPic = false
  }

  async showAlert(message: string)
  {
    const alert = await this.alertController.create({
      header: message,
      buttons: ["OK"]
    })

    await alert.present()
  }  

  upload(message: string) {
    if(message == ""){
      this.showAlert("Please find something to do today(possibly not lying in bed)")
    } else{
      if(this.priorityAllow){
        this.showConfirm(message)
      }else{
        this.showAlert("Today's priority is already set!")
      }
    }    
  }

  cProfile(){
    this.profileAllow = true
  }

  async showProfileUpdateAlert() {
      const alert = await this.alertController.create({
        header: "Your Profile has been changed!",
        buttons: [{
          text: "OK",
          handler: () => {
            this.showProfile = true
          }
        }]
      })
  
      await alert.present() 
  }

  changeProfile(fullname: string, nickname: string, age: string, sex: string,description: string) {
    if(fullname == "" || nickname == "" || age == "" || sex == "" || description == ""){
      this.showAlert("Please input all information")
    } else{
      this.afData.list("/" + this.username + "/profile/").remove()
      this.showProfile = false
      this.profileData = [{
        "Fullname" : fullname,
        "Nickname" : nickname,
        "Age" : age,
        "Sex" : sex,
        "Description" : description
      } ]
      this.afData.list("/" + this.username + "/profile/").push(this.profileData)
      this.profileAllow = false
      this.showProfileUpdateAlert()
    }
  }
  
  toStringImg(link: string){
    this.imageURL = link
  }

  cImage(){
    this.cPic = true
  }

  changeImage(imgURL: string){
    if(imgURL == ""){
      this.showAlert("Please input an image URL")
    } else{
      this.afData.list("/" + this.username + "/image/").remove()
      this.imageData = [imgURL]
      this.afData.list("/" + this.username + "/image/").push(this.imageData)
      this.cPic = false
      this.showAlert("Your profile image is updated")
    }
  }

  getLastDate(test: any){
    this.value = test
    if (this.value == this.dateModify){
      this.priorityAllow = false
    }else{
      this.priorityAllow = true
    }
  }


  //Log Out
  log(){
    this.showLogout()
  }

  async showLogout()
  {
    const alert = await this.alertController.create({
      header: "Confirm Logout?",
      buttons: [
        {
          text: 'No',
          handler: () => {
            this.logout = false
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.logout = true
            if(this.logout == true){
              this.userS.setUser("None")
              this.route.navigate(['/login'])
            }
          }
        }
      ]
    })

    await alert.present()
  }
}
