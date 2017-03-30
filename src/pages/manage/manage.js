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
import { NavController, LoadingController, NavParams, ToastController } from 'ionic-angular';
import { EldersPage } from '../elders/elders';
import { CommunityServices } from '../../providers/community-services';
var ManagePage = (function () {
    function ManagePage(nav, navParams, toastCtrl, loadingCtrl, communityServices) {
        this.nav = nav;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.communityServices = communityServices;
        this.showblock = null;
        this.nav = nav;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.manageDetail();
        loader.dismiss();
    }
    ManagePage.prototype.manageDetail = function () {
        var _this = this;
        this.communityServices.manageLists().subscribe(function (manages) {
            _this.manages = manages.result.info.data;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    ManagePage.prototype.toggleDetails = function (event) {
        if (this.showblock == null) {
            this.showblock = event;
        }
        else {
            this.showblock = null;
        }
    };
    ManagePage.prototype.addElder = function () {
        var data = { fuctionality: "add" };
        this.nav.push(EldersPage, data);
    };
    ManagePage.prototype.editElder = function (editData) {
        var data = { fuctionality: "edit", "editData": editData };
        this.nav.push(EldersPage, data);
    };
    ManagePage.prototype.deleteElder = function (id) {
        var _this = this;
        this.communityServices.deleteDetail(id).subscribe(function (datas) {
            _this.showToast(datas.result);
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    ManagePage.prototype.showToast = function (messageData) {
        var toast = this.toastCtrl.create({
            message: messageData,
            position: "top",
            duration: 3000
        });
        toast.present();
    };
    return ManagePage;
}());
ManagePage = __decorate([
    Component({
        selector: 'page-manage',
        templateUrl: 'manage.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ToastController, LoadingController, CommunityServices])
], ManagePage);
export { ManagePage };
//# sourceMappingURL=manage.js.map