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
import { EditProfilePage } from '../edit-profile/edit-profile';
import { ServiceProvider } from '../../providers/service-provider';
/*
  Generated class for the MyProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var MyProfilePage = (function () {
    function MyProfilePage(providerService, navCtrl, navParams) {
        var _this = this;
        this.providerService = providerService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.providerService.webServiceCall("myaccount", "")
            .subscribe(function (data) {
            _this.profileData = data.result.info;
            _this.user_type = data.result.info.user_type;
            alert(_this.user_type);
        }, function (err) {
            _this.providerService.showErrorToast(err);
        });
    }
    MyProfilePage.prototype.editProfile = function () {
        this.navCtrl.push(EditProfilePage, { profileData: this.profileData });
    };
    return MyProfilePage;
}());
MyProfilePage = __decorate([
    Component({
        selector: 'page-my-profile',
        templateUrl: 'my-profile.html'
    }),
    __metadata("design:paramtypes", [ServiceProvider, NavController, NavParams])
], MyProfilePage);
export { MyProfilePage };
//# sourceMappingURL=my-profile.js.map