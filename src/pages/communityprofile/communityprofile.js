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
import { NavController, NavParams, ModalController, ViewController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Camera } from 'ionic-native';
import { DomSanitizer } from '@angular/platform-browser';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CommunitymessagePage } from '../communitymessage/communitymessage';
import { CommunityServices } from '../../providers/community-services';
var CommunityprofilePage = (function () {
    function CommunityprofilePage(nav, storage, viewCtrl, sanitizer, modalCtrl, alertCtrl, navParams, loadingCtrl, toastCtrl, communityServices) {
        var _this = this;
        this.nav = nav;
        this.storage = storage;
        this.viewCtrl = viewCtrl;
        this.sanitizer = sanitizer;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.communityServices = communityServices;
        this.activityLists = true;
        this.nav = nav;
        this.status = false;
        this.request_sent = false;
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('token').then(function (token) {
                _this.token = token;
            });
        });
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.profile_uid = navParams.get("profile_uid");
        this.profileCommunity(this.profile_uid);
        this.memberProfile(this.profile_uid);
        this.addComments = false;
        this.itemComments = false;
        loader.dismiss();
    }
    CommunityprofilePage.prototype.messageModel = function (member) {
        var modal = this.modalCtrl.create(CommunitymessagePage, { member_data: member });
        modal.present();
    };
    CommunityprofilePage.prototype.accessGallery = function () {
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
    CommunityprofilePage.prototype.addDetails = function (event) {
        this.comment = "";
        if (this.showblock == event) {
            this.showblock = null;
        }
        else {
            this.showblock = event;
        }
    };
    CommunityprofilePage.prototype.itemDetails = function () {
        if (this.itemComments) {
            this.itemComments = false;
        }
        else {
            this.itemComments = true;
        }
    };
    CommunityprofilePage.prototype.addVideos = function () {
        if (this.addVideo) {
            this.addVideo = false;
        }
        else {
            this.addVideo = true;
        }
    };
    CommunityprofilePage.prototype.profileCommunity = function (id) {
        var _this = this;
        this.communityServices.userProfile(id).subscribe(function (users) {
            _this.communityProfile = users.result.info.lists.data;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunityprofilePage.prototype.memberProfile = function (member_id) {
        var _this = this;
        this.communityServices.memberProfileData(member_id).subscribe(function (users) {
            _this.communityProfileData = users.result.info.profile_details;
            _this.status = users.result.info.approve_status.status;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunityprofilePage.prototype.connectMember = function (user) {
        var _this = this;
        this.communityServices.connectMember(user.id, user.name).subscribe(function (users) {
            _this.showToast(users.result.info);
            _this.request_sent = true;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunityprofilePage.prototype.activityMember = function () {
        this.connectLists = false;
        if (this.activityLists) {
            this.activityLists = false;
        }
        else {
            this.activityLists = true;
        }
    };
    CommunityprofilePage.prototype.connectList = function () {
        var _this = this;
        this.communityServices.getConnectList().subscribe(function (users) {
            console.log(users);
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
        this.activityLists = false;
        if (this.connectLists) {
            this.connectLists = false;
        }
        else {
            this.connectLists = true;
        }
    };
    CommunityprofilePage.prototype.addLikes = function (id) {
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
    CommunityprofilePage.prototype.showToast = function (messageData) {
        var toast = this.toastCtrl.create({
            message: messageData,
            position: "top",
            duration: 3000
        });
        toast.present();
    };
    CommunityprofilePage.prototype.sendPost = function (id1) {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait initializing..." });
        loader.present();
        this.communityServices.sendPosts(id1, this.comment).subscribe(function (datas) {
            _this.showToast(datas.result);
            _this.comment = "";
            // this.showblock= null;
            _this.profileCommunity(_this.profile_uid);
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
        loader.dismiss();
    };
    CommunityprofilePage.prototype.addUserPosts = function (id) {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait initializing..." });
        loader.present();
        this.communityServices.addUserPosts(id, this.base64Image, this.videoUrl, this.post).subscribe(function (datas) {
            _this.showToast(datas.result);
            _this.profileCommunity(id);
            _this.post = "";
            _this.base64Image = "";
            _this.videoUrl = "";
            _this.showblock = null;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
        loader.dismiss();
    };
    CommunityprofilePage.prototype.deleteComment = function (id) {
        var _this = this;
        this.communityServices.deleteComment(id).subscribe(function (datas) {
            _this.showToast(datas.result);
            _this.profileCommunity(_this.profile_uid);
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunityprofilePage.prototype.userProfile = function () {
        this.nav.pop();
    };
    CommunityprofilePage.prototype.dashboardPage = function () {
        this.nav.setRoot(DashboardPage);
    };
    return CommunityprofilePage;
}());
CommunityprofilePage = __decorate([
    Component({
        selector: 'page-communityprofile',
        templateUrl: 'communityprofile.html',
    }),
    __metadata("design:paramtypes", [NavController, Storage, ViewController, DomSanitizer, ModalController, AlertController, NavParams, LoadingController, ToastController, CommunityServices])
], CommunityprofilePage);
export { CommunityprofilePage };
//# sourceMappingURL=communityprofile.js.map