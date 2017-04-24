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
import { ViewController, NavController, NavParams } from 'ionic-angular';
/*
  Generated class for the TermsModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var TermsModalPage = (function () {
    function TermsModalPage(viewCtrl, navCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.show_description = false;
        this.show_application_use = false;
        this.show_eligibility = false;
        this.show_user_accounts = false;
        this.show_renewal = false;
        this.show_personal_info = false;
        this.show_content = false;
        this.show_license = false;
        this.show_Intellectual = false;
        this.show_trade_marks = false;
        this.show_restrictions = false;
        this.show_termination = false;
        this.show_limitation = false;
        this.show_indemnification = false;
        this.show_miscellaneous = false;
        this.show_contact_us = false;
    }
    TermsModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TermsModalPage');
    };
    TermsModalPage.prototype.showDescription = function () {
        if (this.show_description == false) {
            this.show_description = true;
        }
        else {
            this.show_description = false;
        }
    };
    TermsModalPage.prototype.showDescription = function () {
        if (this.show_description == false) {
            this.show_description = true;
        }
        else {
            this.show_description = false;
        }
    };
    TermsModalPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return TermsModalPage;
}());
TermsModalPage = __decorate([
    Component({
        selector: 'page-terms-modal',
        templateUrl: 'terms-modal.html'
    }),
    __metadata("design:paramtypes", [ViewController, NavController, NavParams])
], TermsModalPage);
export { TermsModalPage };
//# sourceMappingURL=terms-modal.js.map