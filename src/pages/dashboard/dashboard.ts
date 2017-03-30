import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {CallNumber, Vibration} from 'ionic-native';

import { ServiceprovidersPage } from '../../pages/serviceproviders/serviceproviders';
import { JobboardPage } from '../../pages/jobboard/jobboard';
import { CommunitylistPage } from '../../pages/communitylist/communitylist';
import { BlogsPage } from '../../pages/blogs/blogs';
import { ConnectionsPage } from '../../pages/connections/connections';
import { MessagesPage } from '../../pages/messages/messages';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage) {
  	this.storage.ready().then(() => {
      storage.get('token').then((token) => { this.token=token;  })
      storage.get('user_type').then((user_type) => { this.user_type=user_type;  })
      storage.get('call_sponsor').then((call_sponsor) => { this.call_sponsor=call_sponsor;  })
      storage.get('ambulance').then((ambulance) => { this.ambulance=ambulance;  })
      storage.get('police').then((police) => { this.police=police;  })
  });
     //alert(this.call_sponsor);
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }*/
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
  	this.navCtrl.setRoot(BlogsPage);
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
    CallNumber.callNumber(number, true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));
  }
  public hooter()
  {
    Vibration.vibrate(5000);
    
  }
}
