import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string = ""
  password: string = ""
  cpassword: string = ""
  date = new Date()
  dateModify = this.date.getFullYear() + "-" + (this.date.getMonth()+1) + "-" + this.date.getDate()
  dataArray = [["Get Start on " + this.dateModify + "!"]]

  constructor(public afAuth: AngularFireAuth,
    public toastController: ToastController,
    public alertController: AlertController,
    public route: Router,
    public afData: AngularFireDatabase,
    public userS: UserService
    ) { }

  ngOnInit() {
  }

  async presentToast(respond: string)
  {
    const toast = await this.toastController.create({
      message: respond,
      duration: 2000
    });
    toast.present()
  }

  async presentWelcomeAlert()
  {
    const alert = await this.alertController.create({
      header: "Registration Complete",
      subHeader: "Welcome!",
      buttons: ['OK']
    })

    await alert.present()
  }
  
  async presentLoggingIn()
  {
    this.presentToast("Logging in")
  }

  async register()
  {
    this.username = this.username.toLowerCase()
    const { password , cpassword } = this

    if(password !== cpassword){
      this.presentToast("Passwords do not match")
      return console.error("Passwords do not match")
    }
    try{
      
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(this.username + "@countdownplanner.com" , password)
      console.dir(res)
      this.afData.list("/"+ this.username + "/priority/").push(this.dataArray)
      this.afData.list("/"+ this.username + "/profile/").push([{
        "Fullname" : "Not Set",
        "Nickname" : "Not Set",
        "Age" : "Not Set",
        "Sex" : "Not Set",
        "Description" : "Not Set"
      }])
      this.afData.list("/" + this.username + "/image/").push(["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC"])
      this.presentWelcomeAlert()
      this.presentLoggingIn()
      this.userS.setUser(this.username)
      this.route.navigate(['/countdown'])
    } catch(error){
      if(error.code == "auth/email-already-in-use"){
        this.presentToast("This User ID is already in-use")
      }
      if(error.code == "auth/weak-password"){
        this.presentToast("Your password is too weak")
      }else{
        this.presentToast(error.message)
      }
      console.dir(error)
    }
  }
}
