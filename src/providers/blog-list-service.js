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
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
/*
  Generated class for the BlogListService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var BlogListService = (function () {
    function BlogListService(http, storage) {
        var _this = this;
        this.http = http;
        this.storage = storage;
        this.storage.ready().then(function () {
            storage.get('token').then(function (token) {
                _this.token = token;
                _this.headers = new Headers();
                _this.headers.append('Content-Type', 'application/json');
                _this.headers.append('Authorization', 'Bearer ' + _this.token);
                _this.options = new RequestOptions({ headers: _this.headers });
            });
            storage.get('rooturl').then(function (rooturl) { _this.rootUrl = rooturl; });
        });
    }
    BlogListService.prototype.blogList = function () {
        var _request = { "search": { "title": "" } };
        return this.http.post(this.rootUrl + "normaListBlog", _request, this.options)
            .map(function (res) { return res.json(); });
    };
    BlogListService.prototype.singleBlog = function (blogId) {
        var _request = {};
        return this.http.post(this.rootUrl + 'getBlogDetails/' + blogId, _request, this.options)
            .map(function (res) { return res.json(); });
    };
    BlogListService.prototype.blogComment = function (blogId, commandObj) {
        var _request = commandObj;
        return this.http.post(this.rootUrl + 'postComments/' + blogId, _request, this.options)
            .map(function (res) { return res.json(); });
    };
    BlogListService.prototype.viewComments = function (blogId) {
        var _request = {};
        return this.http.post(this.rootUrl + 'getComments/' + blogId, _request, this.options)
            .map(function (res) { return res.json(); });
    };
    BlogListService.prototype.deleteComment = function (commentId) {
        var _request = { "id": commentId };
        return this.http.post(this.rootUrl + 'deleteComment/', _request, this.options)
            .map(function (res) { return res.json(); });
    };
    BlogListService.prototype.createBlog = function (blogObject) {
        var _request = blogObject;
        return this.http.post(this.rootUrl + 'addBlog', _request, this.options)
            .map(function (res) { return res.json(); });
    };
    BlogListService.prototype.getBlogCategory = function () {
        var _request = {};
        return this.http.post(this.rootUrl + 'getBlogCategories', _request, this.options)
            .map(function (res) { return res.json(); });
    };
    BlogListService.prototype.getTagsList = function (tagsInput) {
        // let _request= {};
        return this.http.get(this.rootUrl + 'getBlogTags/' + tagsInput, this.options)
            .map(function (res) { return res.json(); });
    };
    return BlogListService;
}());
BlogListService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, Storage])
], BlogListService);
export { BlogListService };
//# sourceMappingURL=blog-list-service.js.map