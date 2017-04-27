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
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CommunityServices } from '../../providers/community-services';
var MyprofilesettingPage = (function () {
    function MyprofilesettingPage(navCtrl, storage, communityServices, navParams, viewCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.communityServices = communityServices;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('token').then(function (token) { _this.token = token; });
        });
        this.member_data = navParams.get("member_data");
        this.myProfile(this.member_data);
        this.getPrivacy(this.member_data);
    }
    MyprofilesettingPage.prototype.myProfile = function (member_data) {
        var _this = this;
        this.communityServices.myprofile(this.member_data).subscribe(function (users) {
            _this.myProfile = users.result;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    MyprofilesettingPage.prototype.getPrivacy = function (member_data) {
        var _this = this;
        this.communityServices.getPrivacy(this.member_data).subscribe(function (users) {
            var Privacy = users.result[0];
            _this.avatar = Privacy.privacy_avatar;
            _this.birthday = Privacy.privacy_birthday;
            _this.email = Privacy.privacy_email;
            _this.location = Privacy.privacy_location;
            _this.mobile = Privacy.privacy_mobile;
            _this.name = Privacy.privacy_name;
            console.log(_this.location);
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    MyprofilesettingPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    MyprofilesettingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyprofilesettingPage');
    };
    return MyprofilesettingPage;
}());
MyprofilesettingPage = __decorate([
    Component({
        selector: 'page-myprofilesetting',
        templateUrl: 'myprofilesetting.html'
    }),
    __metadata("design:paramtypes", [NavController, Storage, CommunityServices, NavParams, ViewController])
], MyprofilesettingPage);
export { MyprofilesettingPage };
//# sourceMappingURL=myprofilesetting.js.map