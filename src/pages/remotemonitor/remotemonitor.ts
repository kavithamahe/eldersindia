import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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
  constructor(private iab: InAppBrowser,public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemotemonitorPagePage');
  }
 dashboardPage(){
    this.navCtrl.setRoot(DashboardPage);
  }
  submit(){
    // var videoUrl = "http://eldercam1.dlinkddns.com:8033/mjpeg.cgi?user=[remoteview]&password=[elder!@#]";

    // http://eldercam1.dlinkddns.com:8033/mjpeg.cgi?
  	var usernames = this.username;
  	var passwords = this.password;
    var remoteurl = this.url;
  	  // const browser = this.iab.create(""+remoteurl+"user="+usernames+"&password="+passwords+" ");
     startApp.set({
"action": "ACTION_SEND",
"package": "com.claritaz.ipplayer",
"type": "text/plain",
"uri": "+918958312000"
}, {
  "extraKey2":""+remoteurl+"user="+usernames+"&password="+passwords+" ",
"EXTRA_TEXT":"Text...by vkm ",
"chat": true
}).start();
  }
}
