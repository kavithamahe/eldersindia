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
import { ServiceProvider } from '../../providers/service-provider';
import { DashboardPage } from '../../pages/dashboard/dashboard';
/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SettingsPage = (function () {
    function SettingsPage(storage, serviceProvider, navCtrl, navParams) {
        this.storage = storage;
        this.serviceProvider = serviceProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.settings = "paginate";
        this.records = 5;
    }
    SettingsPage.prototype.update = function () {
        if (this.settings == "paginate") {
            this.setPageCount();
        }
        else {
            this.privacy_submit();
        }
    };
    SettingsPage.prototype.change = function () {
        console.log("record count updated");
    };
    SettingsPage.prototype.getPageCount = function () {
        var _this = this;
        this.serviceProvider.webServiceCall('getPageCount', "")
            .subscribe(function (data) {
            _this.records = data.result;
            console.log("get page count: ", data);
        }, function (error) {
            if (error.status === 401) {
                _this.serviceProvider.showToast(JSON.parse(error._body).error);
            }
            else {
                _this.serviceProvider.showToast("Error while fetching results");
            }
        });
    };
    SettingsPage.prototype.setPageCount = function () {
        var _this = this;
        var pageCount = { pageCount: this.records };
        this.serviceProvider.webServiceCall('setPageCount', pageCount)
            .subscribe(function (data) {
            _this.records = data.paginate_value;
            _this.serviceProvider.showToast(data.result);
        }, function (error) {
            if (error.status === 401) {
                _this.serviceProvider.showToast(JSON.parse(error._body).error);
            }
            else {
                _this.serviceProvider.showToast("Error while fetching results");
            }
        });
    };
    SettingsPage.prototype.getPrivacy = function () {
        var _this = this;
        var requestId = { "user_id": this.user_uid };
        this.serviceProvider.webServiceCall('getPrivacy', requestId)
            .subscribe(function (data) {
            console.log("JSON.parse('true')", JSON.parse("true"));
            var info = data.result[0];
            _this.user_id = info.id;
            _this.user_uid = info.uid;
            _this.privacy_name = JSON.parse(info.privacy_name);
            _this.privacy_email = JSON.parse(info.privacy_email);
            _this.privacy_mobile = JSON.parse(info.privacy_mobile);
            _this.privacy_location = JSON.parse(info.privacy_location);
            _this.privacy_birthday = JSON.parse(info.privacy_birthday);
            _this.privacy_avatar = JSON.parse(info.privacy_avatar);
            _this.status = info.status;
        }, function (error) {
            if (error.status === 401) {
                _this.serviceProvider.showToast(JSON.parse(error._body).error);
            }
            else {
                _this.serviceProvider.showToast("Error while fetching results");
            }
        });
    };
    SettingsPage.prototype.privacy_submit = function () {
        var _this = this;
        var data = { "info": {
                "id": this.user_id,
                "uid": this.user_uid,
                "privacy_name": this.privacy_name,
                "privacy_email": this.privacy_email,
                "privacy_mobile": this.privacy_mobile,
                "privacy_location": this.privacy_location,
                "privacy_birthday": this.privacy_birthday,
                "privacy_avatar": this.privacy_avatar,
                "status": this.status
            } };
        this.serviceProvider.webServiceCall('setPrivacy', data)
            .subscribe(function (data) {
            _this.serviceProvider.showToast(data.result);
            console.log(data);
            _this.getPrivacy();
        }, function (error) {
            if (error.status === 401) {
                _this.serviceProvider.showToast(JSON.parse(error._body).error);
            }
            else {
                _this.serviceProvider.showToast("Server Error..!");
            }
        });
    };
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsPage');
    };
    SettingsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.ready().then(function () {
            _this.storage.get('id').then(function (id) {
                _this.user_uid = id;
                _this.getPrivacy();
                _this.getPageCount();
            });
        });
    };
    SettingsPage.prototype.dashboardPage = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    Component({
        selector: 'page-settings',
        templateUrl: 'settings.html'
    }),
    __metadata("design:paramtypes", [Storage, ServiceProvider, NavController, NavParams])
], SettingsPage);
export { SettingsPage };
//# sourceMappingURL=settings.js.map