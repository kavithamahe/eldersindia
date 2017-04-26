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
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CommunityPage } from '../community/community';
import { CommunityServices } from '../../providers/community-services';
var CommunitylistPage = (function () {
    function CommunitylistPage(nav, storage, navParams, platform, toastCtrl, communityServices) {
        this.nav = nav;
        this.storage = storage;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.communityServices = communityServices;
        // private start:number=0;
        this.community = "mycommunity";
        this.isAndroid = false;
        this.searchTerm = '';
        this.nextPageURL = '';
        this.searchButton = false;
        this.searchTextBox = '';
        this.isAndroid = platform.is('android');
        // this.searchData = "";
    }
    CommunitylistPage.prototype.searchCall = function (searchValue) {
        this.searchButton = !searchValue;
    };
    CommunitylistPage.prototype.getPost = function (id) {
        this.nav.push(CommunityPage, { community_id: id });
    };
    CommunitylistPage.prototype.myCommunity = function (searchData) {
        var _this = this;
        this.communitylists = [];
        this.categoryLists = [];
        this.communityServices.myCommunity(searchData).
            subscribe(function (mycommunity) {
            _this.communitylists = mycommunity.result.info.data;
            _this.categoryLists = mycommunity.result.get.communityCategory;
            _this.nextPageURL = mycommunity.result.info.next_page_url;
        }, function (err) {
            _this.communitylists = [];
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunitylistPage.prototype.otherCommunity = function (data) {
        var _this = this;
        this.communitylists = [];
        this.categoryLists = [];
        this.communityServices.recommendedCommunity(data).
            subscribe(function (mycommunity) {
            _this.communitylists = mycommunity.result.info.data;
            _this.categoryLists = mycommunity.result.get.communityCategory;
            _this.nextPageURL = mycommunity.result.info.next_page_url;
        }, function (err) {
            _this.communitylists = [];
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunitylistPage.prototype.getItems = function (ev) {
        var val = ev.target.value;
        this.myCommunity(val);
    };
    CommunitylistPage.prototype.setItems = function (ev) {
        var val = ev.target.value;
        this.otherCommunity(val);
    };
    CommunitylistPage.prototype.getCategory = function (id) {
        var _this = this;
        this.communityServices.getCommunity(id).
            subscribe(function (mycommunity) {
            _this.communitylists = mycommunity.result.info.data;
            _this.categoryLists = mycommunity.result.get.communityCategory;
        }, function (err) {
            _this.communitylists = [];
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunitylistPage.prototype.setCategory = function (id) {
        var _this = this;
        this.communityServices.setCategory(id).
            subscribe(function (otherCommunity) {
            _this.communitylists = otherCommunity.result.info.data;
            _this.categoryLists = otherCommunity.result.get.communityCategory;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunitylistPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            if (_this.nextPageURL != null && _this.nextPageURL != '') {
                _this.communityscroll();
            }
            else {
                infiniteScroll.enable(false);
            }
            infiniteScroll.complete();
        }, 500);
    };
    CommunitylistPage.prototype.communityscroll = function () {
        var _this = this;
        this.communityServices.eventsscroll(this.nextPageURL).subscribe(function (eventsscroll) {
            _this.eventScrollLists = eventsscroll.result.info.data;
            for (var i = 0; i < Object.keys(_this.eventScrollLists).length; i++) {
                _this.communitylists.push(_this.eventScrollLists[i]);
            }
            _this.nextPageURL = eventsscroll.result.info.next_page_url;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunitylistPage.prototype.dashboardPage = function () {
        this.nav.setRoot(DashboardPage);
    };
    CommunitylistPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.ready().then(function () {
            _this.storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            _this.storage.get('id').then(function (id) { _this.id = id; });
            _this.storage.get('token').then(function (token) {
                _this.token = token;
                _this.myCommunity("");
            });
        });
    };
    return CommunitylistPage;
}());
CommunitylistPage = __decorate([
    Component({
        selector: 'page-communitylist',
        templateUrl: 'communitylist.html'
    }),
    __metadata("design:paramtypes", [NavController, Storage, NavParams, Platform, ToastController, CommunityServices])
], CommunitylistPage);
export { CommunitylistPage };
//# sourceMappingURL=communitylist.js.map