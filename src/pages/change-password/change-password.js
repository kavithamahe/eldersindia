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
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceProvider } from '../../providers/service-provider';
/*
  Generated class for the ChangePassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ChangePasswordPage = (function () {
    function ChangePasswordPage(formBuilder, service, navCtrl, navParams) {
        this.formBuilder = formBuilder;
        this.service = service;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.password_submit = false;
        this.nav = navCtrl;
        this.change_password_Form = formBuilder.group({
            currentPassword: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            newPassword: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            re_enterPassword: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }
    ChangePasswordPage.prototype.submit = function () {
        var _this = this;
        if (this.change_password_Form.value.newPassword != this.change_password_Form.value.re_enterPassword) {
            this.password_submit = true;
            this.submitAttempt = false;
        }
        else {
            this.submitAttempt = false;
            this.password_submit = false;
            var change_password_data = { "current_password": this.change_password_Form.value.currentPassword, "new_password": this.change_password_Form.value.newPassword, "confirm_password": this.change_password_Form.value.re_enterPassword };
            this.service.webServiceCall("changePassword", change_password_data)
                .subscribe(function (data) {
                _this.service.showToast(data.result);
                _this.change_password_Form.reset();
            }, function (error) {
                _this.service.showErrorToast(error);
            });
        }
    };
    // dismiss(){
    // 	this.password_submit = false;
    // 	this.submitAttempt = false;
    //   this.nav.popToRoot();
    //   console.log("change password is attempting to close");
    // }
    ChangePasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChangePasswordPage');
    };
    return ChangePasswordPage;
}());
ChangePasswordPage = __decorate([
    Component({
        selector: 'page-change-password',
        templateUrl: 'change-password.html'
    }),
    __metadata("design:paramtypes", [FormBuilder, ServiceProvider, NavController, NavParams])
], ChangePasswordPage);
export { ChangePasswordPage };
//# sourceMappingURL=change-password.js.map