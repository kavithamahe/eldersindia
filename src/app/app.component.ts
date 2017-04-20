import { Component, ViewChild} from '@angular/core';

import { Platform, MenuController, Nav, AlertController } from 'ionic-angular';

import { StatusBar, Splashscreen, Push} from 'ionic-native';

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

// kavitha
import { CommunitylistPage } from '../pages/communitylist/communitylist';
import { ManagePage } from '../pages/manage/manage';

import { ChangePasswordPage } from '../pages/change-password/change-password';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { SettingsPage } from '../pages/settings/settings';

import { LoginUser } from '../providers/login-user';
import { Subscription }   from 'rxjs/Subscription';

import { Storage } from '@ionic/storage';

@Component({//selector:'my-theme',
  templateUrl: 'app.html'

})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  user_id:any='';
  reg_id:any;

  // make HelloIonicPage the root (or first) page

//-------userbased login-------------//

  user_logged = '<no user announced>';
  subscription: Subscription;
//--------------------------------//
  rootPage: any =  LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    private userLogin: LoginUser,
    public alertCtrl: AlertController,
    public storage:Storage
  ) {
    this.storage.ready().then(() => {
    storage.get('id').then((id) => { this.user_id=id;
   
    if(this.user_id!='' && this.user_id != null)
     {
        this.rootPage=DashboardPage;
     }
     else
     {
      this.rootPage = LoginPage;
     }
     })
   }); 

// set our app's pages on user based

      this.pages = [];
      this.pages.push({ title: 'Dashboard', component: DashboardPage});
      
      this.subscription = userLogin.userEntered$.subscribe(
      userData => {
        this.user_logged = userData;

        if(this.user_logged == 'sponsor'){
              this.pages.splice(1, 0, { title: 'Manage Dependents', component: ManagePage });
              // this.pages.push({ title: 'Manage Dependents', component: ManagePage });
         }
    });
     
        this.pages.push(
                          { title: 'Community', component: CommunitylistPage },
                          { title: 'Connections', component: ConnectionsPage },
                          { title: 'Job Board', component: JobboardPage },
                          { title: 'Applied Jobs', component: AppliedJobsPage },
                          { title: 'Messages', component: MessagesPage },
                          { title: 'Service Providers', component: ServiceprovidersPage },
                          { title: 'Service Requests', component: ServicerequestPage },
                          { title: 'Blogs', component: BlogsPage },
                          { title: 'News', component: NewsPage },
                          { title: 'Events', component: EventsPage },
                          { title: 'Profile', component: MyProfilePage },
                          { title: 'Change Password', component: ChangePasswordPage },
                          { title: 'Settings', component: SettingsPage },
                          { title: 'Logout', component: LogoutPage },
                          );  
    
    this.initializeApp();

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
                title: 'Log Out',
                subTitle: "Are you sure to close app",
                buttons: [{
                  text: 'NO',
                  handler: () => {
                    if (this.user_id != '' || this.user_id != null) {
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
        senderID: "604025131571"
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
      console.log('sound',data.sound);
      let self = this;
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
              self.nav.push(MessagesPage, {message: data.message});
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        self.nav.push(MessagesPage, {message: data.message});
        console.log("Push notification clicked");
      }
    });
    push.on('error', (e) => {
      console.log(e.message);
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
