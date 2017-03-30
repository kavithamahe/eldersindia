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
import { NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Camera } from 'ionic-native';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CommunityprofilePage } from '../communityprofile/communityprofile';
import { CommunityServices } from '../../providers/community-services';
import { DomSanitizer } from '@angular/platform-browser';
var CommunityPage = (function () {
    function CommunityPage(sanitizer, storage, nav, alertCtrl, navParams, loadingCtrl, toastCtrl, communityServices) {
        var _this = this;
        this.sanitizer = sanitizer;
        this.storage = storage;
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.communityServices = communityServices;
        this.users = [];
        this.nav = nav;
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('token').then(function (token) { _this.token = token; });
        });
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.community_id = navParams.get("community_id");
        this.communityList(this.community_id);
        this.communityDetail(this.community_id);
        this.addComments = false;
        this.itemComments = false;
        loader.dismiss();
        this.userType = "sponsor";
        // for (let i = 0; i < 30; i++) {
        //      this.users.push( this.users.length );
        //    }
    }
    // doInfinite(infiniteScroll) {
    //    console.log('Begin async operation');
    //    setTimeout(() => {
    //      for (let i = 0; i < 30; i++) {
    //        this.users.push( this.users.length );
    //      }
    //      console.log('Async operation has ended');
    //      infiniteScroll.complete();
    //    }, 500);
    //  }
    // communityDetail(){
    //       this.communityServices.communityDetail().subscribe(detail =>{
    //       this.detail = detail.result.info.members.data;
    //    });
    //   }
    CommunityPage.prototype.accessGallery = function () {
        var _this = this;
        Camera.getPicture({
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            destinationType: Camera.DestinationType.DATA_URL
        }).then(function (imageData) {
            _this.base64Image = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            console.log(err);
        });
    };
    CommunityPage.prototype.addDetails = function (event) {
        this.comment = "";
        if (this.showblock == event) {
            this.showblock = null;
        }
        else {
            this.showblock = event;
        }
    };
    CommunityPage.prototype.itemDetails = function () {
        if (this.itemComments) {
            this.itemComments = false;
        }
        else {
            this.itemComments = true;
        }
    };
    CommunityPage.prototype.addVideos = function () {
        if (this.addVideo) {
            this.addVideo = false;
        }
        else {
            this.addVideo = true;
        }
    };
    CommunityPage.prototype.communityDetail = function (id1) {
        var _this = this;
        this.communityServices.communityDetail(id1).subscribe(function (users) {
            _this.communityDetailData = users.result.info;
            _this.members = users.result.info.members;
            _this.show_member = _this.members.length;
            console.log(_this.members.length);
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunityPage.prototype.joinCommunity = function (id) {
        var _this = this;
        this.communityServices.joinCommunity(id).subscribe(function (users) {
            _this.showToast(users.result);
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunityPage.prototype.communityProfile = function (id) {
        this.nav.push(CommunityprofilePage, { profile_uid: id });
    };
    CommunityPage.prototype.membersProfile = function (id) {
        this.communityProfile(id);
    };
    CommunityPage.prototype.communityList = function (id) {
        var _this = this;
        this.communityServices.getCommunityPost(id).subscribe(function (users) {
            _this.users = users.result.info.lists.data;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunityPage.prototype.addLikes = function (id) {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait initializing..." });
        loader.present();
        this.communityServices.addLike(id).subscribe(function (data) {
            _this.showToast(data.result);
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
        loader.dismiss();
    };
    CommunityPage.prototype.showToast = function (messageData) {
        var toast = this.toastCtrl.create({
            message: messageData,
            position: "top",
            duration: 3000
        });
        toast.present();
    };
    CommunityPage.prototype.sendPost = function (id1) {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait initializing..." });
        loader.present();
        this.communityServices.sendPosts(id1, this.comment).subscribe(function (datas) {
            _this.showToast(datas.result);
            _this.comment = "";
            _this.communityList(_this.community_id);
            // this.showblock= null;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
        loader.dismiss();
    };
    CommunityPage.prototype.postCommunity = function (id) {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait initializing..." });
        loader.present();
        this.communityServices.postCommunity(id, this.base64Image, this.videoUrl, this.post).subscribe(function (datas) {
            _this.showToast(datas.result);
            _this.communityList(id);
            _this.post = "";
            _this.videoUrl = "";
            _this.base64Image = "";
            _this.showblock = null;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
        loader.dismiss();
    };
    CommunityPage.prototype.deleteComment = function (id) {
        var _this = this;
        this.communityServices.deleteComment(id).subscribe(function (datas) {
            _this.showToast(datas.result);
            _this.comment = "";
            _this.communityList(_this.community_id);
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunityPage.prototype.dashboardPage = function () {
        this.nav.setRoot(DashboardPage);
    };
    return CommunityPage;
}());
CommunityPage = __decorate([
    Component({
        selector: 'page-community',
        templateUrl: 'community.html',
    }),
    __metadata("design:paramtypes", [DomSanitizer, Storage, NavController, AlertController, NavParams, LoadingController, ToastController, CommunityServices])
], CommunityPage);
export { CommunityPage };
//# sourceMappingURL=community.js.map