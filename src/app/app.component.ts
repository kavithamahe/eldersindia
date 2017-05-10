import { Component, ViewChild} from '@angular/core';

import { Platform, MenuController, Nav, AlertController } from 'ionic-angular';

import { StatusBar, Splashscreen, Push } from 'ionic-native';
// import { Geolocation } from '@ionic-native/geolocation';


// import the Menu's pages
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ConnectionsPage } from '../pages/connections/connections';
import { JobboardPage } from '../pages/jobboard/jobboard';
import { AppliedJobsPage } from '../pages/applied-jobs/applied-jobs';
import { MessagesPage } from '../pages/messages/messages';
import { ServiceprovidersPage } from '../pages/serviceproviders/serviceproviders';
import { ServicerequestPage } from '../pages/servicerequest/servicerequest';
import { BlogsPage } from '../pages/blogs/blogs';
import { NewsPage } from '../pages/news/news';
import { EventsPage } from '../pages/events/events';
import { LogoutPage } from '../pages/logout/logout';
import { ViewMessagesPage } from '../pages/view-messages/view-messages';

// kavitha
import { CommunitylistPage } from '../pages/communitylist/communitylist';
import { CommunityPage } from '../pages/community/community';
import { ManagePage } from '../pages/manage/manage';

import { ChangePasswordPage } from '../pages/change-password/change-password';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { SettingsPage } from '../pages/settings/settings';

import { LoginUser } from '../providers/login-user';
import { Subscription }   from 'rxjs/Subscription';

import { Storage } from '@ionic/storage';
// import { TermsModalPage } from '../pages/terms-modal/terms-modal';

// import {ModalContentPage} from '../pages/modal-page/modal-page';


@Component({//selector:'my-theme',
  templateUrl: 'app.html'

})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  user_id:any='';
  reg_id:any;
  token:any='';
  // make HelloIonicPage the root (or first) page

//-------userbased login-------------//

  user_logged = '<no user announced>';
  subscription: Subscription;

