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
import { ModalController, NavController, NavParams, AlertController, LoadingController, Platform, ToastController, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Camera } from 'ionic-native';
import { FormBuilder, Validators } from '@angular/forms';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CommunitycommentsPage } from '../communitycomments/communitycomments';
import { CommunityprofilePage } from '../communityprofile/communityprofile';
import { CommunityServices } from '../../providers/community-services';
import { EmojiPickerPage } from '../../pages/emoji-picker/emoji-picker';
import { CommunitymembersPage } from '../../pages/communitymembers/communitymembers';
import { DomSanitizer } from '@angular/platform-browser/';
import { InAppBrowser } from 'ionic-native';
var CommunityPage = (function () {
    function CommunityPage(platform, modal, formBuilder, sanitizer, storage, nav, alertCtrl, navParams, loadingCtrl, toastCtrl, communityServices, popoverCtrl) {
        var _this = this;
        this.platform = platform;
        this.modal = modal;
        this.formBuilder = formBuilder;
        this.sanitizer = sanitizer;
        this.storage = storage;
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.communityServices = communityServices;
        this.popoverCtrl = popoverCtrl;
        this.users = [];
        this.base64Image = "";
        this.nextPageURL = '';
        this.emojiId = 0;
        this.viewMore = false;
        this.user_id = 0;
        this.message = '';
        this.metaLink = "";
        this.nav = nav;
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('token').then(function (token) {
                _this.token = token;
                var loader = _this.loadingCtrl.create({ content: "Please wait..." });
                loader.present();
                _this.community_id = _this.navParams.get("community_id");
                _this.communityList(_this.community_id);
                _this.communityDetail(_this.community_id);
                _this.addComments = false;
                _this.itemComments = false;
                loader.dismiss();
                _this.userType = "sponsor";
            });
            storage.get('id').then(function (id) { _this.user_id = id; });
        });
        this.authForm = formBuilder.group({
            videoUrl: ['', Validators.compose([Validators.pattern('^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be|vimeo\.com|dailymotion\.com|metacafe\.com|wines\.com)\/.+$')])],
        });
        // let loader = this.loadingCtrl.create({ content: "Please wait..." });     
        // loader.present();
        // this.community_id=navParams.get("community_id");
        //     this.communityList(this.community_id);
        //     this.communityDetail(this.community_id);
        //     this.addComments=false;
        //     this.itemComments=false;
        //     loader.dismiss();
        //     this.userType="sponsor";
    }
    CommunityPage.prototype.onChange = function (event, input, id) {
        this.files = [].slice.call(event.target.files);
        input.value = this.files.map(function (f) { return f.name; }).join(', ');
        this.communityServices.fileUpload(id, this.files[0]).subscribe(function (data) {
            console.log(data);
        });
    };
    CommunityPage.prototype.openUrl = function (metalink_url) {
        console.log("URL is ", metalink_url);
        this.platform.ready().then(function () {
            var browser = new InAppBrowser(metalink_url, '_blank');
        });
    };
    CommunityPage.prototype.toggleContent = function () {
        if (this.show_description == false) {
            this.show_description = true;
        }
        else {
            this.show_description = false;
        }
    };
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
    CommunityPage.prototype.cleanURL = function (oldURL) {
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
    CommunityPage.prototype.showComment = function (post) {
        var commentModal = this.modal.create(CommunitycommentsPage, { posts: post });
        commentModal.present();
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
    CommunityPage.prototype.replyComments = function (event) {
        this.comments = "";
        if (this.showReply == event) {
            this.showReply = null;
        }
        else {
            this.showReply = event;
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
            console.log(_this.show_member);
            if (_this.show_member > 4) {
                _this.viewMore = true;
            }
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunityPage.prototype.joinCommunity = function (id) {
        var _this = this;
        this.communityServices.joinCommunity(id).subscribe(function (users) {
            _this.showToast(users.result);
            _this.communityDetail(id);
            _this.nav.pop();
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunityPage.prototype.communityProfile = function (id) {
        this.nav.push(CommunityprofilePage, { profile_uid: id });
    };
    CommunityPage.prototype.communityProfiles = function (id) {
        this.communityProfile(id);
    };
    CommunityPage.prototype.membersProfile = function (id) {
        this.communityProfile(id);
    };
    CommunityPage.prototype.profileImage = function (id) {
        this.communityProfile(id);
    };
    CommunityPage.prototype.myImage = function (id) {
        this.communityProfile(id);
    };
    CommunityPage.prototype.communityList = function (id) {
        var _this = this;
        this.communityServices.getCommunityPost(id).subscribe(function (users) {
            _this.users = users.result.info.lists.data;
            _this.nextPageURL = users.result.info.lists.next_page_url;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunityPage.prototype.addLikes = function (likeObj) {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait initializing..." });
        loader.present();
        this.communityServices.addLike(likeObj).subscribe(function (data) {
            _this.showToast(data.result);
            _this.communityList(_this.community_id);
        }, function (err) {
            if (err.status === 401) {
                _this.showToast(JSON.parse(err._body).error);
            }
            else if (err.status === 500) {
                _this.communityList(_this.community_id);
            }
            else {
                _this.communityServices.showErrorToast(err);
            }
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
    CommunityPage.prototype.postCommunity = function (id) {
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
            // if(this.urlArr.length > 0){
            //                 this.metalink = this.urlArr[0];
            //            }
            this.communityServices.postCommunity(id, this.base64Image, this.authForm.value.videoUrl, this.message, this.metaLink).subscribe(function (datas) {
                _this.showToast(datas.result);
                _this.communityList(id);
                _this.message = "";
                _this.metaLink = "";
                _this.videoUrl = "";
                _this.base64Image = "";
                _this.showblock = null;
            }, function (err) {
                _this.communityServices.showErrorToast(err);
            });
        }
        loader.dismiss();
    };
    CommunityPage.prototype.urlifyMessage = function (text) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function (url) {
            // return "";
            return '<a href="' + url + '" target="_blank">' + url + '</a>';
        });
    };
    // urlArr = [];
    CommunityPage.prototype.urlifyLink = function (text) {
        var _this = this;
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        var i = 0;
        return text.replace(urlRegex, function (data) {
            _this.metaLink = data;
            i++;
        });
    };
    CommunityPage.prototype.deletePost = function (id) {
        var _this = this;
        this.communityServices.deletePost(id).subscribe(function (datas) {
            _this.showToast(datas.result);
            _this.communityList(_this.community_id);
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
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
    CommunityPage.prototype.emojiPicker = function (userId) {
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
                else if (emojiSymbol == ':open_mouth:') {
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
    CommunityPage.prototype.showModel = function (member) {
        var modal = this.popoverCtrl.create(CommunitymembersPage, { members: member });
        modal.present();
    };
    CommunityPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            if (_this.nextPageURL != null && _this.nextPageURL != '') {
                _this.communityscroll(_this.community_id);
            }
            else {
                infiniteScroll.enable(false);
            }
            infiniteScroll.complete();
        }, 500);
    };
    CommunityPage.prototype.communityscroll = function (id) {
        var _this = this;
        this.communityServices.communityscroll(this.nextPageURL, id).subscribe(function (eventsscroll) {
            _this.eventScrollLists = eventsscroll.result.info.lists.data;
            for (var i = 0; i < Object.keys(_this.eventScrollLists).length; i++) {
                _this.users.push(_this.eventScrollLists[i]);
            }
            _this.nextPageURL = eventsscroll.result.info.lists.next_page_url;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    return CommunityPage;
}());
CommunityPage = __decorate([
    Component({
        selector: 'page-community',
        templateUrl: 'community.html',
        providers: [CommunityServices]
    }),
    __metadata("design:paramtypes", [Platform, ModalController, FormBuilder, DomSanitizer, Storage, NavController, AlertController, NavParams, LoadingController, ToastController, CommunityServices, PopoverController])
], CommunityPage);
export { CommunityPage };
//# sourceMappingURL=community.js.map