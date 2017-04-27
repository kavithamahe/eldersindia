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
import { NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { JobBoardService } from '../../providers/job-board-service';
import { SinglejobPage } from '../../pages/singlejob/singlejob';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { JobDependentPage } from '../../pages/job-dependent/job-dependent';
/*
  Generated class for the Jobboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var JobboardPage = (function () {
    function JobboardPage(navCtrl, navParams, storage, loadingCtrl, toastCtrl, jobBoardService, modalCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.jobBoardService = jobBoardService;
        this.modalCtrl = modalCtrl;
        this.emptyRecordSet = '';
        this.nextPageURL = '';
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('user_type').then(function (user_type) { _this.user_type = user_type; });
            storage.get('user_type_id').then(function (user_type_id) { _this.user_type_id = user_type_id; });
            storage.get('token').then(function (token) {
                _this.token = token;
                _this.onInit();
            });
        });
    }
    JobboardPage.prototype.onInit = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.jobBoardService.jobsList().subscribe(function (jobBoard) {
            _this.jobBoardInfo = jobBoard.result.info.data;
            _this.nextPageURL = jobBoard.result.info.next_page_url;
            _this.emptyRecordSet = '';
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
                _this.emptyRecordSet = JSON.parse(err._body).error;
            }
            else {
                _this.showToaster("Try again later");
            }
        });
        loader.dismiss();
    };
    JobboardPage.prototype.viewJob = function (jobId) {
        this.navCtrl.push(SinglejobPage, { jobId: jobId });
    };
    JobboardPage.prototype.applyJob = function (jobId) {
        if (this.user_type == 'elder') {
            this.jobDependentId = this.user_type_id;
            this.callApplyJob(jobId, this.jobDependentId);
        }
        else {
            this.jobDependent(jobId);
        }
    };
    JobboardPage.prototype.callApplyJob = function (jobId, jobDependentId) {
        var _this = this;
        this.jobBoardService.applyJob(jobId, jobDependentId).subscribe(function (applyJob) {
            // this.applyJobInfo=applyJob.result;  
            _this.showToaster(applyJob.result);
            //console.log(singleJob);
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
    };
    JobboardPage.prototype.showToaster = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    JobboardPage.prototype.dashboardPage = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    JobboardPage.prototype.jobDependent = function (jobId) {
        var _this = this;
        var modal = this.modalCtrl.create(JobDependentPage);
        modal.onDidDismiss(function (data) {
            _this.jobDependentId = data.dependent;
            if (_this.jobDependentId != '') {
                _this.callApplyJob(jobId, _this.jobDependentId);
            }
        });
        modal.present();
    };
    JobboardPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            if (_this.nextPageURL != null && _this.nextPageURL != '') {
                _this.jobBoardscroll();
            }
            else {
                infiniteScroll.enable(false);
            }
            infiniteScroll.complete();
        }, 500);
    };
    JobboardPage.prototype.jobBoardscroll = function () {
        var _this = this;
        this.jobBoardService.JobBoardscroll(this.nextPageURL).subscribe(function (JobBoardscroll) {
            _this.jobBoardScrollLists = JobBoardscroll.result.info.data;
            for (var i = 0; i < Object.keys(_this.jobBoardScrollLists).length; i++) {
                _this.jobBoardInfo.push(_this.jobBoardScrollLists[i]);
            }
            _this.nextPageURL = JobBoardscroll.result.info.next_page_url;
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
    };
    return JobboardPage;
}());
JobboardPage = __decorate([
    Component({
        selector: 'page-jobboard',
        templateUrl: 'jobboard.html',
        providers: [JobBoardService]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Storage, LoadingController, ToastController, JobBoardService, ModalController])
], JobboardPage);
export { JobboardPage };
//# sourceMappingURL=jobboard.js.map