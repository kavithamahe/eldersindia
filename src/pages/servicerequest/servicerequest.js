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
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CallNumber } from 'ionic-native';
import { ServiceRequestService } from '../../providers/service-request-service';
import { ViewServiceRequestPage } from '../../pages/view-service-request/view-service-request';
import { DashboardPage } from '../../pages/dashboard/dashboard';
/*
  Generated class for the Servicerequest page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ServicerequestPage = (function () {
    function ServicerequestPage(alertCtrl, navCtrl, navParams, storage, loadingCtrl, toastCtrl, serviceRequest) {
        var _this = this;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.serviceRequest = serviceRequest;
        this.showRemark = null;
        this.rating = 0;
        this.remarks = '';
        this.nextPageURL = '';
        this.getRemarksList = [];
        this.serviceRequestScrollLists = [];
        this.vendorStatus = [];
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('token').then(function (token) {
                _this.token = token;
                // this.blogId=navParams.get("blogId");
                _this.onInit();
                _this.getRemarks();
            });
        });
    }
    ServicerequestPage.prototype.onInit = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.serviceRequest.serviceRequestList().subscribe(function (serviceRequest) {
            _this.serviceRequestInfo = serviceRequest.result.info.list.data;
            _this.vendorStatus = serviceRequest.result.info.status;
            _this.nextPageURL = serviceRequest.result.info.list.next_page_url;
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
        loader.dismiss();
    };
    ServicerequestPage.prototype.getRemarks = function () {
        var _this = this;
        this.serviceRequest.getRemarks().subscribe(function (getRemarks) {
            _this.getRemarksList = getRemarks.result.info.remark;
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
        });
    };
    ServicerequestPage.prototype.viewRequest = function (serviceRequestId) {
        this.navCtrl.push(ViewServiceRequestPage, { serviceRequestId: serviceRequestId });
    };
    ServicerequestPage.prototype.showToaster = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    ServicerequestPage.prototype.dashboardPage = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    ServicerequestPage.prototype.enableRemark = function (eventId) {
        this.remarks = '';
        this.rating = 0;
        if (this.showRemark == eventId) {
            this.showRemark = null;
        }
        else {
            this.showRemark = eventId;
        }
    };
    ServicerequestPage.prototype.submitRemark = function (serviceId) {
        var _this = this;
        if (this.rating == 0 && this.remarks == '') {
            this.showAlert('Please enter rating and remarks');
        }
        else if (this.rating == 0) {
            this.showAlert('Please enter rating');
        }
        else if (this.remarks == '') {
            this.showAlert('Please enter remarks');
        }
        else {
            var loader = this.loadingCtrl.create({ content: "Please wait..." });
            loader.present();
            this.serviceRequest.submitRemark(serviceId, this.rating, this.remarks).subscribe(function (submitRemark) {
                _this.showToaster(submitRemark.result);
                _this.remarks = '';
                _this.rating = 0;
                _this.showRemark = null;
                _this.onInit();
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
    ServicerequestPage.prototype.showAlert = function (errorMsg) {
        var alert = this.alertCtrl.create({
            title: 'Error Message',
            subTitle: errorMsg,
            buttons: ['OK']
        });
        alert.present();
    };
    ServicerequestPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            if (_this.nextPageURL != null && _this.nextPageURL != '') {
                _this.serviceRequestScroll();
            }
            else {
                infiniteScroll.enable(false);
            }
            infiniteScroll.complete();
        }, 500);
    };
    ServicerequestPage.prototype.serviceRequestScroll = function () {
        var _this = this;
        this.serviceRequest.serviceRequestScroll(this.nextPageURL).subscribe(function (serviceRequestScroll) {
            _this.serviceRequestScrollLists = serviceRequestScroll.result.info.list.data;
            for (var i = 0; i < Object.keys(_this.serviceRequestScrollLists).length; i++) {
                _this.serviceRequestInfo.push(_this.serviceRequestScrollLists[i]);
            }
            _this.nextPageURL = serviceRequestScroll.result.info.list.next_page_url;
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
    };
    ServicerequestPage.prototype.makeCall = function (number) {
        if (number) {
            CallNumber.callNumber(number, true)
                .then(function () { return console.log('Launched dialer!'); })
                .catch(function () { return console.log('Error launching dialer'); });
        }
        else {
            this.showToaster("There is no contact nuber");
        }
    };
    return ServicerequestPage;
}());
ServicerequestPage = __decorate([
    Component({
        selector: 'page-servicerequest',
        templateUrl: 'servicerequest.html',
        providers: [ServiceRequestService]
    }),
    __metadata("design:paramtypes", [AlertController, NavController, NavParams, Storage, LoadingController, ToastController, ServiceRequestService])
], ServicerequestPage);
export { ServicerequestPage };
//# sourceMappingURL=servicerequest.js.map