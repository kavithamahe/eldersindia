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
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ServiceRequestService } from '../../providers/service-request-service';
import { ViewServiceRequestPage } from '../../pages/view-service-request/view-service-request';
import { DashboardPage } from '../../pages/dashboard/dashboard';
/*
  Generated class for the Servicerequest page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ServicerequestPage = (function () {
    function ServicerequestPage(navCtrl, navParams, storage, loadingCtrl, toastCtrl, serviceRequest) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.serviceRequest = serviceRequest;
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('token').then(function (token) {
                _this.token = token;
                // this.blogId=navParams.get("blogId");
                _this.onInit();
            });
        });
    }
    ServicerequestPage.prototype.onInit = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.serviceRequest.serviceRequestList().subscribe(function (serviceRequest) {
            _this.serviceRequestInfo = serviceRequest.result.info;
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
    return ServicerequestPage;
}());
ServicerequestPage = __decorate([
    Component({
        selector: 'page-servicerequest',
        templateUrl: 'servicerequest.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Storage, LoadingController, ToastController, ServiceRequestService])
], ServicerequestPage);
export { ServicerequestPage };
//# sourceMappingURL=servicerequest.js.map