var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
import { MyservicesPage } from '../pages/myservices/myservices';
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
var MyApp = (function () {
    function MyApp(platform, menu) {
        this.platform = platform;
        this.menu = menu;
        // make HelloIonicPage the root (or first) page
        this.rootPage = LoginPage;
        this.initializeApp();
        // set our app's pages
        this.pages = [
            //{ title: 'Login', component: LoginPage },
            { title: 'Dashboard', component: DashboardPage },
            { title: 'profile', component: MyProfilePage },
            { title: 'change password', component: ChangePasswordPage },
            { title: 'Activity', component: CommunitylistPage },
            { title: 'Manage Dependents', component: ManagePage },
            { title: 'Community', component: CommunitylistPage },
            { title: 'Connections', component: ConnectionsPage },
            { title: 'Job Board', component: JobboardPage },
            { title: 'Applied Jobs', component: AppliedJobsPage },
            { title: 'Messages', component: MessagesPage },
            { title: 'My Services', component: MyservicesPage },
            { title: 'Service Providers', component: ServiceprovidersPage },
            { title: 'Service Requests', component: ServicerequestPage },
            { title: 'Blogs', component: BlogsPage },
            { title: 'News', component: NewsPage },
            { title: 'Events', component: EventsPage },
            { title: 'Logout', component: LogoutPage },
        ];
    }
    MyApp.prototype.initializeApp = function () {
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform,
        MenuController])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map