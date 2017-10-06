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
import { NavController, NavParams, LoadingController, Platform, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { Externallinks } from '../../providers/externallinks';
import { InAppBrowser } from 'ionic-native';
/*
  Generated class for the Externallinks page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ExternallinksPage = (function () {
    function ExternallinksPage(platform, navCtrl, navParams, storage, externallinks, loadingCtrl, toastCtrl) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.externallinks = externallinks;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.nextPageURL = '';
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('token').then(function (token) {
                _this.token = token;
                _this.externalLinksList();
            });
        });
    }
    ExternallinksPage.prototype.externalLinksList = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.externallinks.externalLinksList().subscribe(function (users) {
            _this.externalLinks = users.result.data;
            _this.nextPageURL = users.result.next_page_url;
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
    ExternallinksPage.prototype.showToaster = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    ExternallinksPage.prototype.openUrl = function (metalink_url) {
        console.log("URL is ", metalink_url);
        this.platform.ready().then(function () {
            var browser = new InAppBrowser(metalink_url, '_blank');
        });
    };
    ExternallinksPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            if (_this.nextPageURL != null && _this.nextPageURL != '') {
                _this.linksscroll();
            }
            else {
                infiniteScroll.enable(false);
            }
            infiniteScroll.complete();
        }, 500);
    };
    ExternallinksPage.prototype.linksscroll = function () {
        var _this = this;
        this.externallinks.linksscroll(this.nextPageURL).subscribe(function (eventsscroll) {
            _this.eventScrollLists = eventsscroll.result.data;
            for (var i = 0; i < Object.keys(_this.eventScrollLists).length; i++) {
                _this.externalLinks.push(_this.eventScrollLists[i]);
            }
            _this.nextPageURL = eventsscroll.result.next_page_url;
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
    };
    ExternallinksPage.prototype.dashboardPage = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    ExternallinksPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ExternallinksPage');
    };
    return ExternallinksPage;
}());
ExternallinksPage = __decorate([
    Component({
        selector: 'page-externallinks',
        templateUrl: 'externallinks.html',
        providers: [Externallinks]
    }),
    __metadata("design:paramtypes", [Platform, NavController, NavParams, Storage, Externallinks, LoadingController, ToastController])
], ExternallinksPage);
export { ExternallinksPage };
//# sourceMappingURL=externallinks.js.map