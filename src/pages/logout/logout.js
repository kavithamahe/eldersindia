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
import { Storage } from '@ionic/storage';
import { LoginPage } from '../../pages/login/login';
/*
  Generated class for the Logout page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var LogoutPage = (function () {
    function LogoutPage(navCtrl, navParams, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.storage.clear();
        this.storage.ready().then(function () {
            _this.storage.clear();
            _this.storage.set('id', '');
            _this.storage.set('token', '');
            _this.navCtrl.setRoot(LoginPage);
        });
    }
    return LogoutPage;
}());
LogoutPage = __decorate([
    Component({
        selector: 'page-logout',
        templateUrl: 'logout.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Storage])
], LogoutPage);
export { LogoutPage };
//# sourceMappingURL=logout.js.map