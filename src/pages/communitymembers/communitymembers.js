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
import { Storage } from '@ionic/storage';
import { CommunityprofilePage } from '../communityprofile/communityprofile';
/*
  Generated class for the Communitymembers page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var CommunitymembersPage = (function () {
    function CommunitymembersPage(nav, navParams, storage) {
        var _this = this;
        this.nav = nav;
        this.navParams = navParams;
        this.storage = storage;
        this.member_profiles = [];
        this.nav = nav;
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('token').then(function (token) { _this.token = token; });
        });
        this.members = navParams.get("members");
        this.member_profiles = this.members.members;
    }
    CommunitymembersPage.prototype.membersProfile = function (id) {
        this.nav.push(CommunityprofilePage, { profile_uid: id });
    };
    CommunitymembersPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CommunitymembersPage');
    };
    return CommunitymembersPage;
}());
CommunitymembersPage = __decorate([
    Component({
        selector: 'page-communitymembers',
        templateUrl: 'communitymembers.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Storage])
], CommunitymembersPage);
export { CommunitymembersPage };
//# sourceMappingURL=communitymembers.js.map