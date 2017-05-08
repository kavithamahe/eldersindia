import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../../pages/login/login';
/*
  Generated class for the Logout page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {
token:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage) {    
  	this.storage.clear();
    this.storage.ready().then(() => {
     this.storage.clear();
     this.storage.set('id','');
     this.storage.set('token','');
     this.navCtrl.setRoot(LoginPage);
 });
   }
}
