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
import { Platform } from 'ionic-angular';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CommunitymessagePage } from '../communitymessage/communitymessage';
import { CommunitycommentsPage } from '../communitycomments/communitycomments';
import { MyprofilesettingPage } from '../myprofilesetting/myprofilesetting';
import { CommunityPage } from '../community/community';
import { CommunityServices } from '../../providers/community-services';
var CommunityprofilePage = (function () {
    function CommunityprofilePage(nav, platform, storage, viewCtrl, sanitizer, modalCtrl, alertCtrl, navParams, loadingCtrl, toastCtrl, communityServices) {
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
        this.community = "activity";
        this.isAndroid = false;
        this.isAndroid = platform.is('android');
        this.nav = nav;
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('token').then(function (token) { _this.token = token; });
        });
        this.profile_uid = navParams.get("profile_uid");
        this.loadThisPage(this.profile_uid);
    }
    CommunityprofilePage.prototype.loadThisPage = function (id) {
        this.communityProfile = [];
        this.communityProfileData = [];
        this.status = [];
        // this.connectLists = false;
        //  this.activityLists = true;
        this.status = false;
        this.request_sent = false;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.profileCommunity(id);
        this.memberProfile(id);
        this.addComments = false;
        this.itemComments = false;
        loader.dismiss();
    };
    CommunityprofilePage.prototype.showComment = function (post) {
        var commentModal = this.modalCtrl.create(CommunitycommentsPage, { posts: post });
        commentModal.present();
    };
    CommunityprofilePage.prototype.messageModel = function (member) {
        var modal = this.modalCtrl.create(CommunitymessagePage, { member_data: member });
        modal.present();
    };
    CommunityprofilePage.prototype.profileSetting = function (member) {
        var modal = this.modalCtrl.create(MyprofilesettingPage, { member_data: member });
        modal.present();
    };
    CommunityprofilePage.prototype.cleanURL = function (oldURL) {
        if (oldURL != null) {
            var url1 = oldURL.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/');
            var url2 = url1.replace("http://www.dailymotion.com/video/", "http://www.dailymotion.com/embed/video/");
            var url = url2.replace("https://vimeo.com/", "https:\/\/player.vimeo.com\/video\/");
            return this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
        else {
            return null;
        }
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
    CommunityprofilePage.prototype.replyComments = function (event) {
        this.comments = "";
        if (this.showReply == event) {
            this.showReply = null;
        }
        else {
            this.showReply = event;
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
        this.communityProfile = [];
        this.communityServices.userProfile(id).subscribe(function (users) {
            _this.communityProfile = users.result.info.lists.data;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunityprofilePage.prototype.memberProfile = function (member_id) {
        var _this = this;
        this.communityProfileData = [];
        this.communityServices.memberProfileData(member_id).subscribe(function (users) {
            _this.communityProfileData = users.result.info.profile_details;
            _this.status = users.result.info.approve_status.status;
            _this.user_id = _this.communityProfileData.id;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunityprofilePage.prototype.Communities = function () {
        var _this = this;
        this.communityServices.getCommunityMembers().subscribe(function (users) {
            _this.getCommunityMembers = users.result.data;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunityprofilePage.prototype.connectMember = function (user) {
        var _this = this;
        this.communityServices.connectMember(user.id, user.name).subscribe(function (users) {
            _this.showToast(users.result.info);
            _this.memberProfile(user.id);
            _this.request_sent = true;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunityprofilePage.prototype.Connections = function (id, val) {
        var _this = this;
        this.communityServices.getConnectLists(id, val).subscribe(function (users) {
            _this.allConnections = users.result.info.list;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunityprofilePage.prototype.setItems = function (ev) {
        var val = ev.target.value;
        var id = this.user_id;
        this.Connections(id, val);
    };
    CommunityprofilePage.prototype.addLikes = function (id) {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait initializing..." });
        loader.present();
        this.communityServices.addLike(id).subscribe(function (data) {
            _this.showToast(data.result);
            _this.profileCommunity(_this.profile_uid);
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
        if (this.comment != "") {
            var loader = this.loadingCtrl.create({ content: "Please wait initializing..." });
            loader.present();
            this.communityServices.sendPosts(id1, this.comment).subscribe(function (datas) {
                _this.showToast(datas.result.info.message);
                _this.comment = "";
                // this.showblock= null;
                _this.profileCommunity(_this.profile_uid);
            }, function (err) {
                _this.communityServices.showErrorToast(err);
            });
            loader.dismiss();
        }
        else {
            this.showToast("Enter Comments and Post");
        }
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
    CommunityprofilePage.prototype.showConfirm = function (DeleteId) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            subTitle: 'Confirm Deletion?',
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Ok',
                    handler: function () {
                        _this.deleteComment(DeleteId);
                    }
                }
            ]
        });
        confirm.present();
    };
    CommunityprofilePage.prototype.goBackToCommunity = function (id) {
        this.nav.push(CommunityPage, { community_id: id });
    };
    CommunityprofilePage.prototype.profileMember = function (id) {
        this.profileCommunity(id);
        this.memberProfile(id);
    };
    CommunityprofilePage.prototype.detailCommunity = function () {
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
        templateUrl: 'communityprofile.html'
    }),
    __metadata("design:paramtypes", [NavController, Platform, Storage, ViewController, DomSanitizer, ModalController, AlertController, NavParams, LoadingController, ToastController, CommunityServices])
], CommunityprofilePage);
export { CommunityprofilePage };
//# sourceMappingURL=communityprofile.js.map