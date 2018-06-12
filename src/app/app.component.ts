import { Component, ViewChild} from '@angular/core';

import { Platform, MenuController, Nav, AlertController,ToastController,LoadingController } from 'ionic-angular';

//import { Diagnostic } from 'ionic-native';
import { CameraPreview, CameraPreviewRect, Diagnostic,StatusBar, Splashscreen} from 'ionic-native';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

//import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';


// import the Menu's pages
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ConnectionsPage } from '../pages/connections/connections';
import { JobboardPage } from '../pages/jobboard/jobboard';
import { AppliedJobsPage } from '../pages/applied-jobs/applied-jobs';
import { MessagesPage } from '../pages/messages/messages';
import { ServiceprovidersPage } from '../pages/serviceproviders/serviceproviders';
import { ServicerequestPage } from '../pages/servicerequest/servicerequest';
import { NewsPage } from '../pages/news/news';
import { EventsPage } from '../pages/events/events';
import { ExternallinksPage } from '../pages/externallinks/externallinks';
import { LogoutPage } from '../pages/logout/logout';
import { ViewMessagesPage } from '../pages/view-messages/view-messages';
import { RecurringPagePage } from '../pages/recurring/recurring';
import { RemotemonitorPagePage } from '../pages/remotemonitor/remotemonitor';



// kavitha
import { CommunitylistPage } from '../pages/communitylist/communitylist';
import { CommunityPage } from '../pages/community/community';
import { CommunityprofilePage } from '../pages/communityprofile/communityprofile';
import { ManagePage } from '../pages/manage/manage';
import { BlogtabsPage } from '../pages/blogtabs/blogtabs';
import { BlogsPage } from '../pages/blogs/blogs';

import {PackageRequestPagePage } from '../pages/package-request/package-request';

import { ChangePasswordPage } from '../pages/change-password/change-password';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { SettingsPage } from '../pages/settings/settings';

import { LoginUser } from '../providers/login-user';
import { Subscription }   from 'rxjs/Subscription';
import { AppConfig } from '../providers/app-config';
import { ServiceProvider } from '../providers/service-provider';
import { CommunityServices } from '../providers/community-services';

import { Storage } from '@ionic/storage';
declare var Connection: any;

@Component({//selector:'my-theme',
  templateUrl: 'app.html'
  
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  user_id:any='';
  reg_id:any;
  token:any='';
  registerCredentials = {email: '', password: ''};
  callSponsor:any=0;
  ambulance:any=0;
  police:any=0;
  doctor:any=0;
  hospital:any=0;
  emailId:any='';
  password:any='';
   alert:any;
  // make HelloIonicPage the root (or first) page

//-------userbased login-------------//

  user_logged = '<no user announced>';
  subscription: Subscription;

//--------------------------------//
  rootPage: any;

  user_type:any='';

  pages: Array<{myIcon:string, title: string, component: any}>;
  pages2: Array<{myIcon:string, title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    private userLogin: LoginUser,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public appConfig:AppConfig,
    public service:ServiceProvider,
    public loadingCtrl: LoadingController,
    public community_service:CommunityServices,
    public storage:Storage,
    private network: Network,
    private push: Push
  ) {
    // let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    //   this.alert = this.alertCtrl.create({
    //     title: 'No Internet Connection',
    //     // message: 'Do you want to exit the app?',
    //     buttons: [
    //       {
    //         text: 'Cancel',
    //         role: 'cancel',
    //         handler: () => {
    //           this.alert =null;
    //         }
    //       },
    //       {
    //         text: 'Exit',
    //         handler: () => {
    //           this.platform.exitApp();
    //         }
    //       }
    //     ]
    //   });
    //   this.alert.present();
    // });

    this.storage.ready().then(() => {
    storage.get('user_type').then((userType)=>{
    this.user_type = userType;  
       
    });
     storage.get('token').then((token) => { this.token=token;})
     storage.get('email').then((email) => { this.emailId=email;})
     storage.get('password').then((password) => { this.password=password;})
    storage.get('id').then((id) => { this.user_id=id;
    if((this.user_id!='' && this.user_id != null) && (this.token!='' && this.token != null))
     {
              //Login Start
      this.registerCredentials.email = this.emailId; 
      this.registerCredentials.password = this.password; 
    
     let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });     
    loader.present();

     this.userLogin.loginload(this.registerCredentials).subscribe(     
      (loginuser) => {

          this.service.serviceInit(loginuser['token']);
          this.community_service.initialize();

         if(loginuser['details']['user_type'] == 'elder'){
           this.userLogin.currentUser("elder");
         }else{
           this.userLogin.currentUser("sponsor");
         }
         this.storage.ready().then(() => {
         //  this.storage.clear();
         this.storage.set('id', loginuser['details']['id']);
         this.storage.set('name', loginuser['details']['name']);
         this.storage.set('lastname', loginuser['details']['lastname']);
         this.storage.set('email',loginuser['details']['email']);
         this.storage.set('phone',loginuser['details']['phone']);
         this.storage.set('password',this.registerCredentials.password);
         this.storage.set('user_type', loginuser['details']['user_type']);
         this.storage.set('user_type_id', loginuser['details']['user_type_id']);
         this.storage.set('avatar', loginuser['details']['avatar']);
         this.storage.set('sponsor_avatar', loginuser['details']['sponsor_avatar']);
         this.storage.set('sponsor_name', loginuser['details']['sponsor_name']);
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
          if(loginuser.details.emergency_contacts[0].doctor!='undefined')
         {
           this.doctor=loginuser.details.emergency_contacts[0].doctor;
         }
          if(loginuser.details.emergency_contacts[0].hospital!='undefined')
         {
           this.hospital=loginuser.details.emergency_contacts[0].hospital;
         }
         this.storage.set('call_sponsor', this.callSponsor);
         this.storage.set('ambulance', this.ambulance);
         this.storage.set('police', this.police);
         this.storage.set('doctor', this.doctor);
         this.storage.set('hospital', this.hospital);
         }
         this.storage.set('token', loginuser['token']);
         this.storage.set('imageurl',this.appConfig.setImageurl());
         this.storage.set('rooturl',this.appConfig.setrooturl());
         // this.storage.set('service_location','');
         this.storage.set('islogin',1);
        //  this.nav.setRoot(DashboardPage)
        this.enableUserTypeMenu(loginuser['details']['user_type']);
        this.rootPage= DashboardPage;
       })
        // alert(loginuser['token']);
       
    },

    (err) => { 
        if(err.status===401)
        {
          this.rootPage = LoginPage;
        }
        else
        {
          this.showToaster("Try again later");
        }
         
       },
    )
    loader.dismiss();
       // Login End         
     }
     else
     {
      this.rootPage = LoginPage;
     }
     })
   }); 

