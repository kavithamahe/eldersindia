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
  Generated class for the ConnectionsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var ConnectionsService = (function () {
    function ConnectionsService(http, storage) {
        var _this = this;
        this.http = http;
        this.storage = storage;
        this.storage.ready().then(function () {
            storage.get('id').then(function (id) {
                _this.user_id = id;
            });
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
    ConnectionsService.prototype.allConnections = function () {
        var _request = { "user_id": this.user_id, "searchValue": "" };
        return this.http.post(this.rootUrl + 'getConnectionList', _request, this.options)
            .map(function (res) { return res.json(); });
    };
    ConnectionsService.prototype.receivedRquest = function () {
        var _request = { "searchValue": "" };
        return this.http.post(this.rootUrl + 'receiveConnectionRequest', _request, this.options)
            .map(function (res) { return res.json(); });
    };
    ConnectionsService.prototype.sentRquest = function () {
        var _request = { "searchValue": "" };
        return this.http.post(this.rootUrl + 'getSentRequestLists', _request, this.options)
            .map(function (res) { return res.json(); });
    };
    ConnectionsService.prototype.sentRequestScroll = function (nextPageURL) {
        var _request = { "searchValue": "" };
        return this.http.post(nextPageURL, _request, this.options)
            .map(function (res) { return res.json(); });
    };
    ConnectionsService.prototype.getAllConnectionList = function () {
        var _request = { "search_value": "" };
        return this.http.post(this.rootUrl + 'getAllConnectionList', _request, this.options)
            .map(function (res) { return res.json(); });
    };
    ConnectionsService.prototype.connectionStatus = function (connectionId, status) {
        var _request = { "conn_req__id": connectionId, "approve_status": status };
        return this.http.post(this.rootUrl + 'sendResponse', _request, this.options)
            .map(function (res) { return res.json(); });
    };
    ConnectionsService.prototype.sendConnectionRequest = function (connect_id, name) {
        var _request = { "connect_id": connect_id, "connect_name": name };
        return this.http.post(this.rootUrl + 'sendConnectionRequest', _request, this.options)
            .map(function (res) { return res.json(); });
    };
    ConnectionsService.prototype.searchConnection = function (term) {
        var _request = { "user_id": this.user_id, "searchValue": term };
        return this.http.post(this.rootUrl + 'getConnectionList', _request, this.options)
            .map(function (res) { return res.json(); });
    };
    ConnectionsService.prototype.addsearchConnection = function (term) {
        var _request = { "search_value": term };
        return this.http.post(this.rootUrl + 'getAllConnectionList', _request, this.options)
            .map(function (res) { return res.json(); });
    };
    ConnectionsService.prototype.infiniteRquest = function (nextURL) {
        var _request = { "searchValue": "" };
        return this.http.post(nextURL, _request, this.options)
            .map(function (res) { return res.json(); });
    };
    ConnectionsService.prototype.allConnectionScroll = function (nextPageURL) {
        var _request = { "user_id": this.user_id, "searchValue": "" };
        return this.http.post(nextPageURL, _request, this.options)
            .map(function (res) { return res.json(); });
    };
    ConnectionsService.prototype.addConnectionScroll = function (nextPageURL) {
        var _request = { "search_value": "" };
        return this.http.post(nextPageURL, _request, this.options)
            .map(function (res) { return res.json(); });
    };
    ConnectionsService.prototype.receivedConnectionScroll = function (nextPageURL) {
        var _request = { "searchValue": "" };
        return this.http.post(nextPageURL, _request, this.options)
            .map(function (res) { return res.json(); });
    };
    return ConnectionsService;
}());
ConnectionsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, Storage])
], ConnectionsService);
export { ConnectionsService };
//# sourceMappingURL=connections-service.js.map