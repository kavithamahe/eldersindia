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
import { ViewController, LoadingController, AlertController, ToastController, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CommunityprofilePage } from '../communityprofile/communityprofile';
import { CommunityServices } from '../../providers/community-services';
/*
  Generated class for the Communitycomments page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var CommunitycommentsPage = (function () {
    function CommunitycommentsPage(loadingCtrl, viewCtrl, storage, toastCtrl, alertCtrl, communityServices, navCtrl, navParams) {
        var _this = this;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.communityServices = communityServices;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.post_comments = [];
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) {
                _this.imageUrl = imageurl;
                _this.posts = navParams.get("posts");
                _this.post_comments = _this.posts.comments;
                _this.post_id = _this.posts.id;
                _this.post_profile_id = _this.posts.profile_id;
                console.log("comments: ", _this.posts);
            });
            storage.get('token').then(function (token) { _this.token = token; });
        });
    }
    CommunitycommentsPage.prototype.profileImage = function (id) {
        // this.communityProfile(id);
        this.navCtrl.push(CommunityprofilePage, { profile_uid: id });
    };
    CommunitycommentsPage.prototype.showConfirm = function (DeleteId) {
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
    CommunitycommentsPage.prototype.showComments = function (event) {
        this.reply_comment = "";
        this.Reply = null;
        this.replyBlock = null;
        if (this.showReply == event) {
            this.showReply = null;
        }
        else {
            this.showReply = event;
        }
    };
    CommunitycommentsPage.prototype.replyComments = function (event) {
        this.reply_comment = "";
        this.Reply = null;
        if (this.replyBlock == event) {
            this.replyBlock = null;
        }
        else {
            this.replyBlock = event;
        }
    };
    CommunitycommentsPage.prototype.reply = function (event) {
        this.reply_comment = "";
        this.replyBlock = null;
        if (this.Reply == event) {
            this.Reply = null;
        }
        else {
            this.Reply = event;
        }
    };
    CommunitycommentsPage.prototype.deleteComment = function (id) {
        var _this = this;
        this.communityServices.deleteComment(id).subscribe(function (datas) {
            _this.showToast(datas.result);
            _this.post_comment = "";
            for (var i = 0; i < _this.post_comments.length; i++) {
                if (_this.post_comments[i].comments_id == id) {
                    console.log("index of comment: ", i);
                    _this.post_comments.splice(i, 1);
                }
            }
            // this.communityList(this.community_id);
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    CommunitycommentsPage.prototype.showToast = function (messageData) {
        var toast = this.toastCtrl.create({
            message: messageData,
            position: "top",
            duration: 3000
        });
        toast.present();
    };
    CommunitycommentsPage.prototype.sendComment = function (postID) {
        var _this = this;
        if (this.post_comment != "") {
            var loader = this.loadingCtrl.create({ content: "Please wait initializing..." });
            loader.present();
            this.communityServices.sendPosts(postID, this.post_comment).subscribe(function (datas) {
                _this.post_comments.push(datas.result.info.list[0]);
                _this.showToast(datas.result.info.message);
                _this.post_comment = "";
                // this.communityList(this.community_id);
                // this.showblock=null;
            }, function (err) {
                _this.communityServices.showErrorToast(err);
            });
            loader.dismiss();
        }
        else {
            this.showToast("Enter Comments and Post");
        }
    };
    CommunitycommentsPage.prototype.sendReply = function (comments_id, profile_id) {
        var _this = this;
        console.log("comment" + comments_id + profile_id);
        this.Reply = null;
        this.replyBlock = null;
        if (this.reply_comment != "") {
            var loader = this.loadingCtrl.create({ content: "Please wait initializing..." });
            loader.present();
            this.communityServices.sendReply(comments_id, profile_id, this.reply_comment).subscribe(function (datas) {
                _this.showToast(datas.result.info.message);
                _this.reply_comment = "";
                // this.communityList(this.community_id);
                for (var i = 0; i < _this.post_comments.length; i++) {
                    if (_this.post_comments[i].comments_id == comments_id) {
                        console.log("index of comment: ", i);
                        // this.post_comments[i].comments=[];
                        var list = datas.result.info.list;
                        console.log(list);
                        _this.post_comments[i].comment_reply.push({
                            com_post_cmt_id: list.com_post_cmt_id,
                            comments_replay: list.comments_replay,
                            comments_replay_id: list.comments_replay_id,
                            created_at: null,
                            name_from: list.name_from,
                            name_to: list.name_to,
                            profile_image: list.profile_image,
                            uid_from: list.uid_from,
                            uid_to: list.uid_to
                        });
                    }
                }
            }, function (err) {
                _this.communityServices.showErrorToast(err);
            });
            loader.dismiss();
        }
        else {
            this.showToast("Enter Comments and Post");
        }
    };
    CommunitycommentsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CommunitycommentsPage');
    };
    CommunitycommentsPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return CommunitycommentsPage;
}());
CommunitycommentsPage = __decorate([
    Component({
        selector: 'page-communitycomments',
        templateUrl: 'communitycomments.html'
    }),
    __metadata("design:paramtypes", [LoadingController, ViewController, Storage, ToastController, AlertController, CommunityServices, NavController, NavParams])
], CommunitycommentsPage);
export { CommunitycommentsPage };
//# sourceMappingURL=communitycomments.js.map