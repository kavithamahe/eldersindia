import { Component } from '@angular/core';
import { Platform,NavController, NavParams,AlertController, LoadingController, ModalController, ToastController,MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LocalNotifications, Geolocation } from 'ionic-native';
import { Login } from '../../models/login';
import { DashboardPage } from '../../pages/dashboard/dashboard';


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
  hospital:any=0;
  doctor:any=0;
  device_uuid:any;
  sponsor_name:any;
  sponsor_id:any;
  sponsor_last:any;
  lat:any;
  long:any;
  
  constructor(public menuCtrl: MenuController,public community_service:CommunityServices, public service:ServiceProvider, public formBuilder: FormBuilder,public alertCtrl: AlertController, public modalCtrl:ModalController,public platform: Platform, public navCtrl: NavController, public navParams: NavParams,public loginUser: LoginUser,public loadingCtrl: LoadingController,public toastCtrl: ToastController, public storage:Storage,public appConfig:AppConfig) {
 
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
 
 
  pressevent(){
    this.forgotPassword();
  }
  pressLogin(){
    console.log("pavan");
    this.login();
  }
   public login() {  
    // this.registerCredentials.device_token = this.device_uuid;
    // console.log(this.registerCredentials.device_token);
    // if (this.platform.is('ios')) {
    //   this.registerCredentials.device_type = "1";
    // }
    // if (this.platform.is('android')) {
    //   this.registerCredentials.device_type = "0";
    //  }
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
          if(loginuser['details']['user_type'] != 'vendor' && loginuser['details']['user_type'] != 'admin'){
             // if(loginuser.details.first_login == 1)
             // {

              this.navCtrl.setRoot(DashboardPage);
             // }
             // else{
             //   this.navCtrl.setRoot(FirsttimeloginPagePage);
             // }
        
          this.service.serviceInit(loginuser['token']);
          this.community_service.initialize();

         if(loginuser['details']['user_type'] == 'elder'){
           this.loginUser.currentUser("elder");
         }else{
           this.loginUser.currentUser("sponsor");
         }
         this.storage.ready().then(() => {
         // this.storage.clear();
         console.log(loginuser['details']);
         this.storage.set('id', loginuser['details']['id']);
         this.storage.set('name', loginuser['details']['name']);
         this.storage.set('lastname', loginuser['details']['lastname']);
         this.storage.set('elder_age', loginuser['details']['elder_age']);
         this.storage.set('email', loginuser['details']['email']);
         this.storage.set('phone', loginuser['details']['phone']);
         this.storage.set('password',this.registerCredentials.password);
         this.storage.set('user_type', loginuser['details']['user_type']);
         this.storage.set('user_type_id', loginuser['details']['user_type_id']);
         this.storage.set('avatar', loginuser['details']['avatar']);
         this.storage.set('sponsor_avatar', loginuser['details']['sponsor_avatar']);
         this.storage.set('sponsor_name', loginuser['details']['sponsor_name']);
         this.storage.set('safeme_status', loginuser['details']['safeme_status']);
         this.storage.set('helpme_status', loginuser['details']['helpme_status']);
         this.storage.set('vendor_id', loginuser['details']['vendor_id']);
         this.storage.set('elder_mobile_imei', loginuser['details']['elder_mobile_imei']);  
         if(loginuser['details']['user_type']=='elder')
         {
          this.storage.set('elder_mobile_imei', loginuser['details']['elder_mobile_imei']);
         }
         if(loginuser['details']['user_type']=='elder' && (loginuser.details.emergency_contacts.length>0))
         {
         if(loginuser.details.emergency_contacts[0].call_sponsor!='undefined')
         {
          this.callSponsor= loginuser.details.emergency_contacts[0].call_sponsor;
         }
         
         if(loginuser.details.emergency_contacts[0].ambulance!='undefined')
         {
           this.ambulance=loginuser.details.emergency_contacts[0].Ambulance;
         }
         if(loginuser.details.emergency_contacts[0].police!='undefined')
         {
           this.police=loginuser.details.emergency_contacts[0].Police;
         }
         if(loginuser.details.emergency_contacts[0].doctor!='undefined')
         {
           this.doctor=loginuser.details.emergency_contacts[0].Doctor;
         }
           if(loginuser.details.emergency_contacts[0].hospital!='undefined')
         {
           this.hospital=loginuser.details.emergency_contacts[0].Hospital;
         }
            if(loginuser.details.emergency_contacts[0].sponsor_name!='undefined')
         {
           this.sponsor_name=loginuser.details.emergency_contacts[0].sponsor_name;
         }
          if(loginuser.details.emergency_contacts[0].sponsor_name!='undefined')
         {
           this.sponsor_last=loginuser.details.emergency_contacts[0].sponsor_last;
         }
            if(loginuser.details.emergency_contacts[0].sponsor_id!='undefined')
         {
           this.sponsor_id=loginuser.details.emergency_contacts[0].sponsor_id;
         }
         this.storage.set('sponsor_id', this.sponsor_id);
         this.storage.set('sponsor_name', this.sponsor_name);
         this.storage.set('sponsor_last', this.sponsor_last);
         this.storage.set('call_sponsor', this.callSponsor);
         this.storage.set('ambulance', this.ambulance);
         this.storage.set('police', this.police);
         this.storage.set('doctor', this.doctor);
         this.storage.set('hospital', this.hospital);
         }
         this.storage.set('token', loginuser['token']);
         this.storage.set('imageurl',this.appConfig.setImageurl());
         this.storage.set('rooturl',this.appConfig.setrooturl());
         this.storage.set('islogin',1);
         this.enableUserTypeMenu(loginuser['details']['user_type']);
          Geolocation.getCurrentPosition().then((position) => {
      this.lat=position.coords.latitude;
      this.long=position.coords.longitude;
      console.log(this.lat);
      this.storage.set('lat', this.lat);
      this.storage.set('long', this.long);
    });

          
       })
      
        loader.dismiss();
      }
      else{
         loader.dismiss();
             this.showToaster("Try with different credentials");
          
      }
    },

    (err) => { 
        console.log(err);
        if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
        }
        else if(err.status===422)
        {
          this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
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

}