// set our app's pages on user based

      this.pages = [];
      this.pages2 = [];
      
      this.pages.push(
                  { myIcon:'fa fa-tachometer', title: 'Dashboard', component: DashboardPage },
                  { myIcon:'fa fa-snowflake-o', title: 'Services', component: ServiceprovidersPage },
                  { myIcon:'fa fa-cogs', title: 'My Service Requests', component: ServicerequestPage },
                  { myIcon:'fa fa-gift', title: 'Package Requests', component: PackageRequestPagePage },
                  { myIcon:'fa fa-gift', title: 'Recurring Requests', component: RecurringPagePage },
                  { myIcon:'fa fa-cubes', title: 'Jobs', component: JobboardPage },
                  { myIcon:'fa fa-th-list', title: 'Applied Jobs', component: AppliedJobsPage },
                  { myIcon:'fa fa-recycle', title: 'Communities', component: CommunitylistPage },
                  { myIcon:'fa fa-sitemap', title: 'Connections', component: ConnectionsPage },
                  { myIcon:'fa fa-envelope', title: 'Messages', component: MessagesPage },
                  { myIcon:'fa fa-rss', title: 'Blogs', component: BlogsPage },
                  { myIcon:'fa fa-newspaper-o', title: 'News', component: NewsPage },
                  { myIcon:'fa fa-random', title: 'Events', component: EventsPage },
                  { myIcon:'fa fa-external-link', title: 'Useful External Links', component: ExternallinksPage },
                  { myIcon:'fa fa-address-book-o', title: 'Profile', component: MyProfilePage },
                  { myIcon:'fa fa-unlock-alt', title: 'Change Password', component: ChangePasswordPage },
                  { myIcon:'fa fa-cog', title: 'Privacy Settings', component: SettingsPage },
                  { myIcon:'fa fa-sign-out', title: 'Logout', component: LogoutPage },

                      );
      this.pages2.push(
                  { myIcon:'fa fa-tachometer', title: 'Dashboard', component: DashboardPage },
                  { myIcon:'fa fa-users', title: 'Manage Dependents', component: ManagePage },
                  { myIcon:'fa fa-cog', title: 'Services', component: ServiceprovidersPage },
                  { myIcon:'fa fa-cogs', title: 'My Service Requests', component: ServicerequestPage },
                  { myIcon:'fa fa-gift', title: 'Package Requests', component: PackageRequestPagePage },
                  { myIcon:'fa fa-gift', title: 'Recurring Requests', component: RecurringPagePage },
                  { myIcon:'fa fa-cubes', title: 'Jobs', component: JobboardPage },
                  { myIcon:'fa fa-th-list', title: 'Applied Jobs', component: AppliedJobsPage },
                  { myIcon:'fa fa-recycle', title: 'Communities', component: CommunitylistPage },
                  { myIcon:'fa fa-sitemap', title: 'Connections', component: ConnectionsPage },
                  { myIcon:'fa fa-envelope', title: 'Messages', component: MessagesPage },
                  { myIcon:'fa fa-rss', title: 'Blogs', component: BlogsPage },
                  { myIcon:'fa fa-newspaper-o', title: 'News', component: NewsPage },
                  { myIcon:'fa fa-random', title: 'Events', component: EventsPage },
                  { myIcon:'fa fa-external-link', title: 'Useful External Links', component: ExternallinksPage },
                  { myIcon:'fa fa-address-book-o', title: 'Profile', component: MyProfilePage },
                  { myIcon:'fa fa-unlock-alt', title: 'Change Password', component: ChangePasswordPage },
                  { myIcon:'fa fa-cog', title: 'Privacy Settings', component: SettingsPage },
                  { myIcon:'fa fa-camera', title: 'CCTV Settings', component: RemotemonitorPagePage },
                  { myIcon:'fa fa-sign-out', title: 'Logout', component: LogoutPage },

                      );
    
    this.initializeApp();
    // alert("switch-ON GPS to get current Location.");
    this.checkPermissions();
    this.initializePreview();
    platform.ready().then(() => {
      this.initPushNotification();
    });
    
  }
 
  showToaster(message)
  {
   let toast = this.toastCtrl.create({
        message: message,
        duration: 5000,
        position: 'top'
        });
   toast.present();
  }
  enableUserTypeMenu(userType) {
  if(userType=='sponsor'){
  this.menu.enable(true, 'sponsor');
  this.menu.enable(false, 'elder');
  }
  else
  {
  this.menu.enable(true, 'elder');
  this.menu.enable(false, 'sponsor');
  }
  }

  initializeApp() {

    this.platform.ready().then(() => {

      StatusBar.styleDefault();
      Splashscreen.hide();
   this.platform.registerBackButtonAction(() => {

                if(this.nav.canGoBack()){
                  this.nav.pop();
                }else{
                  if(this.alert){ 
                    this.alert.dismiss();
                    this.alert =null;     
                  }else{
                    this.showAlert();
                   }
                }
              });
    });
  }
    showAlert() {
          this.alert = this.alertCtrl.create({
            title: 'Do you want to exit the app?',
            //message: 'Do you want to exit the app?',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  this.alert =null;
                }
              },
              {
                text: 'Exit',
                handler: () => {
                  this.platform.exitApp();
                }
              }
            ]
          });
          this.alert.present();
        }

          showToast() {
            let toast = this.toastCtrl.create({
              message: 'Press Again to exit',
              duration: 2000,
              position: 'bottom'
            });

            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });

            toast.present();
          }
    checkPermissions() {
    Diagnostic.isCameraAuthorized().then((authorized) => {
    if(authorized)
        this.initializePreview();
    else {
        Diagnostic.requestCameraAuthorization().then((status) => {
            if(status == Diagnostic.permissionStatus.GRANTED)
                this.initializePreview();
            else {
                // Permissions not granted
                // Therefore, create and present toast
                this.toastCtrl.create(
                    {
                        message: "Cannot access camera", 
                        position: "bottom",
                        duration: 5000
                    }
                ).present();
            }
        });
    }
});
}
initializePreview() {
    let previewRect: CameraPreviewRect = {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
}
  initPushNotification()
  {
    this.platform.ready().then(() => {
    if (!this.platform.is('cordova')) {
      console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
      return;
    }
    // 85075801930
     let push = this.push.init({
      android: {
        senderID: "604025131571",
        icon:"icon",
        iconColor:"blue"

      },
      ios: {
        alert: "true",
        badge: false,
        sound: "true"
      },
      windows: {}
    });

push.on('registration').subscribe((data: any) => {
   console.log("device Reg ID ->", data.registrationId);
      this.reg_id = data.registrationId ;
       console.log('device token', this.reg_id)
      this.userLogin.setDeviceID(this.reg_id);
      //TODO - send device token to server
  console.log('Received a registration', data)
});

push.on('notification').subscribe((data: any) =>{
  console.log('Received a notification', data)
    console.log('message', data.message);
      console.log('data',data);
   if (data.additionalData.foreground == true) {
         this.showToaster(data.message);
        
       } else {
   
        this.getPage(data);
        console.log("Push notification clicked");
}
      
  
    // pushObject.on('error', (e) => {
    //   console.log(e.message);
    // });
 console.log('Device registered', data)
});

push.on('error').subscribe(error => console.error('Error with Push plugin', error));
  });    
  }

  getPage(data){
    let type = data.additionalData.page_type;
    switch (type) {
       case "comments": this.nav.push(CommunityPage,{community_id:data.additionalData.page_details.com_id});
                       break;
       case "reply": this.nav.push(CommunityPage,{community_id:data.additionalData.page_details.com_id});
                       break;
       case "likes" : this.nav.push(CommunityPage,{community_id:data.additionalData.page_details.com_id});
                       break;
       case "connection_request": this.nav.push(ConnectionsPage,{notification:'connection_request'});
                       break;
       case "service_request": this.nav.push(ServicerequestPage);
                       break;
       case "message" : this.nav.push(ViewMessagesPage, {messageId:data.additionalData.page_details.id,viewType:"inbox"});
                       break;
       case "blogs" : this.nav.push(BlogsPage);
                       break;
       case "events" : this.nav.push(EventsPage);
                       break;
       case "news" : this.nav.push(NewsPage);
                       break;
       case "blog" : this.nav.push(CommunityprofilePage,{profile_uid:data.additionalData.page_details.id});
                break;
     }
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

