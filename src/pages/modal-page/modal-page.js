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
import { NavParams, ViewController, LoadingController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service-provider';
import { Storage } from '@ionic/storage';
/*
  Generated class for the ModalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ModalContentPage = (function () {
    function ModalContentPage(storage, loadingCtrl, providerService, params, viewCtrl) {
        var _this = this;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.providerService = providerService;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.problem = "";
        this.date = "";
        this.contact = "";
        this.dependent = "";
        this.dependentLists = [];
        console.log(params.get("dependentList"));
        var loading = this.loadingCtrl.create({ content: 'Please wait...!' });
        loading.present();
        this.dependentLists = params.get("dependentList");
        loading.dismiss();
        // this.userType = "elder";
        storage.get('user_type').then(function (user_type) { _this.userType = user_type; });
        if (this.userType != 'sponsor') {
            storage.get('id').then(function (id) { _this.elderId = id; });
        }
    }
    ModalContentPage.prototype.submit = function () {
        var serviceData = { "problem": this.problem, "datetime": this.date, "dependentid": this.dependent, "mobile": this.contact };
        this.viewCtrl.dismiss(serviceData);
        console.log("service modal submitted..!");
    };
    ModalContentPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss("dismiss");
    };
    return ModalContentPage;
}());
ModalContentPage = __decorate([
    Component({
        selector: 'page-modal-page',
        templateUrl: 'modal-page.html',
    }),
    __metadata("design:paramtypes", [Storage, LoadingController, ServiceProvider, NavParams, ViewController])
], ModalContentPage);
export { ModalContentPage };
//# sourceMappingURL=modal-page.js.map