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
import { LoadingController, ViewController, NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ServiceInfoPage } from '../service-info/service-info';
import { ModalContentPage } from '../modal-page/modal-page';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { ServiceProvider } from '../../providers/service-provider';
/*
  Generated class for the SubcategoryList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SubcategoryListPage = (function () {
    function SubcategoryListPage(loadingCtrl, providerService, navCtrl, altCtrl, navParams, toastCtrl, modalCtrl, mp, storage) {
        var _this = this;
        this.loadingCtrl = loadingCtrl;
        this.providerService = providerService;
        this.navCtrl = navCtrl;
        this.altCtrl = altCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.mp = mp;
        this.storage = storage;
        this.sublists = [];
        this.dependentLists = [];
        this.location_id = navParams.get("location_id");
        this.service_id = navParams.get("service").id;
        this.serviceTitle = navParams.get("service").name;
        // this.userType = "elder";
        this.rate = 3;
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.logoUrl = imageurl; });
            storage.get('user_type').then(function (user_type) { _this.userType = user_type; });
            if (_this.userType != 'sponsor') {
                storage.get('id').then(function (id) { _this.elderId = id; });
            }
            storage.get('token').then(function (token) {
                _this.token = token;
                _this.loadSubcategoryList(_this.service_id, _this.location_id);
            });
        });
    }
    SubcategoryListPage.prototype.loadSubcategoryList = function (subCategory_id, location_id) {
        var _this = this;
        console.log("loading vendor list for the service");
        this.subCategorydata = { subCategoryId: subCategory_id, flag: "1", locationId: location_id };
        // this.providerService.loadServiceProviderList(this.subCategorydata)
        this.providerService.webServiceCall("getServiceProviderlist", this.subCategorydata)
            .subscribe(function (data) {
            _this.sublists = data.result.info;
            _this.dependentLists = data.result.info.dependentLists;
            _this.serviceData = data.result.info.requestServices;
            console.log("dependentList data : " + _this.dependentLists);
        }, function (err) {
            _this.providerService.showErrorToast(err);
        });
    };
    SubcategoryListPage.prototype.serviceInfo = function (vendor) {
        var servieListData = { "vendor": vendor, "subCategoryId": this.service_id, "flag": "1", "location_id": this.location_id };
        this.navCtrl.push(ServiceInfoPage, servieListData);
    };
    SubcategoryListPage.prototype.instantRequest = function (vendor_id) {
        if (this.userType != "sponsor") {
            this.serviceRequestCall("", vendor_id);
        }
        else {
            this.openModal("instant", vendor_id);
            // let instantRequestmodal = this.modalCtrl.create(InstantRequestModalPage, {dependentList:this.dependentLists});
            // instantRequestmodal.onDidDismiss(data =>{
            //   if(data == "dismiss"){
            //     console.log(" Instant Request modal dismissed..!");
            //   }else{
            //         this.serviceRequestCall(data);
            //        }
            //   })  
            // instantRequestmodal.present();   
        }
    };
    SubcategoryListPage.prototype.openModal = function (modalPage, vendor_id) {
        var _this = this;
        if (modalPage == "instant") {
            this.modal = this.modalCtrl.create(InstantRequestModalPage, { dependentList: this.dependentLists, service: this.serviceTitle });
        }
        else {
            this.modal = this.modalCtrl.create(ModalContentPage, { dependentList: this.dependentLists });
        }
        this.modal.onDidDismiss(function (data) {
            if (data == "dismiss") {
                console.log(" schedule request modal dismissed..!");
            }
            else {
                _this.serviceRequestCall(data, vendor_id);
            }
        });
        this.modal.present();
    };
    SubcategoryListPage.prototype.dashboardPage = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    SubcategoryListPage.prototype.serviceRequestCall = function (service_request_data, vendorId) {
        var _this = this;
        var requestServiceData = { "location_id": this.location_id, "vendor_id": vendorId, "category_id": this.serviceData.category_id, "sub_category_id": this.serviceData.sub_category_id, "service_id": this.serviceData.service_id, "problem": service_request_data.problem, "datetime": service_request_data.datetime, "dependentid": service_request_data.dependentId, "mobile": service_request_data.mobile_no };
        this.providerService.webServiceCall("serviceRequest", requestServiceData)
            .subscribe(function (data) {
            console.log("service request web service");
            console.log(".......", data.result);
            _this.providerService.showToast(data.result);
        }, function (err) {
            _this.providerService.showErrorToast(err);
            console.log("Response for serviceRequest: " + err);
        });
    };
    return SubcategoryListPage;
}());
SubcategoryListPage = __decorate([
    Component({
        selector: 'page-subcategory-list',
        templateUrl: 'subcategory-list.html',
        providers: [ModalContentPage]
    }),
    __metadata("design:paramtypes", [LoadingController, ServiceProvider, NavController, AlertController, NavParams, ToastController, ModalController, ModalContentPage, Storage])
], SubcategoryListPage);
export { SubcategoryListPage };
var InstantRequestModalPage = (function () {
    function InstantRequestModalPage(params, viewCtrl) {
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.dependentData = "";
        this.selected = false;
        console.log("modal page called");
        this.dependentLists = this.params.get('dependentList');
        this.service = this.params.get('service');
    }
    InstantRequestModalPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss("dismiss");
    };
    InstantRequestModalPage.prototype.submit = function () {
        if (this.dependentData != "") {
            this.selected = false;
            var dependent_model = this.dependentData;
            // let date = new Date();
            var d = new Date();
            var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
                d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
            console.log(d, datestring);
            var serviceRequestData = { "problem": this.service, "datetime": datestring, "dependentId": dependent_model.id, "mobile_no": dependent_model.mobile };
            this.viewCtrl.dismiss(serviceRequestData);
        }
        else {
            this.selected = true;
        }
    };
    return InstantRequestModalPage;
}());
InstantRequestModalPage = __decorate([
    Component({
        template: "\n<div class=\"ion-modal modal-popups\">\n<ion-header>\n<ion-toolbar class=\"hei-head\">\n    <ion-title color=\"primary\" class=\"tittles-md\">\n      Dependent List\n    </ion-title>\n    <ion-buttons start item-right class=\"close-iconss\">\n      <button ion-button (click)=\"dismiss()\">\n        <span ion-text color=\"primary\" showWhen=\"ios\">Cancel</span>\n        <ion-icon ios=\"ios-close-circle-outline\" md=\"md-close-circle\" ></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"popup-mds\">\n  <ion-item *ngIf(selected)>\n  <p class=\"err-reds\"> Dependent not selected</p>\n  </ion-item>\n  <ion-row>\n      <ion-item >\n            <ion-label>Select Dependent</ion-label>\n              <ion-select [(ngModel)]=\"dependentData\">\n                <ion-option *ngFor = \"let dependent of dependentLists\" [value]=\"dependent\">{{dependent.name}}\n                </ion-option>\n              </ion-select>\n          </ion-item>\n  </ion-row>\n  <ion-row>\n  <ion-col><button ion-button class=\"btn-defaults\" item-left small (click)=\"dismiss()\">Cancel</button></ion-col>\n  <ion-col offset-33><button class=\"btn-primarys\" ion-button item-right small (click)=\"submit()\">Submit</button></ion-col>\n  </ion-row>\n</ion-content>\n</div>\n"
    }),
    __metadata("design:paramtypes", [NavParams,
        ViewController])
], InstantRequestModalPage);
export { InstantRequestModalPage };
//# sourceMappingURL=subcategory-list.js.map