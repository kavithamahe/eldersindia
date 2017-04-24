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
  Generated class for the MessagesService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var MessagesService = (function () {
    function MessagesService(http, storage) {
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
            storage.get('rooturl').then(function (rooturl) {
                _this.rootUrl = rooturl;
                console.log("consroot" + _this.rootUrl);
            });
            console.log("storage call");
        });
    }
    MessagesService.prototype.inbox = function () {
        var _request = { search: { title: "", status: "", category: "" } };
        return this.http.post(this.rootUrl + 'listInbox', _request, this.options)
            .map(function (res) { return res.json(); });
    };
    MessagesService.prototype.sent = function () {
        var _request = { searchValue: "" };
        return this.http.post(this.rootUrl + 'listSent', _request, this.options)
            .map(function (res) { return res.json(); });
    };
    MessagesService.prototype.viewMessages = function (messageId, viewType) {
        var _request = { "viewType": viewType };
        return this.http.post(this.rootUrl + 'getInboxMessageDetails/' + messageId, _request, this.options)
            .map(function (res) { return res.json(); });
    };
    MessagesService.prototype.sendMessage = function (messageObject) {
        var _request = messageObject;
        return this.http.post(this.rootUrl + 'sendMessage', _request, this.options)
            .map(function (res) { return res.json(); });
    };
    MessagesService.prototype.getFriendsList = function () {
        var _request = {};
        return this.http.post(this.rootUrl + 'getConnections', _request, this.options)
            .map(function (res) { return res.json(); });
    };
    return MessagesService;
}());
MessagesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, Storage])
], MessagesService);
export { MessagesService };
//# sourceMappingURL=messages-service.js.map