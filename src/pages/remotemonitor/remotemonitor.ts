import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


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
url:any;
Cctv_camera:any;
usernames:any;
passwords:any;
urls:any;
  constructor(public storage:Storage,public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController) {
   this.storage.ready().then(() => {
    storage.get('usernames').then((usernames) => { this.usernames=usernames; })
    storage.get('passwords').then((passwords) => { this.passwords=passwords;  })
    storage.get('urls').then((urls) => { this.urls=urls; })
  });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemotemonitorPagePage');
  }
 dashboardPage(){
    this.navCtrl.setRoot(DashboardPage);
  }
  submit(){
   console.log(this.username);
      var usernames = this.username;
    var passwords = this.password;
    
    var remoteurl = this.url;
     this.storage.ready().then(() => {
       this.storage.set('usernames',usernames);
       this.storage.set('passwords',passwords);
       this.storage.set('urls',remoteurl);
       // http://camview.12345@eldercam1.dlinkddns.com:8033/mjeg.cgi?
       this.storage.set('Cctv_camera',"http://"+usernames+":"+passwords+"@"+remoteurl+"" );
    });
     if(this.username != undefined && this.password != undefined && this.url != undefined){
      this.navCtrl.setRoot(DashboardPage);
     }
     else{
      this.showToaster("Please Enter All The Details");
     }
   }
    public showToaster(message)
  {
   let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
        });
   toast.present();
  }
}
