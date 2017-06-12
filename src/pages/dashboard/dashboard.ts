import { Component } from '@angular/core';
import { NavController, NavParams ,ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {CallNumber, Vibration, NativeAudio} from 'ionic-native';

import { ServiceprovidersPage } from '../../pages/serviceproviders/serviceproviders';
import { JobboardPage } from '../../pages/jobboard/jobboard';
import { CommunitylistPage } from '../../pages/communitylist/communitylist';
import { BlogsPage } from '../../pages/blogs/blogs';
import { ConnectionsPage } from '../../pages/connections/connections';
import { MessagesPage } from '../../pages/messages/messages';
import { BlogtabsPage } from '../../pages/blogtabs/blogtabs';

/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
	name:string;
	token:string;
  user_type:string;
  police:any;
  ambulance:any;
  call_sponsor:any;
  hooterOn:boolean=false;
  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams, public storage:Storage) {
  	this.storage.ready().then(() => {
      storage.get('token').then((token) => { this.token=token;  })
      storage.get('user_type').then((user_type) => { this.user_type=user_type;  })
      storage.get('call_sponsor').then((call_sponsor) => { this.call_sponsor=call_sponsor;  })
      storage.get('ambulance').then((ambulance) => { this.ambulance=ambulance;  })
      storage.get('police').then((police) => { this.police=police;  })
  });
     //alert(this.call_sponsor);
  }

  ionViewDidLoad() {
    NativeAudio.preloadSimple('uniqueId1', 'assets/sound/siren_msg_tone.mp3').then(this.onSuccess, this.onError);
  }
  public servicesPage()
  {
  	this.navCtrl.setRoot(ServiceprovidersPage);
  }
  public jobsPage()
  {
  	this.navCtrl.setRoot(JobboardPage);
  }
  public communityPage()
  {
  	this.navCtrl.setRoot(CommunitylistPage);
  }
  public blogsPage()
  {
    //alert("token"+this.token);
  	this.navCtrl.setRoot(BlogtabsPage);
  }
  public connectionsPage()
  {
  	this.navCtrl.setRoot(ConnectionsPage);
  }
  public messagesPage()
  {
  	this.navCtrl.setRoot(MessagesPage);
  }
  public makeCall(number)
  {
    if(number)
    {
    CallNumber.callNumber(number, true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));
   }
   else
   {
    this.showToaster("There is no contact nuber");
   }
  }
  public hooter(hooterOn)
  {
    if(!hooterOn)
    {
       this.hooterOn=!hooterOn;
    Vibration.vibrate(60000);    
    NativeAudio.play('uniqueId1').then(this.onSuccess, this.onError);
    NativeAudio.loop('uniqueId1').then(this.onSuccess1, this.onError);
    }
    else
    {
      Vibration.vibrate(0);
       NativeAudio.stop('uniqueId1').then(this.onSuccess, this.onError);
      this.hooterOn=!hooterOn;
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
  onSuccess=function()
   {
     console.log("onSuccess");
   }
   onError=function()
   {
     console.log("onError");
   }
   onSuccess1=function(){ console.log('loop')};
}
