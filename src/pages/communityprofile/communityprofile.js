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
import { NavController, NavParams, ModalController, ViewController, AlertController, LoadingController, PopoverController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Camera } from 'ionic-native';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { FormBuilder, Validators } from '@angular/forms';
import { EmojiPickerPage } from '../../pages/emoji-picker/emoji-picker';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CommunitymessagePage } from '../communitymessage/communitymessage';
import { CommunitycommentsPage } from '../communitycomments/communitycomments';
import { MyprofilesettingPage } from '../myprofilesetting/myprofilesetting';
import { CommunityPage } from '../community/community';
import { CommunityServices } from '../../providers/community-services';
var CommunityprofilePage = (function () {
    function CommunityprofilePage(nav, platform, storage, formBuilder, popoverCtrl, viewCtrl, sanitizer, modalCtrl, alertCtrl, navParams, loadingCtrl, toastCtrl, communityServices) {
        var _this = this;
        this.nav = nav;
        this.platform = platform;
        this.storage = storage;
        this.formBuilder = formBuilder;
        this.popoverCtrl = popoverCtrl;
        this.viewCtrl = viewCtrl;
        this.sanitizer = sanitizer;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.communityServices = communityServices;
        this.base64Image = "";
        this.emojiId = 0;
        this.community = "activity";
        this.isAndroid = false;
        this.connection = "true";
        this.profile = "true";
        this.metaLink = "";
        this.isAndroid = platform.is('android');
        this.nav = nav;
        this.profile_uid = navParams.get("profile_uid");
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('id').then(function (id) { _this.my_id = id; });
            storage.get('token').then(function (token) {
                _this.token = token;
                _this.profileCommunity(_this.profile_uid);
                _this.memberProfile(_this.profile_uid);
                _this.getPrivacy(_this.profile_uid);
            });
        });
        this.authForm = formBuilder.group({
            videoUrl: ['', Validators.compose([Validators.pattern('^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be|vimeo\.com|dailymotion\.com|metacafe\.com|wines\.com)\/.+$')])],
        });
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        loader.dismiss();
        this.addComments = false;
        this.itemComments = false;
    }
    CommunityprofilePage.prototype.loadThisPage = function (id) {
        this.allConnections = [];
        this.communityProfile = [];
        this.communityProfileData = [];
        this.community = "activity";
        this.status = [];
        this.status = false;
        this.request_sent = false;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.profileCommunity(id);
        this.memberProfile(id);
        this.getPrivacy(id);
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
        var modal = this.popoverCtrl.create(MyprofilesettingPage, { member_data: member });
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
    CommunityprofilePage.prototype.deletePost = function (id) {
        var _this = this;
        this.communityServices.deletePost(id).subscribe(function (datas) {
            _this.showToast(datas.result);
            _this.profileCommunity(_this.profile_uid);
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
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
    CommunityprofilePage.prototype.openUrl = function (metalink_url) {
        console.log("URL is ", metalink_url);
        this.platform.ready().then(function () {
            var browser = new InAppBrowser(metalink_url, '_blank');
        });
    };
    CommunityprofilePage.prototype.profileCommunity = function (id) {
        var _this = this;
        this.communityProfile = [];
        this.communityServices.userProfile(id).subscribe(function (users) {
            _this.communityProfile = users.result.info.lists.data;
            _this.nextPageURL = users.result.info.lists.next_page_url;
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
    CommunityprofilePage.prototype.getPrivacy = function (user_id) {
        var _this = this;
        this.communityServices.getPrivacy(user_id).subscribe(function (users) {
            var Privacy = users.result[0];
            if (Privacy != null) {
                _this.connection = Privacy.privacy_connection;
                console.log("connection" + _this.connection);
                _this.profile = Privacy.privacy_profile;
            }
            console.log("Privacy" + Privacy);
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunityprofilePage.prototype.Communities = function (id) {
        var _this = this;
        this.communityServices.getCommunityMembers(id).subscribe(function (users) {
            _this.getCommunityMembers = users.result.data;
            _this.nextPageURL = users.result.next_page_url;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunityprofilePage.prototype.Activity = function (id) {
        this.profileCommunity(id);
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
            _this.allConnections = users.result.info.list.data;
            _this.nextPageURL = users.result.info.list.next_page_url;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunityprofilePage.prototype.setItems = function (ev) {
        var val = ev.target.value;
        var id = this.user_id;
        this.Connections(id, val);
    };
    CommunityprofilePage.prototype.addLikes = function (likeObj) {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait initializing..." });
        loader.present();
        this.communityServices.addLike(likeObj).subscribe(function (data) {
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
        if (!this.authForm.valid) {
            this.submitAttempt = true;
        }
        else {
            this.submitAttempt = false;
            if (this.post != '' && this.post != undefined && this.post != null) {
                this.message = this.urlifyMessage(this.post);
                this.urlifyLink(this.post);
            }
            this.communityServices.addUserPosts(id, this.base64Image, this.authForm.value.videoUrl, this.message, this.metaLink).subscribe(function (datas) {
                _this.showToast(datas.result);
                _this.profileCommunity(id);
                _this.message = "";
                _this.metaLink = "";
                _this.base64Image = "";
                _this.videoUrl = "";
                _this.showblock = null;
            }, function (err) {
                _this.communityServices.showErrorToast(err);
            });
        }
        loader.dismiss();
    };
    CommunityprofilePage.prototype.urlifyMessage = function (text) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function (url) {
            // return "";
            return '<a href="' + url + '" target="_blank">' + url + '</a>';
        });
    };
    // urlArr = [];
    CommunityprofilePage.prototype.urlifyLink = function (text) {
        var _this = this;
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        var i = 0;
        return text.replace(urlRegex, function (data) {
            _this.metaLink = data;
            i++;
        });
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
    CommunityprofilePage.prototype.emojiPicker = function (userId) {
        var _this = this;
        var likeEmoji = { type: 'likeEmoji' };
        var modal = this.popoverCtrl.create(EmojiPickerPage, likeEmoji);
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data != null) {
                var emojiSymbol = data.emojiImage;
                var name_1 = emojiSymbol.replace(/[^a-z\d]+/gi, "");
                if (emojiSymbol == ':thumbsup:') {
                    _this.emojiId = 1;
                }
                else if (emojiSymbol == ':heart:') {
                    _this.emojiId = 2;
                }
                else if (emojiSymbol == ':laughing:') {
                    _this.emojiId = 3;
                }
                else if (emojiSymbol == ':wow:') {
                    _this.emojiId = 4;
                }
                else if (emojiSymbol == ':disappointed_relieved:') {
                    _this.emojiId = 5;
                }
                else if (emojiSymbol == ':rage:') {
                    _this.emojiId = 6;
                }
                var likeObj = { "id": userId, "emoji": emojiSymbol, "name": name_1, "emojiId": _this.emojiId };
                _this.addLikes(likeObj);
            }
        });
    };
    CommunityprofilePage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            if (_this.nextPageURL != null && _this.nextPageURL != '') {
                _this.userpostsscroll(_this.profile_uid);
            }
            else {
                infiniteScroll.enable(false);
            }
            infiniteScroll.complete();
        }, 500);
    };
    CommunityprofilePage.prototype.userpostsscroll = function (id) {
        var _this = this;
        this.communityServices.userpostsscroll(this.nextPageURL, id).subscribe(function (eventsscroll) {
            _this.eventScrollLists = eventsscroll.result.info.lists.data;
            for (var i = 0; i < Object.keys(_this.eventScrollLists).length; i++) {
                _this.communityProfile.push(_this.eventScrollLists[i]);
            }
            _this.nextPageURL = eventsscroll.result.info.lists.next_page_url;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunityprofilePage.prototype.doInfinite1 = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            if (_this.nextPageURL != null && _this.nextPageURL != '') {
                _this.connectionscroll(_this.profile_uid);
            }
            else {
                infiniteScroll.enable(false);
            }
            infiniteScroll.complete();
        }, 500);
    };
    CommunityprofilePage.prototype.connectionscroll = function (id) {
        var _this = this;
        this.communityServices.connectionscroll(this.nextPageURL, id).subscribe(function (eventsscroll) {
            _this.eventScrollLists = eventsscroll.result.info.list.data;
            for (var i = 0; i < Object.keys(_this.eventScrollLists).length; i++) {
                _this.allConnections.push(_this.eventScrollLists[i]);
            }
            _this.nextPageURL = eventsscroll.result.info.list.next_page_url;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunityprofilePage.prototype.doInfinite2 = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            if (_this.nextPageURL != null && _this.nextPageURL != '') {
                _this.communitydetailscroll(_this.profile_uid);
            }
            else {
                infiniteScroll.enable(false);
            }
            infiniteScroll.complete();
        }, 500);
    };
    CommunityprofilePage.prototype.communitydetailscroll = function (id) {
        var _this = this;
        this.communityServices.communitydetailscroll(this.nextPageURL, id).subscribe(function (eventsscroll) {
            _this.eventScrollLists = eventsscroll.result.data;
            for (var i = 0; i < Object.keys(_this.eventScrollLists).length; i++) {
                _this.getCommunityMembers.push(_this.eventScrollLists[i]);
            }
            _this.nextPageURL = eventsscroll.result.next_page_url;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    return CommunityprofilePage;
}());
CommunityprofilePage = __decorate([
    Component({
        selector: 'page-communityprofile',
        templateUrl: 'communityprofile.html'
    }),
    __metadata("design:paramtypes", [NavController, Platform, Storage, FormBuilder, PopoverController, ViewController, DomSanitizer, ModalController, AlertController, NavParams, LoadingController, ToastController, CommunityServices])
], CommunityprofilePage);
export { CommunityprofilePage };
//# sourceMappingURL=communityprofile.js.map