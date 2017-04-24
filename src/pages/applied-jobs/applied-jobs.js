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
import { JobBoardService } from '../../providers/job-board-service';
import { SinglejobPage } from '../../pages/singlejob/singlejob';
import { DashboardPage } from '../../pages/dashboard/dashboard';
/*
  Generated class for the AppliedJobs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var AppliedJobsPage = (function () {
    function AppliedJobsPage(navCtrl, navParams, jobBoardService, storage, loadingCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.jobBoardService = jobBoardService;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.nextPageURL = '';
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('token').then(function (token) {
                _this.token = token;
                _this.appliedJobs();
            });
        });
    }
    AppliedJobsPage.prototype.appliedJobs = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.jobBoardService.appliedJobs().subscribe(function (appliedJobs) {
            _this.appliedJobsList = appliedJobs.result.info.data;
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
    AppliedJobsPage.prototype.dashboardPage = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    AppliedJobsPage.prototype.showToaster = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    AppliedJobsPage.prototype.viewJob = function (jobId) {
        this.navCtrl.push(SinglejobPage, { jobId: jobId });
    };
    AppliedJobsPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            if (_this.nextPageURL != null && _this.nextPageURL != '') {
                _this.appliedJobscroll();
            }
            else {
                infiniteScroll.enable(false);
            }
            infiniteScroll.complete();
        }, 500);
    };
    AppliedJobsPage.prototype.appliedJobscroll = function () {
        var _this = this;
        this.jobBoardService.appliedJobscroll(this.nextPageURL).subscribe(function (appliedJobscroll) {
            _this.appliedJobScrollLists = appliedJobscroll.result.info.data;
            for (var i = 0; i < Object.keys(_this.appliedJobScrollLists).length; i++) {
                _this.appliedJobsList.push(_this.appliedJobScrollLists[i]);
            }
            _this.nextPageURL = appliedJobscroll.result.info.next_page_url;
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
    };
    return AppliedJobsPage;
}());
AppliedJobsPage = __decorate([
    Component({
        selector: 'page-applied-jobs',
        templateUrl: 'applied-jobs.html',
        providers: [JobBoardService]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, JobBoardService, Storage, LoadingController, ToastController])
], AppliedJobsPage);
export { AppliedJobsPage };
//# sourceMappingURL=applied-jobs.js.map