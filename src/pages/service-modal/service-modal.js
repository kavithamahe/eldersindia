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
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SubcategoryListPage } from '../subcategory-list/subcategory-list';
/*
  Generated class for the ServiceModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ServiceModalPage = (function () {
    function ServiceModalPage(storage, viewCtrl, navCtrl, navParams) {
        this.storage = storage;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.show_service = null;
        this.showContactDetails = false;
        this.showServiceOffered = false;
        this.vendorList = navParams.get("vendorList");
        if (navParams.get("service") == "contact") {
            this.showContactDetails = true;
            this.title = this.vendorList.vendorDetails.name + " - Contact Details";
        }
        else {
            this.showServiceOffered = true;
            this.title = this.vendorList.vendorDetails.name + " - Service Offered";
        }
    }
    ServiceModalPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ServiceModalPage.prototype.showService = function (event) {
        // this.comment="";
        if (this.show_service == event) {
            this.show_service = null;
        }
        else {
            this.show_service = event;
        }
    };
    ServiceModalPage.prototype.goToService = function (sub_service) {
        var service = { id: sub_service.service_id, name: sub_service.service };
        var location_id = this.locationId;
        this.navCtrl.push(SubcategoryListPage, { location_id: location_id, service: service });
    };
    ServiceModalPage.prototype.show_sub_category = function () {
        this.show_service = false;
        if (this.sub_category) {
            this.sub_category = false;
        }
        else {
            this.sub_category = true;
        }
    };
    ServiceModalPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.ready().then(function () {
            _this.storage.get('service_location').then(function (location) { _this.locationId = location; });
        });
    };
    return ServiceModalPage;
}());
ServiceModalPage = __decorate([
    Component({
        selector: 'page-service-modal',
        templateUrl: 'service-modal.html'
    }),
    __metadata("design:paramtypes", [Storage, ViewController, NavController, NavParams])
], ServiceModalPage);
export { ServiceModalPage };
//# sourceMappingURL=service-modal.js.map