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
import { NavController, LoadingController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { EldersPage } from '../elders/elders';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CommunityServices } from '../../providers/community-services';
var ManagePage = (function () {
    function ManagePage(alertCtrl, nav, storage, navParams, toastCtrl, loadingCtrl, communityServices) {
        this.alertCtrl = alertCtrl;
        this.nav = nav;
        this.storage = storage;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.communityServices = communityServices;
        this.show_option = false;
        this.showblock = null;
        this.allowedElderFlag = true;
        this.nav = nav;
    }
    ManagePage.prototype.showConfirm = function () {
        var _this = this;
        var DeleteId = this.manage_elder.id;
        var confirm = this.alertCtrl.create({
            subTitle: 'Confirm Deletion',
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Agree',
                    handler: function () {
                        _this.deleteElder(DeleteId);
                        _this.manageDetail();
                    }
                }
            ]
        });
        confirm.present();
    };
    ManagePage.prototype.manageDetail = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.communityServices.manageLists().subscribe(function (manages) {
            _this.manages = manages.result.info.data;
            _this.allowedElderFlag = manages.result.allowedElderFlag;
        });
        loader.dismiss();
    };
    ManagePage.prototype.showOptions = function (user) {
        this.manage_elder = user;
        console.log("options are pressed");
        if (this.show_option == false) {
            this.show_option = true;
        }
    };
    ManagePage.prototype.closeOption = function () {
        if (this.show_option == true) {
            this.show_option = false;
        }
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
    ManagePage.prototype.editElder = function () {
        var elder = this.manage_elder;
        var data = { "fuctionality": "edit", "editData": elder };
        this.nav.push(EldersPage, data);
    };
    ManagePage.prototype.deleteElder = function (id) {
        var _this = this;
        this.communityServices.deleteDetail(id).subscribe(function (datas) {
            _this.showToast(datas.result);
            _this.manageDetail();
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
    ManagePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.ready().then(function () {
            _this.storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            _this.storage.get('id').then(function (id) { _this.user_id = id; });
            _this.storage.get('token').then(function (token) {
                _this.token = token;
                _this.manageDetail();
            });
        });
    };
    ManagePage.prototype.dashboardPage = function () {
        this.nav.setRoot(DashboardPage);
    };
    return ManagePage;
}());
ManagePage = __decorate([
    Component({
        selector: 'page-manage',
        templateUrl: 'manage.html',
        providers: [CommunityServices]
    }),
    __metadata("design:paramtypes", [AlertController, NavController, Storage, NavParams, ToastController, LoadingController, CommunityServices])
], ManagePage);
export { ManagePage };
//# sourceMappingURL=manage.js.map