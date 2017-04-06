import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

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

@Component({//selector:'my-theme',
  templateUrl: 'app.html'

})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  removeMenu:any=['Profile'];
  rootPage: any =  MessagesPage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [        
     // { title: 'Login', component: LoginPage },
      { title: 'Dashboard', component: DashboardPage },      
      { title: 'Profile', component: MyProfilePage },
      { title: 'Change Password', component: ChangePasswordPage },
      { title: 'Manage Dependents', component: ManagePage },
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
      { title: 'Logout', component: LogoutPage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
