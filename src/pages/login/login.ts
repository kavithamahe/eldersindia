import { Component } from '@angular/core';
import { Platform,NavController, NavParams,AlertController, LoadingController, ModalController, ToastController,MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from 'ionic-native';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
//import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
//import { Diagnostic } from 'ionic-native';
//import { CameraPreview, CameraPreviewRect } from 'ionic-native';

import { Login } from '../../models/login';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { FirsttimeloginPagePage } from '../../pages/firsttimelogin/firsttimelogin';


import { LoginUser } from '../../providers/login-user';
import { AppConfig } from '../../providers/app-config';
import { ServiceProvider } from '../../providers/service-provider'
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { CommunityServices } from '../../providers/community-services';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
	selector: 'page-login',
   templateUrl: 'login.html',
   providers:[CommunityServices],
})
export class LoginPage {
  loginuser: Login[];

  passwordCode:any;
  mailID:any;
  newPassword:any;
  id:any='';
  loginForm: FormGroup;
  submitAttempt: boolean = false;
  registerCredentials = {email: '', password: ''};
  callSponsor:any=0;
  ambulance:any=0;
  police:any=0;
  constructor(public menuCtrl: MenuController, public community_service:CommunityServices, public service:ServiceProvider, public formBuilder: FormBuilder,public alertCtrl: AlertController, public modalCtrl:ModalController,public platform: Platform, public navCtrl: NavController, public navParams: NavParams,public loginUser: LoginUser,public loadingCtrl: LoadingController,public toastCtrl: ToastController, public storage:Storage,public appConfig:AppConfig) {
  this.storage.ready().then(() => { 
     storage.get('id').then((id) => { this.id=id; 
     });

    });
    this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])]
         });
    //this.fetchLocation();
    // this.checkPermissions();
    // this.initializePreview();

  }
   public login() {  
    if(!this.loginForm.valid){
      this.submitAttempt = true;
    }else{
      this.submitAttempt = false;
      this.registerCredentials.email = this.loginForm.value.email; 
      this.registerCredentials.password = this.loginForm.value.password; 
    
     let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });     
    loader.present();

   	this.loginUser.loginload(this.registerCredentials).subscribe(     
      (loginuser) => {
          console.log("you can login");
          this.service.serviceInit(loginuser['token']);
          this.community_service.initialize();

         if(loginuser['details']['user_type'] == 'elder'){
           this.loginUser.currentUser("elder");
         }else{
           this.loginUser.currentUser("sponsor");
         }
         this.storage.ready().then(() => {
           this.storage.clear();
         this.storage.set('id', loginuser['details']['id']);
         this.storage.set('name', loginuser['details']['name']);
         this.storage.set('email', loginuser['details']['email']);
          this.storage.set('password',this.registerCredentials.password);
         this.storage.set('user_type', loginuser['details']['user_type']);
         this.storage.set('user_type_id', loginuser['details']['user_type_id']);
         this.storage.set('avatar', loginuser['details']['avatar']);
         if(loginuser['details']['user_type']=='elder' && (loginuser.details.emergency_contacts.length>0))
         {
         if(loginuser.details.emergency_contacts[0].call_sponsor!='undefined')
         {
          this.callSponsor= loginuser.details.emergency_contacts[0].call_sponsor;
          console.log("callSponsor"+this.callSponsor);
         }
         
         if(loginuser.details.emergency_contacts[0].ambulance!='undefined')
         {
           this.ambulance=loginuser.details.emergency_contacts[0].ambulance;
         }
         if(loginuser.details.emergency_contacts[0].police!='undefined')
         {
           this.police=loginuser.details.emergency_contacts[0].police;
         }
         this.storage.set('call_sponsor', this.callSponsor);
         this.storage.set('ambulance', this.ambulance);
         this.storage.set('police', this.police);
         }
         this.storage.set('token', loginuser['token']);
         this.storage.set('imageurl',this.appConfig.setImageurl());
         this.storage.set('rooturl',this.appConfig.setrooturl());
         // this.storage.set('service_location','');
         this.storage.set('islogin',1);
         this.enableUserTypeMenu(loginuser['details']['user_type']);
         console.log(loginuser['details']['user_type']);
         if(loginuser['details']['user_type'] != 'vendor' && loginuser['details']['user_type'] != 'admin'){
             if(loginuser.details.first_login == 1)
             {
              this.navCtrl.setRoot(DashboardPage);
             }
             else{
               this.navCtrl.setRoot(FirsttimeloginPagePage);
             }
          }else{

             this.showToaster("Try with different credentials");
          }
          
       })
        // alert(loginuser['token']);
        loader.dismiss();
    },

    (err) => { 
        console.log("you can not login");
        console.log(err);
        if(err.status===401)
        {
        this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Try again later");
        }
        loader.dismiss();  
    },
  )   
  }
  }
  showToaster(message)
  {
   let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
        });
   toast.present();
  }
  enableUserTypeMenu(userType) {
  if(userType=='sponsor'){
  this.menuCtrl.enable(true, 'sponsor');
  this.menuCtrl.enable(false, 'elder');
  }
  else
  {
  this.menuCtrl.enable(true, 'elder');
  this.menuCtrl.enable(false, 'sponsor');
  }
  }

  forgotPassword(){
    this.passwordCode ="";
    this.createModal("forgotPassword");
  }

  resetPassword(){
      this.passwordCode = "1234";
      this.createModal("passwordReset");
  }

  createModal(requestData){
        let requestType = {modalType:requestData,passCode:this.passwordCode};
        let passwordModal = this.modalCtrl.create(ForgotPasswordPage,requestType);

    passwordModal.onDidDismiss(data =>{
      if(data == "dismiss"){
        console.log(" Forgot Password modal dismissed..!");
      }else{
            if(data.modalType == "forgotPassword"){
                this.mailID = data.modalData.emailId;
                alert(this.mailID);
                // this.serviceRequestCall(data);

                  if(this.platform.is('cordova')){
                      LocalNotifications.schedule({
                              title: "Password Reset",
                              text: "password Reset code is 1234",
                              at: new Date(new Date().getTime() + 2 * 1000),
                              // sound: null
                          });
                    console.log("forgot Password modal submitted..!");

                    LocalNotifications.on("click", (notification, state) => {
                    let alert = this.alertCtrl.create({
                        title: "Notification Clicked",
                        subTitle: "You just clicked the scheduled notification",
                        buttons: ["OK"]
                        });
                      alert.present();
                      });
                      
                    }else{
                      console.log("current platform is not cordova..");
                    }
                    this.resetPassword();
            }else{
                this.newPassword = data.modalData.newPassword;
                this.showToaster("Password Reset Successful..!");
            }
        }
      })  
    passwordModal.present();


  }
  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
}
  /*ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }*/
