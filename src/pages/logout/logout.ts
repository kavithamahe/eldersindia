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
Cctv_camera:any;
usernames:any;
passwords:any;
urls:any;
service_location:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage) {    
  	this.storage.get('Cctv_camera').then((Cctv_camera) => { this.Cctv_camera=Cctv_camera;
 this.storage.set('Cctv_camera',this.Cctv_camera);
})
      storage.get('usernames').then((usernames) => { this.usernames=usernames;
      this.storage.set('usernames',this.usernames); })
       storage.get('service_location').then((service_location) => { this.service_location=service_location;
      this.storage.set('service_location',this.service_location); })
    storage.get('passwords').then((passwords) => { this.passwords=passwords; 
    this.storage.set('passwords',this.passwords); })
    storage.get('urls').then((urls) => { this.urls=urls;
    this.storage.set('urls',this.urls); })
    this.storage.clear();
    this.storage.ready().then(() => {
     this.storage.clear();
     this.storage.set('id','');
     this.storage.set('token','');
     this.navCtrl.setRoot(LoginPage);
 });
   }
}
