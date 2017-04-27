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
/*
  Generated class for the ServiceModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ServiceModalPage = (function () {
    function ServiceModalPage(viewCtrl, navCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.showContactDetails = false;
        this.showServiceOffered = false;
        this.vendorList = navParams.get("vendorList");
        if (navParams.get("service") == "contact") {
            this.showContactDetails = true;
            this.title = "Contact Details";
        }
        else {
            this.showServiceOffered = true;
            this.title = "Service Offered";
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
    ServiceModalPage.prototype.show_sub_category = function () {
        this.show_service = false;
        if (this.sub_category) {
            this.sub_category = false;
        }
        else {
            this.sub_category = true;
        }
    };
    ServiceModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ServiceModalPage');
    };
    return ServiceModalPage;
}());
ServiceModalPage = __decorate([
    Component({
        selector: 'page-service-modal',
        templateUrl: 'service-modal.html'
    }),
    __metadata("design:paramtypes", [ViewController, NavController, NavParams])
], ServiceModalPage);
export { ServiceModalPage };
//# sourceMappingURL=service-modal.js.map