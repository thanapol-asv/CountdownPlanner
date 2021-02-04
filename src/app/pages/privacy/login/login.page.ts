import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router'
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  username: string = ""
  password: string = ""

  constructor(public afAuth: AngularFireAuth,
    public toastController: ToastController,
    public route: Router,
    public userS: UserService
    ) { }

  ngOnInit() {
  }

  async presentToast(respond: string) {
    const toast = await this.toastController.create({
      message: respond,
      duration: 2000
    });
    toast.present()
  }

  async presentLoggingIn() {
    this.presentToast("Logging in")
  }

  async login(){
    const { username , password } = this
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username + "@countdownplanner.com",password)
      this.presentLoggingIn()
      console.dir(res)  
      this.userS.setUser(this.username)
      this.route.navigate(['/countdown']) 
    } catch(error){
      console.dir(error)
      if(error.code === "auth/user-not-found"){
        this.presentToast("User Not Found")
        console.log("User Not Found")
      }
      if(error.code === "auth/wrong-password"){
        this.presentToast("Your password is wrong")
        console.log("Wrong password")
      }if(error.code === "auth/invalid-email"){
        this.presentToast("Invalid Username")
        console.log("Invalid Username")
      } else{
        this.presentToast(error.message)
      }
    }
  }
}