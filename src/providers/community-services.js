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
var CommunityServices = (function () {
    function CommunityServices(http, storage, toastCtrl) {
        var _this = this;
        this.http = http;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
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
    CommunityServices.prototype.getConnectList = function () {
        this.connectlist = { "searchValue": "" };
        return this.http.post(this.getCommunityPostsUrl + "getConnectionList", this.connectlist, this.options)
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
    CommunityServices.prototype.userProfile = function (id) {
        this.body = { "user_id": id, "post": 0 };
        return this.http.post(this.getCommunityPostsUrl + "getUserPosts", this.body, this.options)
            .map(function (res) { return res.json(); });
    };
    //---------------------------------//
    CommunityServices.prototype.addUserPosts = function (id, image, videoUrl, posts) {
        this.posts = { "user_id": id, "image": image, "videourl": videoUrl, "message": posts };
        return this.http.post(this.getCommunityPostsUrl + "addUserPost", this.posts, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.memberProfileData = function (id) {
        this.body = { "user_id": id };
        return this.http.post(this.getCommunityPostsUrl + "getProfileDetail", this.body, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.addLike = function (id) {
        this.body = { "info": { "postId": id } };
        return this.http.post(this.getCommunityPostsUrl + "sendLikes", this.body, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.sendPosts = function (id1, comments) {
        this.post = { "info": { "postId": id1, "comments": comments } };
        return this.http.post(this.getCommunityPostsUrl + "sendComments", this.post, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.postCommunity = function (id, image, videoUrl, posts) {
        this.posts = { "community_id": id, "image": image, "videourl": videoUrl, "message": posts };
        return this.http.post(this.getCommunityPostsUrl + "addCommunityPost", this.posts, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.deleteComment = function (id) {
        this.delete = { "info": { "comment_id": id } };
        return this.http.post(this.getCommunityPostsUrl + "removeFeedComment", this.delete, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.manageLists = function () {
        this.lists = { "searchValue": "" };
        return this.http.post(this.getCommunityPostsUrl + "getElderListBySponser", this.lists, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.getElderMasterDetails = function () {
        this.body = { "get": ["FunctionalArea", "Educational", "Specialization", "Locations", "AreaofInterest", "Skills"] };
        return this.http.post(this.getCommunityPostsUrl + "getElderMasterDetails", this.body, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.deleteDetail = function (id) {
        this.manage = { "info": { "id": id } };
        return this.http.post(this.getCommunityPostsUrl + "elderDelete", this.manage, this.options)
            .map(function (res) { return res.json(); });
    };
    //-----------------------------------------------------//
    CommunityServices.prototype.editSubmit = function () {
        this.edit = { "info": [{ "id": 17, "sponsor_id": "7", "name": "asdf", "avatar": null, "relation": "father", "gender": "", "dob": "2017-03-02", "mobile": "09597009544", "mobile_verified": 1, "email": "sponsssssor@ec.dev", "email_verified": 1, "in_service": 0, "job_interested": 1, "address": "velachery chennai", "city": "chennai", "state": "Tamilnadu", "status": 1, "created_at": "2017-03-06 13:06:59", "updated_at": "2017-03-06 18:36:59", "city_name": "chennai", "state_name": "Tamilnadu", "service": "Retired", "experience": [{ "id": 13, "elder_id": 17, "functional_id": 8, "functional_other": "", "year": "3", "duration": "", "status": 1, "created_at": "2017-03-06 13:06:59", "updated_at": "2017-03-06 13:06:59" }], "education": [{ "id": 12, "elder_id": 17, "graduation": "B.Arch", "graduation_other": "", "specialization": "Chemistry", "specialization_other": "", "university": "anna university", "status": 1, "created_at": "2017-03-06 13:06:59", "updated_at": "2017-03-06 13:06:59" }], "emergency": [{ "id": 16, "elder_id": 17, "person": "police", "mobile": "9597009544", "status": 1, "created_at": "2017-03-06 13:06:59", "updated_at": "2017-03-06 13:06:59" }] }] };
        return this.http.post(this.getCommunityPostsUrl + "elderEdit", this.edit, this.options)
            .map(function (res) { return res.json(); });
    };
    CommunityServices.prototype.addSubmit = function () {
        this.add = { "info": [{ "email": "mom@g.com", "relation": "mother", "password": "123456", "name": "mom", "dob": "2016-11-08", "mobile": "3216548754", "in_service": "0", "address": "maduari", "location": 2, "area_interest": "Accounting/Finance", "job_type": "full time", "skills": [{ "skill": "account" }, { "skill": "maths" }], "emergency": [{ "id": 1, "person": "police", "mobile": "100" }], "experience": [{ "industry": 1, "year": "5", "duration": "2010-2015" }], "education": [{ "graduation": "B.A", "specialization": "Maths", "university": "KLU" }], "sponsor_id": "0", "job_interested": 1 }] };
        return this.http.post(this.getCommunityPostsUrl + "elderOnBoarding", this.add, this.options)
            .map(function (res) { return res.json(); });
    };
    return CommunityServices;
}());
CommunityServices = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, Storage, ToastController])
], CommunityServices);
export { CommunityServices };
//# sourceMappingURL=community-services.js.map