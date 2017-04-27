var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Platform, NavController, NavParams, AlertController, LoadingController, ModalController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from 'ionic-native';
import { Validators, FormBuilder } from '@angular/forms';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { LoginUser } from '../../providers/login-user';
import { AppConfig } from '../../providers/app-config';
import { ServiceProvider } from '../../providers/service-provider';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var LoginPage = (function () {
    function LoginPage(service, formBuilder, alertCtrl, modalCtrl, platform, navCtrl, navParams, loginUser, loadingCtrl, toastCtrl, storage, appConfig) {
        var _this = this;
        this.service = service;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loginUser = loginUser;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.appConfig = appConfig;
        this.id = '';
        this.submitAttempt = false;
        this.registerCredentials = { email: '', password: '' };
        this.callSponsor = 0;
        this.ambulance = 0;
        this.police = 0;
        this.storage.ready().then(function () {
            storage.get('id').then(function (id) {
                _this.id = id;
            });
        });
        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required])]
        });
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        if (!this.loginForm.valid) {
            this.submitAttempt = true;
        }
        else {
            this.submitAttempt = false;
            this.registerCredentials.email = this.loginForm.value.email;
            this.registerCredentials.password = this.loginForm.value.password;
            var loader = this.loadingCtrl.create({
                content: "Please wait..."
            });
            loader.present();
            this.loginUser.loginload(this.registerCredentials).subscribe(function (loginuser) {
                _this.service.serviceInit(loginuser['token']);
                if (loginuser['details']['user_type'] == 'elder') {
                    _this.loginUser.currentUser("elder");
                }
                else {
                    _this.loginUser.currentUser("sponsor");
                }
                _this.storage.ready().then(function () {
                    _this.storage.clear();
                    _this.storage.set('id', loginuser['details']['id']);
                    _this.storage.set('name', loginuser['details']['name']);
                    _this.storage.set('email', loginuser['details']['email']);
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
                    _this.storage.set('islogin', 1);
                    _this.navCtrl.setRoot(DashboardPage);
                });
                // alert(loginuser['token']);
            }, function (err) {
                if (err.status === 401) {
                    _this.showToaster(JSON.parse(err._body).error);
                }
                else {
                    _this.showToaster("Try again later");
                }
            });
            loader.dismiss();
        }
    };
    LoginPage.prototype.showToaster = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    LoginPage.prototype.forgotPassword = function () {
        this.passwordCode = "";
        this.createModal("forgotPassword");
    };
    LoginPage.prototype.resetPassword = function () {
        this.passwordCode = "1234";
        this.createModal("passwordReset");
    };
    LoginPage.prototype.createModal = function (requestData) {
        var _this = this;
        var requestType = { modalType: requestData, passCode: this.passwordCode };
        var passwordModal = this.modalCtrl.create(ForgotPasswordPage, requestType);
        passwordModal.onDidDismiss(function (data) {
            if (data == "dismiss") {
                console.log(" Forgot Password modal dismissed..!");
            }
            else {
                if (data.modalType == "forgotPassword") {
                    _this.mailID = data.modalData.emailId;
                    alert(_this.mailID);
                    // this.serviceRequestCall(data);
                    if (_this.platform.is('cordova')) {
                        LocalNotifications.schedule({
                            title: "Password Reset",
                            text: "password Reset code is 1234",
                            at: new Date(new Date().getTime() + 2 * 1000),
                        });
                        console.log("forgot Password modal submitted..!");
                        LocalNotifications.on("click", function (notification, state) {
                            var alert = _this.alertCtrl.create({
                                title: "Notification Clicked",
                                subTitle: "You just clicked the scheduled notification",
                                buttons: ["OK"]
                            });
                            alert.present();
                        });
                    }
                    else {
                        console.log("current platform is not cordova..");
                    }
                    _this.resetPassword();
                }
                else {
                    _this.newPassword = data.modalData.newPassword;
                    _this.showToaster("Password Reset Successful..!");
                }
            }
        });
        passwordModal.present();
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        templateUrl: 'login.html'
    }),
    __metadata("design:paramtypes", [ServiceProvider, FormBuilder, AlertController, ModalController, Platform, NavController, NavParams, LoginUser, LoadingController, ToastController, Storage, AppConfig])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map