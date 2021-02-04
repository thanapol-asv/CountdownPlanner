import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { HttpClientModule } from '@angular/common/http';
import { LoginProvider } from 'src/providers/login';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [LoginPage],
  providers: [LoginProvider]
})
export class LoginPageModule {}
