import { Component } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Platform,NavController, NavParams,AlertController,ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CallNumber, Vibration} from 'ionic-native';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { LocalNotifications, Geolocation } from 'ionic-native';
import { NativeAudio } from '@ionic-native/native-audio';

import { ServiceProvider } from '../../providers/service-provider';
import { ServiceprovidersPage } from '../../pages/serviceproviders/serviceproviders';
import { JobboardPage } from '../../pages/jobboard/jobboard';
import { CommunitylistPage } from '../../pages/communitylist/communitylist';
import { BlogsPage } from '../../pages/blogs/blogs';
import { ConnectionsPage } from '../../pages/connections/connections';
import { MessagesPage } from '../../pages/messages/messages';
import { RemotemonitorPagePage } from '../../pages/remotemonitor/remotemonitor';
declare var startApp;
declare var google;


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
  serviceLocation:any;
  headers:any;
  head:any;
  sponsor_avatar:any;
  url:any;
  Cctv_camera:any;
  lat:any;
  long:any;
  constructor(private nativeAudio: NativeAudio,public providerService: ServiceProvider,public platform: Platform,public alertCtrl: AlertController,private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder,public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams, public storage:Storage) {
  	storage.get('Cctv_camera').then((Cctv_camera) => { this.Cctv_camera=Cctv_camera; 
   console.log("fdgdfg" +this.Cctv_camera); })
     this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.url=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
       this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Authorization', 'Bearer ' + this.token);
      this.head = new RequestOptions({ headers: this.headers });
    this.fetchLocation();
    this.map1();
  })
      storage.get('user_type').then((user_type) => { this.user_type=user_type; 
      console.log(this.user_type); })
      storage.get('call_sponsor').then((call_sponsor) => { this.call_sponsor=call_sponsor;  })
       this.storage.get('sponsor_avatar').then((sponsor_avatar) => { this.sponsor_avatar=sponsor_avatar; })
      storage.get('ambulance').then((ambulance) => { this.ambulance=ambulance; })
      storage.get('police').then((police) => { this.police=police;  })
  });
    
  }
    map1()
  {
      Geolocation.getCurrentPosition().then((position) => {
      this.lat=position.coords.latitude;
      this.long=position.coords.longitude;
      });

  }
   ionViewWillEnter() {
     this.storage.get('sponsor_avatar').then((sponsor_avatar) => { this.sponsor_avatar=sponsor_avatar; })
     
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
    console.log(this.head);
    this.nativeGeocoder.reverseGeocode(d1, d2)
  .then(
    (result: NativeGeocoderReverseResult) => {
     
    console.log('The address is ' + result.street + ' in ' + result.city+ 'result is : ' + result.district)
    this.providerService.chechLocationID(result.city,this.head)
      .subscribe(data =>{
      this.serviceLocation=data.result.id;
       this.storage.ready().then(() => {
      this.storage.set('service_location',this.serviceLocation);
    });
    },
    err =>{
      this.providerService.showErrorToast(err);
      
    })

    })
    
  .catch((error: any) => console.log(error));
  }

  ionViewDidLoad() {
    this.nativeAudio.preloadSimple('uniqueId1', 'assets/sound/Siren 21.mp3').then(this.onSuccess, this.onError);
  }
  remote(){
  this.storage.get('Cctv_camera').then((Cctv_camera) => { this.Cctv_camera=Cctv_camera; 
   console.log("fdgdfg" +this.Cctv_camera); })
  if(this.Cctv_camera == undefined){
    this.navCtrl.push(RemotemonitorPagePage);
  }else{
    startApp.set({
      "action": "ACTION_SEND",
      "package": "com.claritaz.ipplayer",
      "type": "text/plain",
      "uri": "+918958312000"
      }, {
         "extraKey2":this.Cctv_camera,
                // "extraKey2":"http://192.168.1.46:8033/mjpeg.cgi?",
                // "username":"admin",
                // "password":"ctl",

      "EXTRA_TEXT":"",
      "chat": true
      }).start();
  }
  
    
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
