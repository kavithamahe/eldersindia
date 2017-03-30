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
import { ServiceProvider } from '../../providers/service-provider';
/*
  Generated class for the ForgotPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ForgotPasswordPage = (function () {
    function ForgotPasswordPage(service, viewCtrl, navCtrl, navParams) {
        this.service = service;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mailId = "";
        this.modalType = navParams.get("modalType");
        this.passwordCode = navParams.get("passCode");
    }
    ForgotPasswordPage.prototype.submit = function () {
        if (this.modalType == 'forgotPassword') {
            if (this.mailId != 'test@gmail.com') {
                this.service.showToast("Enter a valid Gmail..!");
            }
            else {
                this.modalData = { "emailId": this.mailId };
                var submitData = { "modalType": this.modalType, modalData: this.modalData };
                this.viewCtrl.dismiss(submitData);
            }
        }
        else if (this.resetCode != this.passwordCode) {
            this.service.showToast("Invaild code.!");
        }
        else if (this.newPassword == '' || this.newPassword == null) {
            this.service.showToast("Enter the Pass word to proceed.!");
        }
        else if (this.newPassword != this.reEnterPassword) {
            this.service.showToast("Entered Password does not match.");
        }
        else {
            this.modalData = { "resetCode": this.resetCode, "newPassword": this.newPassword };
            var submitData = { "modalType": this.modalType, modalData: this.modalData };
            this.viewCtrl.dismiss(submitData);
        }
    };
    ForgotPasswordPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss("dismiss");
    };
    ForgotPasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ForgotPasswordPage');
    };
    return ForgotPasswordPage;
}());
ForgotPasswordPage = __decorate([
    Component({
        selector: 'page-forgot-password',
        templateUrl: 'forgot-password.html'
    }),
    __metadata("design:paramtypes", [ServiceProvider, ViewController, NavController, NavParams])
], ForgotPasswordPage);
export { ForgotPasswordPage };
//# sourceMappingURL=forgot-password.js.map