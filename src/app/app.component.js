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
import { Platform, MenuController, Nav, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen, Push } from 'ionic-native';
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
import { Storage } from '@ionic/storage';
// import {ModalContentPage} from '../pages/modal-page/modal-page';
var MyApp = (function () {
    function MyApp(platform, menu, userLogin, alertCtrl, storage) {
        var _this = this;
        this.platform = platform;
        this.menu = menu;
        this.userLogin = userLogin;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.user_id = '';
        // make HelloIonicPage the root (or first) page
        //-------userbased login-------------//
        this.user_logged = '<no user announced>';
        this.storage.ready().then(function () {
            storage.get('id').then(function (id) {
                _this.user_id = id;
                if (_this.user_id != '' && _this.user_id != null) {
                    _this.rootPage = DashboardPage;
                }
                else {
                    _this.rootPage = LoginPage;
                }
            });
        });
        // set our app's pages on user based
        this.pages = [];
        this.pages.push({ title: 'Dashboard', component: DashboardPage });
        this.subscription = userLogin.userEntered$.subscribe(function (userData) {
            _this.user_logged = userData;
            if (_this.user_logged == 'sponsor') {
                _this.pages.splice(1, 0, { title: 'Manage Dependents', component: ManagePage });
                // this.pages.push({ title: 'Manage Dependents', component: ManagePage });
            }
        });
        this.pages.push({ title: 'Community', component: CommunitylistPage }, { title: 'Connections', component: ConnectionsPage }, { title: 'Job Board', component: JobboardPage }, { title: 'Applied Jobs', component: AppliedJobsPage }, { title: 'Messages', component: MessagesPage }, { title: 'Service Providers', component: ServiceprovidersPage }, { title: 'Service Requests', component: ServicerequestPage }, { title: 'Blogs', component: BlogsPage }, { title: 'News', component: NewsPage }, { title: 'Events', component: EventsPage }, { title: 'Profile', component: MyProfilePage }, { title: 'Change Password', component: ChangePasswordPage }, { title: 'Settings', component: SettingsPage }, { title: 'Logout', component: LogoutPage });
        this.initializeApp();
        platform.ready().then(function () {
            _this.initPushNotification();
        });
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            StatusBar.styleDefault();
            Splashscreen.hide();
            _this.platform.registerBackButtonAction(function () {
                // let nav = this.app.getActiveNav();
                if (_this.nav.canGoBack()) {
                    console.log(_this.nav.getActive().name);
                    _this.nav.pop();
                }
                else {
                    var confirmAlert = _this.alertCtrl.create({
                        title: 'Log Out',
                        subTitle: "Are you sure to close app",
                        buttons: [{
                                text: 'NO',
                                handler: function () {
                                    if (_this.user_id != '' || _this.user_id != null) {
                                        // code...
                                        _this.nav.setRoot(DashboardPage);
                                    }
                                    else {
                                        _this.nav.setRoot(LoginPage);
                                    }
                                }
                            }, {
                                text: 'Yes',
                                handler: function () {
                                    _this.platform.exitApp(); //Exit from app
                                }
                            }]
                    });
                    confirmAlert.present();
                }
            });
        });
    };
    MyApp.prototype.initPushNotification = function () {
        var _this = this;
        if (!this.platform.is('cordova')) {
            console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
            return;
        }
        var push = Push.init({
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
        push.on('registration', function (data) {
            console.log("device Reg ID ->", data.registrationId);
            _this.reg_id = data.registrationId;
            _this.userLogin.setDeviceID(_this.reg_id);
            //TODO - send device token to server
        });
        push.on('notification', function (data) {
            console.log('message', data.message);
            console.log('sound', data.sound);
            var self = _this;
            //if user using app and push notification comes
            if (data.additionalData.foreground) {
                // if application open, show popup
                var confirmAlert = _this.alertCtrl.create({
                    title: 'New Notification',
                    message: data.message,
                    buttons: [{
                            text: 'Ignore',
                            role: 'cancel'
                        }, {
                            text: 'View',
                            handler: function () {
                                //TODO: Your logic here
                                self.nav.push(MessagesPage, { message: data.message });
                            }
                        }]
                });
                confirmAlert.present();
            }
            else {
                //if user NOT using app and push notification comes
                //TODO: Your logic on click of push notification directly
                self.nav.push(MessagesPage, { message: data.message });
                console.log("Push notification clicked");
            }
        });
        push.on('error', function (e) {
            console.log(e.message);
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
        MenuController,
        LoginUser,
        AlertController,
        Storage])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map