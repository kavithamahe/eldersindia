import { Component } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Platform,NavController, NavParams,AlertController,ToastController,LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CallNumber, Vibration} from 'ionic-native';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { LocalNotifications, Geolocation } from 'ionic-native';
import { NativeAudio } from '@ionic-native/native-audio';
import { InAppBrowser } from 'ionic-native';
import { Device } from "@ionic-native/device";

import { ServiceProvider } from '../../providers/service-provider';
import { ServicerequestPage } from '../../pages/servicerequest/servicerequest';
import { ServiceprovidersPage } from '../../pages/serviceproviders/serviceproviders';
import { JobboardPage } from '../../pages/jobboard/jobboard';
import { CommunitylistPage } from '../../pages/communitylist/communitylist';
import { BlogsPage } from '../../pages/blogs/blogs';
import { ConnectionsPage } from '../../pages/connections/connections';
import { MessagesPage } from '../../pages/messages/messages';
import { RemotemonitorPagePage } from '../../pages/remotemonitor/remotemonitor';
import { NotificationsPage } from '../../pages/notifications/notifications';

import { SafemePagePage } from '../../pages/safeme/safeme';

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
  phone:any;
  sponsor_avatar:any;
  url:any;
  Cctv_camera:any;
  elder_mobile_imei:any;
  lat:any;
  long:any;
  street:any;
  city:any;
  sponsor_name:any;
  elder_name:any;
  elder_lastname:any;
  doctor:any;
  hospital:any;
  urls:any;
  emergency_url:any;
  user_type_id:any;
  safeme_status:any;
  helpme_status:any;
  vendor_id:any;
  apiData:any = [];
  sponsor_id:any;
  id:any;
  safehelpdetails:any=[];
  unreadCount:any;
  get_notification:any=[];
  constructor(private nativeAudio: NativeAudio,public nativeGeocoder:NativeGeocoder,private device: Device,public loadingCtrl: LoadingController,public providerService: ServiceProvider,public platform: Platform,public alertCtrl: AlertController,private geolocation: Geolocation,public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams, public storage:Storage) {
    storage.get('Cctv_camera').then((Cctv_camera) => { this.Cctv_camera=Cctv_camera; })
  	storage.get('elder_mobile_imei').then((elder_mobile_imei) => { this.elder_mobile_imei=elder_mobile_imei; })
    
    this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.url=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
       this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Authorization', 'Bearer ' + this.token);
      this.head = new RequestOptions({ headers: this.headers });
      this.fetchLocation();
      this.map();
      this.getNotification();
  })
      storage.get('user_type').then((user_type) => { this.user_type=user_type; })
       this.storage.get('name').then((name) => { this.elder_name=name;})
       this.storage.get('lastname').then((lastname) => { this.elder_lastname=lastname;})
        this.storage.get('lat').then((lat) => { this.lat=lat;  })
       this.storage.get('long').then((long) => { this.long=long;  })
       storage.get('call_sponsor').then((call_sponsor) => { this.call_sponsor=call_sponsor; 
       console.log(this.call_sponsor); })
       this.storage.get('sponsor_avatar').then((sponsor_avatar) => { this.sponsor_avatar=sponsor_avatar; })
       this.storage.get('sponsor_name').then((sponsor_name) => { this.sponsor_name=sponsor_name;})
       this.storage.get('sponsor_id').then((sponsor_id) => { this.sponsor_id=sponsor_id;})
      storage.get('ambulance').then((ambulance) => { this.ambulance=ambulance; })
      storage.get('police').then((police) => { this.police=police;  })
      storage.get('phone').then((phone) => { this.phone=phone; })
      storage.get('doctor').then((doctor) => { this.doctor=doctor;  })
      storage.get('hospital').then((hospital) => { this.hospital=hospital;  })
      storage.get('user_type_id').then((user_type_id) => { this.user_type_id=user_type_id;  })
      storage.get('id').then((id) => { this.id=id; 
      this.checksafehelpStatus(this.id);
       })
      // storage.get('safeme_status').then((safeme_status) => { this.safeme_status=safeme_status;  })
      // storage.get('helpme_status').then((helpme_status) => { this.helpme_status=helpme_status;  })
      storage.get('vendor_id').then((vendor_id) => { this.vendor_id=vendor_id;  })
      storage.get('lat').then((lat) => { this.lat=lat; 
      console.log(this.lat); })
       storage.get('long').then((long) => { this.long=long; 
      console.log(this.long); })
  });
    
  }

   ionViewWillEnter() {
    this.storage.get('imageurl').then((imageurl) => { this.url=imageurl;});
    this.storage.get('call_sponsor').then((call_sponsor) => { this.call_sponsor=call_sponsor;})
     this.storage.get('user_type').then((user_type) => { this.user_type=user_type; })
     this.storage.get('name').then((name) => { this.elder_name=name; })
     this.storage.get('lastname').then((lastname) => { this.elder_lastname=lastname;})
     this.storage.get('phone').then((phone) => { this.phone=phone; })
     this.storage.get('ambulance').then((ambulance) => { this.ambulance=ambulance; })
     this.storage.get('sponsor_avatar').then((sponsor_avatar) => { this.sponsor_avatar=sponsor_avatar; })
     this.storage.get('sponsor_name').then((sponsor_name) => { this.sponsor_name=sponsor_name;})
     this.storage.get('sponsor_id').then((sponsor_id) => { this.sponsor_id=sponsor_id;})
     this.storage.get('user_type_id').then((user_type_id) => { this.user_type_id=user_type_id;  })
     // this.storage.get('safeme_status').then((safeme_status) => { this.safeme_status=safeme_status;  })
     // this.storage.get('helpme_status').then((helpme_status) => { this.helpme_status=helpme_status;  })
     this.storage.get('vendor_id').then((vendor_id) => { this.vendor_id=vendor_id;  })
      this.storage.get('police').then((police) => { this.police=police;  })
      this.storage.get('doctor').then((doctor) => { this.doctor=doctor;  })
      this.storage.get('id').then((id) => { this.id=id;
        this.checksafehelpStatus(this.id);
        })
      this.storage.get('hospital').then((hospital) => { this.hospital=hospital;  })
      this.storage.get('lat').then((lat) => { this.lat=lat;  })
      this.storage.get('long').then((long) => { this.long=long;  })
           this.storage.get('token').then((token) => { this.token=token; 
       this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Authorization', 'Bearer ' + this.token);
      this.head = new RequestOptions({ headers: this.headers });
      this.fetchLocation();
      this.map();
      this.getNotification();
  })
  }
  getNotification(){
          this.providerService.getNotifications(this.head)
      .subscribe(data =>{
        this.get_notification = data.result.info.list;
        this.unreadCount = data.result.info.unreadCount;
    },
    err =>{
      // this.providerService.showErrorToast(err);
      })
  }
  getnotificationview(){
    this.navCtrl.push(NotificationsPage,{"get_notification":this.get_notification});
  }
  checksafehelpStatus(id){
         this.providerService.checksafeHelpStatus(id,this.head)
      .subscribe(data =>{
        this.safehelpdetails = data.details;
        this.safeme_status = this.safehelpdetails.safeme_status;
        this.helpme_status = this.safehelpdetails.helpme_status;
    },
    err =>{
      // this.providerService.showErrorToast(err);
      })
    }
   ngAfterViewInit(){
this.map();
  }
  map(){
    this.platform.ready().then(()=>{
//       Geolocation.getCurrentPosition().then((position) => {
//       this.lat=position.coords.latitude;
//       this.long=position.coords.longitude;
//       this.storage.set('lat', this.lat);
//       this.storage.set('long', this.long);

//     this.urls = 'https://www.google.com/maps/place/'+this.lat+ ',' + this.long;
// });
    })
  }
  urlss:any;
     shareLocation()
  {
    console.log(this.lat);
    if(this.lat == undefined || this.lat == "" || this.lat == null){
      this.providerService.showToast("Please check your gps location on or not and then try again.");
    }
    else{
    this.urlss = 'https://www.google.com/maps/place/'+this.lat+ ',' + this.long;
      let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
   this.providerService.elderEmergencySms(this.urlss,this.call_sponsor,this.sponsor_name,this.elder_name,this.elder_lastname,this.head)
      .subscribe(data =>{
      this.providerService.showToast(data.result);
      loading.dismiss();
    },
    err =>{
      loading.dismiss();
      this.providerService.showErrorToast(err);
      })

  }
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
        //   let confirmAlert = this.alertCtrl.create({
        //   subTitle: 'switch-ON GPS to get current Location.',
        //   buttons: [{
        //     text: 'OK',
        //     role: 'cancel',
        //   }]
        // });
        // confirmAlert.present();
            console.log("error in fetching Geo Location: ",err);
        });
  });

}

  getLocation(d1,d2){
    this.nativeGeocoder.reverseGeocode(d1,d2)
  .then((result: NativeGeocoderReverseResult[]) => {console.log(JSON.stringify(result[0].locality))
     this.providerService.chechLocationID(JSON.stringify(result[0].locality),this.head)
      .subscribe(data =>{
      this.serviceLocation=data.result.id;
      console.log("this.serviceLocation" +this.serviceLocation);
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
//     let options: StreamingVideoOptions = {
//   successCallback: () => { console.log('Video played') },
//   errorCallback: (e) => { console.log('Error streaming') },
//   orientation: 'landscape',
//   shouldAutoClose: true,
//   controls: false
// };

// this.streamingMedia.playVideo('http://camview:12345@eldercam1.dlinkddns.com:8033/mjeg.cgi?', options);
     this.storage.get('Cctv_camera').then((Cctv_camera) => { this.Cctv_camera=Cctv_camera; 
   console.log("fdgdfg" +this.Cctv_camera); })
  if(this.Cctv_camera == undefined){
    this.navCtrl.push(RemotemonitorPagePage);
  }else{
     this.platform.ready().then(() => {
            let browser = new InAppBrowser(this.Cctv_camera,'_blank');

        });
   }
 
  }
  apilog(){
    this.navCtrl.setRoot(SafemePagePage,{"apiData":this.apiData});
  }
  safeMe(){
       Geolocation.getCurrentPosition().then((position) => {
      this.lat=position.coords.latitude;
      this.long=position.coords.longitude;
    if(this.safeme_status != '1'){
      this.providerService.showToast("Service not availed");
    }
    else{
       let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
         this.providerService.safemeUser(this.phone,this.lat,this.long,this.user_type_id,this.vendor_id,this.sponsor_id,this.device.uuid,this.head)
      .subscribe(data =>{
        if(data.result){
          this.apiData = data.result.Data;
          this.providerService.showToast(data.result.success_msg);
          this.providerService.showToast(data.result.error_msg);
          loading.dismiss();
        }
        else{
          this.apiData=[];
          this.providerService.showToast(data.error);
          loading.dismiss();
        }
    },
    err =>{
      loading.dismiss();
      this.providerService.showErrorToast(err);
      })
    }
  })
  
    }
  helpMe(){
      Geolocation.getCurrentPosition().then((position) => {
      this.lat=position.coords.latitude;
      this.long=position.coords.longitude;

    if(this.helpme_status != '1'){
      this.providerService.showToast("Service not availed");
    }
    else{
       let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
          this.providerService.helpmeUser(this.phone,this.lat,this.long,this.user_type_id,this.vendor_id,this.sponsor_id,this.device.uuid,this.head)
      .subscribe(data =>{
         if(data.result){
          this.apiData = data.result.Data;
          this.providerService.showToast(data.result.success_msg);
          this.providerService.showToast(data.result.error_msg);
          loading.dismiss();
        }
        else{
          this.apiData=[];
          this.providerService.showToast(data.error);
          loading.dismiss();
        }
    },
    err =>{
      loading.dismiss();
      this.providerService.showErrorToast(err);
      })
    }
  })
    }
  public serviceRequests(){
    this.navCtrl.setRoot(ServicerequestPage);
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
    this.showToaster("Number is not configured");
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
