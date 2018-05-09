import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';


import { DashboardPage } from '../../pages/dashboard/dashboard';

declare var startApp;
 

/*
  Generated class for the RemotemonitorPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-remotemonitor',
  templateUrl: 'remotemonitor.html'
})
export class RemotemonitorPagePage {
username:any;
password:any;
url:any;
Cctv_camera:any;
usernames:any;
passwords:any;
  constructor(public storage:Storage,public navCtrl: NavController, public navParams: NavParams) {
   this.storage.ready().then(() => {
    storage.get('usernames').then((usernames) => { this.usernames=usernames; })
    storage.get('passwords').then((passwords) => { this.passwords=passwords;  })
    storage.get('Cctv_camera').then((Cctv_camera) => { this.Cctv_camera=Cctv_camera; 
   console.log("fdgdfg" +this.Cctv_camera); })
  });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemotemonitorPagePage');
  }
 dashboardPage(){
    this.navCtrl.setRoot(DashboardPage);
  }
  submit(){
   
      var usernames = this.username;
    var passwords = this.password;
    
    var remoteurl = this.url;
     this.storage.ready().then(() => {
       this.storage.set('usernames',usernames);
       this.storage.set('passwords',passwords);
      this.storage.set('Cctv_camera',"http://"+usernames+":"+passwords+"@"+remoteurl+"" );
    });
     this.navCtrl.setRoot(DashboardPage);
    
  	
  	 
  }
}
