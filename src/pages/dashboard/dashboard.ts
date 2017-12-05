import { Component } from '@angular/core';
import {  Platform,NavController, NavParams,AlertController,ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CallNumber, Vibration} from 'ionic-native';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { LocalNotifications, Geolocation } from 'ionic-native';
import { NativeAudio } from '@ionic-native/native-audio';


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
  tabBarElement: any;
  constructor(private nativeAudio: NativeAudio,public platform: Platform,public alertCtrl: AlertController,private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder,public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams, public storage:Storage) {
  	 this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.storage.ready().then(() => {
      storage.get('token').then((token) => { this.token=token;  })
      storage.get('user_type').then((user_type) => { this.user_type=user_type;  })
      storage.get('call_sponsor').then((call_sponsor) => { this.call_sponsor=call_sponsor;  })
      storage.get('ambulance').then((ambulance) => { this.ambulance=ambulance;  })
      storage.get('police').then((police) => { this.police=police;  })
  });
    this.fetchLocation();
     //alert(this.call_sponsor);
  }
   ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
   fetchLocation(){
    if (!this.platform.is('cordova')) {
      console.warn("Location not initialized. Cordova is not available - Run in physical device");
      return;
    }
  this.platform.ready().then(() => {
      Geolocation.getCurrentPosition().then(
      (data) => {
            this.getLocation(data.coords.latitude,data.coords.longitude);
        },
        (err) =>{
          let confirmAlert = this.alertCtrl.create({
          subTitle: 'switch-ON GPS to get current Location.',
          buttons: [{
            text: 'OK',
            role: 'cancel',
          }]
        });
        confirmAlert.present();
            console.log("error in fetching Geo Location: ",err);
        });
  });

}

  getLocation(d1,d2){
    this.nativeGeocoder.reverseGeocode(d1, d2)
  .then(
    (result: NativeGeocoderReverseResult) => {
      this.storage.ready().then(() => {
      this.storage.set('service_location',"");
    });
    console.log('The address is ' + result.street + ' in ' + result.city+ 'result is : ' + result.district)
    })
    
  .catch((error: any) => console.log(error));
  }

  ionViewDidLoad() {
    this.nativeAudio.preloadSimple('uniqueId1', 'assets/sound/Siren 21.mp3').then(this.onSuccess, this.onError);
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
    if(number)
    {
    CallNumber.callNumber(number, true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));
   }
   else
   {
    this.showToaster("There is no contact number");
   }
  }
  public hooter(hooterOn)
  {
    if(!hooterOn)
    {
       this.hooterOn=!hooterOn;
       this.nativeAudio.preloadSimple('uniqueId1', 'assets/sound/Siren 21.mp3').then(this.onSuccess, this.onError);
this.nativeAudio.play('uniqueId1').then(this.onSuccess, this.onError);

    }
    else
    {
      Vibration.vibrate(0);
      this.nativeAudio.stop('uniqueId1').then(this.onSuccess,this.onError);
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