//   fetchLocation(){
//     if (!this.platform.is('cordova')) {
//       console.warn("Location not initialized. Cordova is not available - Run in physical device");
//       return;
//     }
//   this.platform.ready().then(() => {
//       Geolocation.getCurrentPosition().then(
//       (data) => {
//             console.log('My latitude : ', data.coords.latitude);
//             console.log('My longitude: ', data.coords.longitude);
//             this.getLocation(data.coords.latitude,data.coords.longitude);
//         },
//         (err) =>{
//           let confirmAlert = this.alertCtrl.create({
//           subTitle: 'switch-ON GPS to get current Location.',
//           buttons: [{
//             text: 'OK',
//             role: 'cancel',
//           }]
//         });
//         confirmAlert.present();
//             console.log("error in fetching Geo Location: ",err);
//         });
//   });

// }

//   getLocation(d1,d2){
// console.log("location ready");
//     this.nativeGeocoder.reverseGeocode(d1, d2)
//   .then(
//     (result: NativeGeocoderReverseResult) => {
//       this.storage.ready().then(() => {
//       this.storage.set('service_location',result.city);
//     });
//     console.log('The address is ' + result.street + ' in ' + result.city+ 'result is : ' + result.district)
//     })
    
//   .catch((error: any) => console.log(error));
//   }
//   checkPermissions() {
//     Diagnostic.isCameraAuthorized().then((authorized) => {
//     if(authorized)
//         this.initializePreview();
//     else {
//         Diagnostic.requestCameraAuthorization().then((status) => {
//             if(status == Diagnostic.permissionStatus.GRANTED)
//                 this.initializePreview();
//             else {
//                 // Permissions not granted
//                 // Therefore, create and present toast
//                 this.toastCtrl.create(
//                     {
//                         message: "Cannot access camera", 
//                         position: "bottom",
//                         duration: 5000
//                     }
//                 ).present();
//             }
//         });
//     }
// });
// }
// initializePreview() {
//     // Make the width and height of the preview equal 
//     // to the width and height of the app's window
//     let previewRect: CameraPreviewRect = {
//       x: 0,
//       y: 0,
//       width: window.innerWidth,
//       height: window.innerHeight
//     };
 
//     // More code goes here
// }
}
