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
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CallNumber, Vibration } from 'ionic-native';
import { ServiceprovidersPage } from '../../pages/serviceproviders/serviceproviders';
import { JobboardPage } from '../../pages/jobboard/jobboard';
import { CommunitylistPage } from '../../pages/communitylist/communitylist';
import { BlogsPage } from '../../pages/blogs/blogs';
import { ConnectionsPage } from '../../pages/connections/connections';
import { MessagesPage } from '../../pages/messages/messages';
/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var DashboardPage = (function () {
    function DashboardPage(navCtrl, toastCtrl, navParams, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.hooterOn = false;
        this.storage.ready().then(function () {
            storage.get('token').then(function (token) { _this.token = token; });
            storage.get('user_type').then(function (user_type) { _this.user_type = user_type; });
            storage.get('call_sponsor').then(function (call_sponsor) { _this.call_sponsor = call_sponsor; });
            storage.get('ambulance').then(function (ambulance) { _this.ambulance = ambulance; });
            storage.get('police').then(function (police) { _this.police = police; });
        });
        //alert(this.call_sponsor);
    }
    /*ionViewDidLoad() {
      console.log('ionViewDidLoad DashboardPage');
    }*/
    DashboardPage.prototype.servicesPage = function () {
        this.navCtrl.setRoot(ServiceprovidersPage);
    };
    DashboardPage.prototype.jobsPage = function () {
        this.navCtrl.setRoot(JobboardPage);
    };
    DashboardPage.prototype.communityPage = function () {
        this.navCtrl.setRoot(CommunitylistPage);
    };
    DashboardPage.prototype.blogsPage = function () {
        //alert("token"+this.token);
        this.navCtrl.setRoot(BlogsPage);
    };
    DashboardPage.prototype.connectionsPage = function () {
        this.navCtrl.setRoot(ConnectionsPage);
    };
    DashboardPage.prototype.messagesPage = function () {
        this.navCtrl.setRoot(MessagesPage);
    };
    DashboardPage.prototype.makeCall = function (number) {
        if (number) {
            CallNumber.callNumber(number, true)
                .then(function () { return console.log('Launched dialer!'); })
                .catch(function () { return console.log('Error launching dialer'); });
        }
        else {
            this.showToaster("There is no contact nuber");
        }
    };
    DashboardPage.prototype.hooter = function (hooterOn) {
        if (!hooterOn) {
            this.hooterOn = !hooterOn;
            Vibration.vibrate(60000);
        }
        else {
            Vibration.vibrate(0);
            this.hooterOn = !hooterOn;
        }
    };
    DashboardPage.prototype.showToaster = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    return DashboardPage;
}());
DashboardPage = __decorate([
    Component({
        selector: 'page-dashboard',
        templateUrl: 'dashboard.html'
    }),
    __metadata("design:paramtypes", [NavController, ToastController, NavParams, Storage])
], DashboardPage);
export { DashboardPage };
//# sourceMappingURL=dashboard.js.map