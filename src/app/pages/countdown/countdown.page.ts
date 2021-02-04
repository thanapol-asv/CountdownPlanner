import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeModel } from '../../../models/time.model';
// import { TimeProvider } from '../../../providers/time';
import { UserService } from 'src/app/user.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
// import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.page.html',
  styleUrls: ['./countdown.page.scss'],
})
export class CountdownPage implements OnInit {
  username: string = this.userS.getUser()
  arrData = []
  value: string
  unixtime
  time: number
  date= new Date
  dateModify = this.date.getFullYear() + "-" + (this.date.getMonth()+1) + "-" + this.date.getDate()

  i: number = 0
  
  constructor(
    // private timeProvider : TimeProvider,
    public userS: UserService,
    public afData: AngularFireDatabase,
    public route: Router
    // public alertController: AlertController,
    ) {
      this.afData.list("/" + this.username + "/priority/").valueChanges().subscribe(data =>{
        this.arrData = data;
        console.log(this.arrData);
      })
    }

  // public data: Observable<TimeModel>  = this.timeProvider.getData()
  public data = Date.now();
  
  getDate(tim:number) {
    this.unixtime = tim/1000;
  }

  getLastDate(d:any ,v: any){
    if(d==this.dateModify){
      this.value = v
    }else{
      this.value = "Your Priority is not set yet"
    }
  }

  // async showAlert()
  // {
  //   const alert = await this.alertController.create({
  //     header: "Something's Wrong",
  //     subHeader: "Please re log-in",
  //     buttons: ['OK']
  //   })

  //   await alert.present()
  // }

  ngOnInit() {
    if(this.userS.getUser() == "None"){
      this.route.navigate(['/login']) 
    }
    setInterval(() => {
      this.time = this.unixtime+this.i
      this.i++
    },1000)
  }
}
