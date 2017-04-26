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
import { NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { JobBoardService } from '../../providers/job-board-service';
/*
  Generated class for the JobDependent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var JobDependentPage = (function () {
    function JobDependentPage(navCtrl, navParams, viewCtrl, jobBoardService, storage, loadingCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.jobBoardService = jobBoardService;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('id').then(function (id) { _this.user_id = id; });
            storage.get('token').then(function (token) {
                _this.token = token;
                _this.getDependent();
            });
        });
    }
    JobDependentPage.prototype.getDependent = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.jobBoardService.getDependent().subscribe(function (getDependent) {
            _this.getDependentList = getDependent;
            console.log(_this.getDependentList);
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
    JobDependentPage.prototype.showToaster = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    JobDependentPage.prototype.dismiss = function () {
        var data = { 'dependent': '' };
        this.viewCtrl.dismiss(data);
    };
    JobDependentPage.prototype.submitDependent = function () {
        var data = { 'dependent': this.dependent };
        this.viewCtrl.dismiss(data);
    };
    return JobDependentPage;
}());
JobDependentPage = __decorate([
    Component({
        selector: 'page-job-dependent',
        templateUrl: 'job-dependent.html',
        providers: [JobBoardService]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ViewController, JobBoardService, Storage, LoadingController, ToastController])
], JobDependentPage);
export { JobDependentPage };
//# sourceMappingURL=job-dependent.js.map