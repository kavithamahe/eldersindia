var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../providers/app-config';
var CommunityServices = (function () {
    function CommunityServices(appConfig, http, storage, toastCtrl) {
        var _this = this;
        this.appConfig = appConfig;
        this.http = http;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        //id:number;
        this.user_id = 0;
        this.getCommunityPostsUrl = appConfig.setrooturl();
        this.storage.ready().then(function () {
            storage.get('token').then(function (token) {
                _this.token = token;
                _this.headers = new Headers();
                _this.headers.append('Content-Type', 'application/json');
                _this.headers.append('Authorization', 'Bearer ' + _this.token);
                _this.options = new RequestOptions({ headers: _this.headers });
            });
            storage.get('rooturl').then(function (rooturl) { _this.getCommunityPostsUrl = rooturl; });
            storage.get('id').then(function (id) { _this.user_id = id; });
        });
    }
    CommunityServices.prototype.initialize = function () {
        var _this = this;
        this.storage.ready().then(function () {
            _this.storage.get('token').then(function (token) {
                _this.token = token;
            });
            _this.storage.get('rooturl').then(function (rooturl) { _this.getCommunityPostsUrl = rooturl; });
            _this.storage.get('id').then(function (id) { _this.user_id = id; });
        });
    };
    CommunityServices.prototype.fileUpload = function (id, file) {
        var formdata = new FormData();
        var posts = { community_id: id, image: file, videourl: "", message: "" };
        return this.http.post(this.getCommunityPostsUrl + "addCommunityPost", posts, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.showToast = function (messageData) {
        var toast = this.toastCtrl.create({
            message: messageData,
            position: "top",
            duration: 3000
        });
        toast.present();
    };
    CommunityServices.prototype.showErrorToast = function (error) {
        if (error.status === 401) {
            this.showToast(JSON.parse(error._body).error);
        }
        else {
            this.showToast("Please try again later");
        }
    };
    CommunityServices.prototype.myCommunity = function (data) {
        this.body = { "uid": this.user_id, "search": data, "view": "grid", "get": ["communityCategory"] };
        return this.http.post(this.getCommunityPostsUrl + "myCommunity", this.body, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.eventsscroll = function (nextPageURL) {
        this.body = { "uid": this.user_id, "search": "", "view": "grid", "get": ["communityCategory"] };
        return this.http.post(nextPageURL, this.body, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.getCommunity = function (category) {
        this.body = { "uid": this.user_id, "search": "", "s_category": category, "view": "grid", "get": ["communityCategory"] };
        return this.http.post(this.getCommunityPostsUrl + "myCommunity", this.body, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.recommendedCommunity = function (data) {
        this.body = { "uid": this.user_id, "search": data, "view": "grid", "get": ["communityCategory"] };
        return this.http.post(this.getCommunityPostsUrl + "searchCommunity", this.body, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.setCategory = function (category) {
        this.body = { "uid": this.user_id, "search": "", "s_category": category, "view": "grid", "get": ["communityCategory"] };
        return this.http.post(this.getCommunityPostsUrl + "searchCommunity", this.body, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.communityDetail = function (id1) {
        return this.http.post(this.getCommunityPostsUrl + "getCommunityDetail", { "info": { "community": id1, "uid": this.user_id } }, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.joinCommunity = function (id) {
        this.join = { "info": { "uid": this.user_id, "community": id } };
        return this.http.post(this.getCommunityPostsUrl + "joinCommunity", this.join, this.options)
            .map(function (res) { return res.json(); });
    };
    //------ need to update----------//
    CommunityServices.prototype.connectMember = function (id, name) {
        this.connect = { "connect_id": id, "connect_name": name };
        return this.http.post(this.getCommunityPostsUrl + "sendConnectionRequest", this.connect, this.options)
            .map(function (res) { return res.json(); });
    };
    //------------//
    CommunityServices.prototype.getConnectLists = function (id, data) {
        this.connectlist = { "id": id, "searchValue": data };
        return this.http.post(this.getCommunityPostsUrl + "getConnectionList", this.connectlist, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.connectionscroll = function (nextPageURL, id) {
        this.connectlist = { "id": id, "searchValue": "" };
        return this.http.post(nextPageURL, this.connectlist, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.getCommunityMembers = function (id) {
        this.post = { "user_id": id };
        return this.http.post(this.getCommunityPostsUrl + "getCommunityMembers", this.post, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.communitydetailscroll = function (nextPageURL, id) {
        this.post = { "user_id": id };
        return this.http.post(nextPageURL, this.post, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.myprofile = function (id) {
        this.send = { "user_id": id };
        return this.http.post(this.getCommunityPostsUrl + "myprofile", this.send, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.getPrivacy = function (id) {
        this.send = { "user_id": id };
        return this.http.post(this.getCommunityPostsUrl + "getPrivacy", this.send, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.sendMessage = function (id, attachment, subject, message) {
        this.send = { "message": { "attachments": [], "to": { "title": "", "description": "", "image": "", "originalObject": { "id": id, "avatar": "", "email": "", "user_type": "", "friend_name": "" } }, "subject": subject, "message": message } };
        return this.http.post(this.getCommunityPostsUrl + "sendMessage", this.send, this.options)
            .map(function (res) { return res.json(); });
    };
    //-------------------------------//
    CommunityServices.prototype.getCommunityPost = function (id) {
        return this.http.post(this.getCommunityPostsUrl + "getCommunityPosts", { "info": { "community": id, "post": 0, "comPostId": "" } }, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.communityscroll = function (nextPageURL, id) {
        return this.http.post(nextPageURL, { "info": { "community": id, "post": 0, "comPostId": "" } }, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.userProfile = function (id) {
        this.body = { "user_id": id, "post": 0 };
        return this.http.post(this.getCommunityPostsUrl + "getUserPosts", this.body, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.userpostsscroll = function (nextPageURL, id) {
        this.body = { "user_id": id, "post": 0 };
        return this.http.post(nextPageURL, this.body, this.options)
            .map(function (res) { return res.json(); });
    };
    //---------------------------------//
    CommunityServices.prototype.addUserPosts = function (id, image, videoUrl, posts, links) {
        this.posts = { "user_id": id, "image": image, "videourl": videoUrl, "message": posts, "metalink": links, "app": '' };
        return this.http.post(this.getCommunityPostsUrl + "addUserPost", this.posts, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.memberProfileData = function (id) {
        this.body = { "user_id": id };
        return this.http.post(this.getCommunityPostsUrl + "getProfileDetail", this.body, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.addLike = function (likeObj) {
        // this.body = {"info": {"postId":id}};
        this.body = { info: { postId: likeObj.id, emojiArr: { id: likeObj.emojiId, emoji: likeObj.emoji, name: likeObj.name } } };
        return this.http.post(this.getCommunityPostsUrl + "sendLikes", this.body, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.sendInlineLikes = function (comments_id) {
        this.body = { comPostCmtsId: comments_id };
        return this.http.post(this.getCommunityPostsUrl + "sendInlineLikes", this.body, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.sendPosts = function (id1, comments) {
        this.post = { "info": { "postId": id1, "comments": comments } };
        return this.http.post(this.getCommunityPostsUrl + "sendComments", this.post, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.sendReply = function (uid_from, comments_id, comments) {
        this.post = { "info": { "comments": comments, "uid_from": this.user_id, "uid_to": uid_from, "comment_id": comments_id } };
        return this.http.post(this.getCommunityPostsUrl + "sendReply", this.post, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.postCommunity = function (id, image, videoUrl, posts, links) {
        this.posts = { "community_id": id, "image": image, "videourl": videoUrl, "message": posts, "metalink": links, "app": '' };
        return this.http.post(this.getCommunityPostsUrl + "addCommunityPost", this.posts, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.deleteComment = function (id) {
        this.delete = { "info": { "comment_id": id } };
        return this.http.post(this.getCommunityPostsUrl + "removeFeedComment", this.delete, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.deletePost = function (id) {
        this.delete = { info: { post_id: id } };
        return this.http.post(this.getCommunityPostsUrl + "removeFeedpost", this.delete, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.manageLists = function () {
        this.lists = { "searchValue": "" };
        return this.http.post(this.getCommunityPostsUrl + "getElderListBySponser", this.lists, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.searchManageLists = function (data) {
        this.lists = { "searchValue": data };
        return this.http.post(this.getCommunityPostsUrl + "getElderListBySponser", this.lists, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.getElder = function (elder_id) {
        var elderData = { "elderId": elder_id };
        return this.http.post(this.getCommunityPostsUrl + "getElderListById", elderData, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.getElderMasterDetails = function () {
        this.body = { "get": ["Relations", "InService", "FunctionalArea", "Educational", "Specialization", "Locations", "AreaofInterest", "Skills"] };
        return this.http.post(this.getCommunityPostsUrl + "getElderMasterDetails", this.body, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.deleteDetail = function (id) {
        this.manage = { "info": { "id": id } };
        return this.http.post(this.getCommunityPostsUrl + "elderDelete", this.manage, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.editSubmit = function (editedDependentData) {
        return this.http.post(this.getCommunityPostsUrl + "elderEdit", editedDependentData, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.addSubmit = function (dependentData) {
        return this.http.post(this.getCommunityPostsUrl + "elderOnBoarding", dependentData, this.options)
            .map(function (res) { return res.json(); });
    };
    return CommunityServices;
}());
CommunityServices = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AppConfig, Http, Storage, ToastController])
], CommunityServices);
export { CommunityServices };
//# sourceMappingURL=community-services.js.map