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
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { ServiceRequestService } from '../../providers/service-request-service';
/*
  Generated class for the ViewServiceRequest page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ViewServiceRequestPage = (function () {
    function ViewServiceRequestPage(navCtrl, navParams, storage, loadingCtrl, toastCtrl, serviceRequest) {
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
                _this.serviceRequestId = navParams.get("serviceRequestId");
                _this.onInit(_this.serviceRequestId);
            });
        });
    }
    ViewServiceRequestPage.prototype.onInit = function (serviceRequestId) {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.serviceRequest.viewServiceRequest(this.serviceRequestId).subscribe(function (viewServiceRequest) {
            _this.viewServiceRequestInfo = viewServiceRequest;
            console.log(_this.viewServiceRequestInfo);
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
    ViewServiceRequestPage.prototype.dashboardPage = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    ViewServiceRequestPage.prototype.showToaster = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    return ViewServiceRequestPage;
}());
ViewServiceRequestPage = __decorate([
    Component({
        selector: 'page-view-service-request',
        templateUrl: 'view-service-request.html',
        providers: [ServiceRequestService]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Storage, LoadingController, ToastController, ServiceRequestService])
], ViewServiceRequestPage);
export { ViewServiceRequestPage };
//# sourceMappingURL=view-service-request.js.map