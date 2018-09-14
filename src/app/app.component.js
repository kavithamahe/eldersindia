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
import { Platform, MenuController, Nav, AlertController, ToastController, LoadingController } from 'ionic-angular';
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
import { ExternallinksPage } from '../pages/externallinks/externallinks';
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
import { AppConfig } from '../providers/app-config';
import { ServiceProvider } from '../providers/service-provider';
import { CommunityServices } from '../providers/community-services';
// import { Externallinks } from '../providers/externallinks';
import { Storage } from '@ionic/storage';
// import { TermsModalPage } from '../pages/terms-modal/terms-modal';
// import {ModalContentPage} from '../pages/modal-page/modal-page';
var MyApp = (function () {
    function MyApp(platform, menu, userLogin, alertCtrl, toastCtrl, appConfig, service, loadingCtrl, community_service, storage) {
        var _this = this;
        this.platform = platform;
        this.menu = menu;
        this.userLogin = userLogin;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.appConfig = appConfig;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.community_service = community_service;
        this.storage = storage;
        this.user_id = '';
        this.token = '';
        this.registerCredentials = { email: '', password: '' };
        this.callSponsor = 0;
        this.ambulance = 0;
        this.police = 0;
        this.emailId = '';
        this.password = '';
        // make HelloIonicPage the root (or first) page
        //-------userbased login-------------//
        this.user_logged = '<no user announced>';
        this.user_type = '';
        this.storage.ready().then(function () {
            storage.get('user_type').then(function (userType) {
                _this.user_type = userType;
                console.log("user_type : ", _this.user_type);
                if ((_this.user_type != '') && (_this.user_type != null) && (_this.user_type == 'sponsor')) {
                    _this.pages.splice(1, 0, { myIcon: 'fa fa-users', title: 'Manage Dependents', component: ManagePage });
                }
            });
            storage.get('token').then(function (token) { _this.token = token; });
            storage.get('email').then(function (email) { _this.emailId = email; });
            storage.get('password').then(function (password) { _this.password = password; });
            storage.get('id').then(function (id) {
                _this.user_id = id;
                if ((_this.user_id != '' && _this.user_id != null) && (_this.token != '' && _this.token != null)) {
                    //Login Start
                    _this.registerCredentials.email = _this.emailId;
                    _this.registerCredentials.password = _this.password;
                    var loader = _this.loadingCtrl.create({
                        content: "Please wait..."
                    });
                    loader.present();
                    _this.userLogin.loginload(_this.registerCredentials).subscribe(function (loginuser) {
                        _this.service.serviceInit(loginuser['token']);
                        _this.community_service.initialize();
                        if (loginuser['details']['user_type'] == 'elder') {
                            _this.storage.set('elder_mobile_imei', loginuser['details']['id']);
                            _this.userLogin.currentUser("elder");
                        }
                        else {
                            _this.userLogin.currentUser("sponsor");
                        }
                        _this.storage.ready().then(function () {
                            _this.storage.clear();
                            _this.storage.set('id', loginuser['details']['id']);
                            _this.storage.set('name', loginuser['details']['name']);
                            _this.storage.set('email', loginuser['details']['email']);
                            _this.storage.set('password', _this.registerCredentials.password);
                            _this.storage.set('user_type', loginuser['details']['user_type']);
                            _this.storage.set('user_type_id', loginuser['details']['user_type_id']);
                            _this.storage.set('avatar', loginuser['details']['avatar']);
                            if (loginuser['details']['user_type'] == 'elder' && (loginuser.details.emergency_contacts.length > 0)) {
                                if (loginuser.details.emergency_contacts[0].call_sponsor != 'undefined') {
                                    _this.callSponsor = loginuser.details.emergency_contacts[0].call_sponsor;
                                    console.log("callSponsor" + _this.callSponsor);
                                }
                                if (loginuser.details.emergency_contacts[0].ambulance != 'undefined') {
                                    _this.ambulance = loginuser.details.emergency_contacts[0].ambulance;
                                }
                                if (loginuser.details.emergency_contacts[0].police != 'undefined') {
                                    _this.police = loginuser.details.emergency_contacts[0].police;
                                }
                                _this.storage.set('call_sponsor', _this.callSponsor);
                                _this.storage.set('ambulance', _this.ambulance);
                                _this.storage.set('police', _this.police);
                            }
                            _this.storage.set('token', loginuser['token']);
                            _this.storage.set('imageurl', _this.appConfig.setImageurl());
                            _this.storage.set('rooturl', _this.appConfig.setrooturl());
                            // this.storage.set('service_location','');
                            _this.storage.set('islogin', 1);
                            //  this.nav.setRoot(DashboardPage);
                            _this.rootPage = DashboardPage;
                        });
                        // alert(loginuser['token']);
                    }, function (err) {
                        if (err.status === 401) {
                            _this.rootPage = LoginPage;
                        }
                        else {
                            _this.showToaster("Try again later");
                        }
                    });
                    loader.dismiss();
                    // Login End         
                }
                else {
                    _this.rootPage = LoginPage;
                }
            });
        });
        // set our app's pages on user based
        this.pages = [];
        console.log(this.pages);
        while (this.pages.length > 0) {
            this.pages.pop();
        }
        console.log(this.pages);
        this.pages.push({ myIcon: 'fa fa-th-large', title: 'Dashboard', component: DashboardPage }, { myIcon: 'fa fa-snowflake-o', title: 'Services', component: ServiceprovidersPage }, { myIcon: 'fa fa-cogs', title: 'My Service Requests', component: ServicerequestPage }, { myIcon: 'fa fa-cubes', title: 'Jobs', component: JobboardPage }, { myIcon: 'fa fa-th-list', title: 'Applied Jobs', component: AppliedJobsPage }, { myIcon: 'fa fa-recycle', title: 'Communities', component: CommunitylistPage }, { myIcon: 'fa fa-sitemap', title: 'Connections', component: ConnectionsPage }, { myIcon: 'fa fa-envelope', title: 'Messages', component: MessagesPage }, { myIcon: 'fa fa-rss', title: 'Blogs', component: BlogsPage }, { myIcon: 'fa fa-newspaper-o', title: 'News', component: NewsPage }, { myIcon: 'fa fa-random', title: 'Events', component: EventsPage }, { myIcon: 'fa fa-random', title: 'Useful External Links', component: ExternallinksPage }, { myIcon: 'fa fa-address-book-o', title: 'Profile', component: MyProfilePage }, { myIcon: 'fa fa-unlock-alt', title: 'Change Password', component: ChangePasswordPage }, { myIcon: 'fa fa-cog', title: 'Settings', component: SettingsPage }, { myIcon: 'fa fa-sign-out', title: 'Logout', component: LogoutPage });
        this.subscription = userLogin.userEntered$.subscribe(function (userData) {
            console.log(userData, _this.pages.length);
            _this.user_logged = userData;
            if ((_this.user_logged == 'sponsor') && (_this.pages.length == 15)) {
                _this.pages.splice(1, 0, { myIcon: 'fa fa-users', title: 'Manage Dependents', component: ManagePage });
            }
            else if ((_this.user_logged == 'elder') && (_this.pages.length == 16)) {
                for (var i = 0; i < _this.pages.length; i++) {
                    if (_this.pages[i].title == 'Manage Dependents') {
                        _this.pages.splice(i, 1);
                    }
                }
            }
        });
        this.initializeApp();
        // alert("switch-ON GPS to get current Location.");
        platform.ready().then(function () {
            _this.initPushNotification();
        });
    }
    MyApp.prototype.showToaster = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
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
                        title: 'App Exit',
                        subTitle: "Are you sure to Exit app",
                        buttons: [{
                                text: 'NO',
                                handler: function () {
                                    _this.storage.ready().then(function () {
                                        _this.storage.get('token').then(function (token) { _this.token = token; });
                                        _this.storage.get('id').then(function (id) {
                                            _this.user_id = id;
                                            if ((_this.user_id != '' && _this.user_id != null) && (_this.token != '' && _this.token != null)) {
                                                // code...
                                                _this.nav.setRoot(DashboardPage);
                                            }
                                            else {
                                                _this.nav.setRoot(LoginPage);
                                            }
                                        });
                                    });
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
                senderID: "604025131571",
                icon: "icon",
                iconColor: "blue"
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
            console.log('data', data);
            push.getApplicationIconBadgeNumber(function (n) {
                console.log('success', n);
            }, function () {
                console.log('error');
            });
            push.setApplicationIconBadgeNumber(function () {
                console.log('success');
            }, function () {
                console.log('error');
            }, +data.count);
            // let self = this;
            //if user using app and push notification comes
            if (data.additionalData.foreground) {
                var confirm_1 = _this.alertCtrl.create({
                    title: 'Elder India Notification',
                    subTitle: data.message,
                    buttons: [
                        {
                            text: 'Disagree',
                            role: 'cancel'
                        },
                        {
                            text: 'View',
                            handler: function () {
                                _this.getPage(data);
                                console.log('Notification View clicked');
                            }
                        }
                    ]
                });
                confirm_1.present();
            }
            else {
                //if user NOT using app and push notification comes
                //TODO: Your logic on click of push notification directly
                _this.getPage(data);
                console.log("Push notification clicked");
                push.clearAllNotifications(function () {
                    console.log('success');
                }, function () {
                    console.log('error');
                });
            }
        });
        push.on('error', function (e) {
            console.log(e.message);
        });
    };
    MyApp.prototype.getPage = function (data) {
        var type = data.additionalData.page_type;
        switch (type) {
            case "comments":
                this.nav.push(CommunityPage, { community_id: data.additionalData.page_details.com_id });
                break;
            case "reply":
                this.nav.push(CommunityPage, { community_id: data.additionalData.page_details.com_id });
                break;
            case "likes":
                this.nav.push(CommunityPage, { community_id: data.additionalData.page_details.com_id });
                break;
            case "connection_request":
                this.nav.push(ConnectionsPage, { notification: 'connection_request' });
                break;
            case "service_request":
                this.nav.push(ServicerequestPage);
                break;
            case "message":
                this.nav.push(ViewMessagesPage, { messageId: data.additionalData.page_details.id, viewType: "inbox" });
                break;
        }
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
        ToastController,
        AppConfig,
        ServiceProvider,
        LoadingController,
        CommunityServices,
        Storage])
], MyApp);
export { MyApp };
// 13.0827° N, 80.2707° E 
//# sourceMappingURL=app.component.js.map