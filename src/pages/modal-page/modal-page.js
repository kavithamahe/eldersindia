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
import { NavParams, ViewController, LoadingController, ModalController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceProvider } from '../../providers/service-provider';
import { TermsModalPage } from '../../pages/terms-modal/terms-modal';
import { Storage } from '@ionic/storage';
/*
  Generated class for the ModalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ModalContentPage = (function () {
    function ModalContentPage(modalCtrl, formBuilder, storage, loadingCtrl, providerService, params, viewCtrl) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.providerService = providerService;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.dependentLists = [];
        this.dependent = "";
        this.terms = false;
        this.checkTerms = false;
        console.log("modal content page", params.get("dependentList"));
        var loading = this.loadingCtrl.create({ content: 'Please wait...!' });
        loading.present();
        this.dependentLists = params.get("dependentList");
        this.modalForm = formBuilder.group({
            problem: ['', Validators.compose([Validators.minLength(5), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            date: ['', Validators.compose([Validators.required])],
            time: ['', Validators.compose([Validators.required])],
            contact: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
            dependents: ['', Validators.compose([Validators.required])]
        });
        loading.dismiss();
        // this.userType = "elder";
        storage.get('user_type').then(function (user_type) { _this.userType = user_type; });
        if (this.userType != 'sponsor') {
            storage.get('id').then(function (id) { _this.elderId = id; });
        }
    }
    ModalContentPage.prototype.termsChanged = function () {
        console.log(this.terms);
        if (this.terms == true) {
            this.checkTerms = false;
        }
        else {
            this.checkTerms = true;
        }
    };
    ModalContentPage.prototype.openTerms = function () {
        var termsModal = this.modalCtrl.create(TermsModalPage);
        termsModal.present();
    };
    ModalContentPage.prototype.submit = function () {
        if (!this.modalForm.valid || (this.terms == false)) {
            this.submitAttempt = true;
            if (this.terms == false) {
                this.checkTerms = true;
            }
        }
        else {
            this.submitAttempt = false;
            if (this.userType != 'sponsor') {
                this.dependent = this.elderId;
            }
            else {
                this.dependent = this.modalForm.value.dependents;
            }
            var serviceData = { "problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date + " " + this.modalForm.value.time, "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact };
            console.log(serviceData);
            this.viewCtrl.dismiss(serviceData);
        }
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
        providers: [TermsModalPage]
    }),
    __metadata("design:paramtypes", [ModalController, FormBuilder, Storage, LoadingController, ServiceProvider, NavParams, ViewController])
], ModalContentPage);
export { ModalContentPage };
//# sourceMappingURL=modal-page.js.map