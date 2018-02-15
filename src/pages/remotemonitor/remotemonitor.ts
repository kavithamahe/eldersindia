import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { DashboardPage } from '../../pages/dashboard/dashboard';

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
  constructor(private iab: InAppBrowser,public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemotemonitorPagePage');
  }
 dashboardPage(){
    this.navCtrl.setRoot(DashboardPage);
  }
  submit(){
  	var usernames = this.username;
  	var passwords = this.password;
  	  const browser = this.iab.create("http://eldercam1.dlinkddns.com:8033/mjpeg.cgi?user="+usernames+"&password="+passwords+" ");
  }
}
