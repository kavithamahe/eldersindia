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
import { NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { ServiceProvider } from '../../providers/service-provider';
import { Storage } from '@ionic/storage';
/*
  Generated class for the MyProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var MyProfilePage = (function () {
    function MyProfilePage(storage, providerService, navCtrl, navParams) {
        this.storage = storage;
        this.providerService = providerService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.gender = "";
    }
    MyProfilePage.prototype.loadMyProfile = function (token) {
        var _this = this;
        this.user_type = "";
        this.providerService.webServiceCall("myaccount", "")
            .subscribe(function (data) {
            _this.profileData = data.result.info;
            _this.gender = _this.profileData.gender;
            _this.user_type = data.result.info.user_type;
            if (_this.user_type != "sponsor") {
                _this.user_type = "Elder";
            }
            _this.user_dob = _this.profileData.dob; //this.getDate(this.profileData.dob);
        }, function (err) {
            _this.providerService.showErrorToast(err);
        });
    };
    MyProfilePage.prototype.getDate = function (datepar) {
        var dateParts = datepar.split("-").reverse().join("-");
        // let date = dateParts[2]+"-"+dateParts[1]+"-"+dateParts[0];
        return dateParts;
    };
    MyProfilePage.prototype.editProfile = function () {
        this.navCtrl.push(EditProfilePage, { profileData: this.profileData });
    };
    MyProfilePage.prototype.dashboardPage = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    MyProfilePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.ready().then(function () {
            _this.storage.get('imageurl').then(function (imageurl) { _this.imageURL = imageurl; });
            _this.storage.get('token').then(function (token) {
                _this.token = token;
                _this.loadMyProfile(_this.token);
            });
        });
    };
    return MyProfilePage;
}());
MyProfilePage = __decorate([
    Component({
        selector: 'page-my-profile',
        templateUrl: 'my-profile.html'
    }),
    __metadata("design:paramtypes", [Storage, ServiceProvider, NavController, NavParams])
], MyProfilePage);
export { MyProfilePage };
//# sourceMappingURL=my-profile.js.map