//--------------------------------//
  rootPage: any;

  user_type:any='';

  pages: Array<{myIcon:string, title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    private userLogin: LoginUser,
    public alertCtrl: AlertController,
    public storage:Storage
  ) {
    this.storage.ready().then(() => {
    storage.get('user_type').then((userType)=>{
      this.user_type = userType;
      console.log("user_type : ", this.user_type);
        if((this.user_type != '') && (this.user_type != null) && (this.user_type == 'sponsor')){
            this.pages.splice(1, 0, { myIcon:'fa fa-users', title: 'Manage Dependents', component: ManagePage });
           }
    });
     storage.get('token').then((token) => { this.token=token;})

    storage.get('id').then((id) => { this.user_id=id;
     console.log("userid"+this.user_id);
     console.log("token"+this.token);
    if((this.user_id!='' && this.user_id != null) && (this.token!='' && this.token != null))
     {
        this.rootPage= DashboardPage;
     }
     else
     {
      this.rootPage = LoginPage;
     }
     })
   }); 

// set our app's pages on user based

      this.pages = [];
      console.log(this.pages);
      while (this.pages.length > 0) {
        this.pages.pop();
      }
      console.log(this.pages);
      this.pages.push(
                  { myIcon:'fa fa-th-large', title: 'Dashboard', component: DashboardPage },
                  { myIcon:'fa fa-snowflake-o', title: 'Services', component: ServiceprovidersPage },
                  { myIcon:'fa fa-cogs', title: 'My Service Requests', component: ServicerequestPage },
                  { myIcon:'fa fa-cubes', title: 'Jobs', component: JobboardPage },
                  { myIcon:'fa fa-th-list', title: 'Applied Jobs', component: AppliedJobsPage },
                  { myIcon:'fa fa-recycle', title: 'Communities', component: CommunitylistPage },
                  { myIcon:'fa fa-sitemap', title: 'Connections', component: ConnectionsPage },
                  { myIcon:'fa fa-envelope', title: 'Messages', component: MessagesPage },
                  { myIcon:'fa fa-rss', title: 'Blogs', component: BlogsPage },
                  { myIcon:'fa fa-newspaper-o', title: 'News', component: NewsPage },
                  { myIcon:'fa fa-random', title: 'Events', component: EventsPage },
                  { myIcon:'fa fa-address-book-o', title: 'Profile', component: MyProfilePage },
                  { myIcon:'fa fa-unlock-alt', title: 'Change Password', component: ChangePasswordPage },
                  { myIcon:'fa fa-cog', title: 'Settings', component: SettingsPage },
                  { myIcon:'fa fa-sign-out', title: 'Logout', component: LogoutPage },

                      );

        this.subscription = userLogin.userEntered$.subscribe(
            userData => {
                          console.log(userData,this.pages.length);
                          this.user_logged = userData;
                          if((this.user_logged == 'sponsor')&&(this.pages.length == 15)){
            this.pages.splice(1, 0, { myIcon:'fa fa-users', title: 'Manage Dependents', component: ManagePage });
           }else if((this.user_logged == 'elder')&&(this.pages.length == 16)){
             for(let i=0; i < this.pages.length;i++){
               if(this.pages[i].title == 'Manage Dependents'){
                 this.pages.splice(i, 1);
               }
             }             
           }
                        });                   
    
    this.initializeApp();
    // alert("switch-ON GPS to get current Location.");
    platform.ready().then(() => {
      this.initPushNotification();
    });
    
  }

  initializeApp() {

    this.platform.ready().then(() => {

      StatusBar.styleDefault();
      Splashscreen.hide();
      this.platform.registerBackButtonAction(() => {
        // let nav = this.app.getActiveNav();
        if (this.nav.canGoBack()){ //Can we go back?
          console.log(this.nav.getActive().name);
          this.nav.pop();
        }else{
                let confirmAlert = this.alertCtrl.create({
                title: 'App Exit',
                subTitle: "Are you sure to Exit app",
                buttons: [{
                  text: 'NO',
                  handler: () => {
                    if (this.user_id != '' && this.user_id != null) {
                      // code...
                      this.nav.setRoot(DashboardPage);
                    }else{
                      this.nav.setRoot(LoginPage);
                    }
                    
                  }
                }, {
                  text: 'Yes',
                  handler: () => {
                    this.platform.exitApp(); //Exit from app
                   }
                  }]
                });
                confirmAlert.present();
              }


      });
    });
  }

  initPushNotification()
  {
    if (!this.platform.is('cordova')) {
      console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
      return;
    }
    
    let push = Push.init({
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

    push.on('registration', (data) => {
      console.log("device Reg ID ->", data.registrationId);
      this.reg_id = data.registrationId ;
      this.userLogin.setDeviceID(this.reg_id);
      //TODO - send device token to server
    });
    push.on('notification', (data) => {
      console.log('message', data.message);
      console.log('data',data);
      // let self = this;
      //if user using app and push notification comes
      if (data.additionalData.foreground) {

            let confirm = this.alertCtrl.create({
            title: 'Use this lightsaber?',
            message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
            buttons: [
              {
                text: 'Disagree',          
                role: 'cancel'
                
              },
              {
                text: 'View',
                handler: () => {
                  this.getPage(data);
                  console.log('Alert View clicked');
                }
              }
            ]
          });
          confirm.present()

      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        this.getPage(data);
        console.log("Push notification clicked");
      }
    });
    push.on('error', (e) => {
      console.log(e.message);
    });
  }

  getPage(data){
    let type = data.additionalData.page_type;
    switch (type) {
       case "comments": this.nav.push(CommunityPage,{community_id:data.additionalData.page_details.com_id});
       case "reply": this.nav.push(CommunityPage,{community_id:data.additionalData.page_details.com_id});
       case "likes" : this.nav.push(CommunityPage,{community_id:data.additionalData.page_details.com_id});
       case "connection_request": this.nav.push(ConnectionsPage,{notification:'connection_request'});
       case "service_request": this.nav.push(ServicerequestPage);
       case "message" : this.nav.push(ViewMessagesPage, {messageId:data.additionalData.page_details.id,viewType:"inbox"});
     }
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}


// 13.0827° N, 80.2707° E