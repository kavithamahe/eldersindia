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
  Generated class for the JobBoardService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var JobBoardService = (function () {
    function JobBoardService(http, storage) {
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
            storage.get('id').then(function (id) { _this.user_id = id; });
        });
    }
    JobBoardService.prototype.jobsList = function () {
        var _request = { "search": { "location": [], "functional_area": [] }, "get": ["FunctionalArea", "Location", "SkillSet"], "info": { "uid": this.user_id } };
        return this.http.post(this.rootUrl + 'getJobList', _request, this.options)
            .map(function (res) { return res.json(); });
    };
    JobBoardService.prototype.singleJob = function (jobId) {
        var _request = { "info": { "uid": this.user_id } };
        return this.http.post(this.rootUrl + 'getJobById/' + jobId, _request, this.options)
            .map(function (res) { return res.json(); });
    };
    JobBoardService.prototype.applyJob = function (jobId, dependantId) {
        var _request = { "info": { "job_id": jobId, "uid": this.user_id, "dependantId": dependantId } };
        return this.http.post(this.rootUrl + 'applyJob', _request, this.options)
            .map(function (res) { return res.json(); });
    };
    JobBoardService.prototype.appliedJobs = function () {
        var _request = { "search": "", "info": { "uid": this.user_id } };
        return this.http.post(this.rootUrl + 'myJobRequests', _request, this.options)
            .map(function (res) { return res.json(); });
    };
    JobBoardService.prototype.getDependent = function () {
        var _request = {};
        return this.http.post(this.rootUrl + 'getDependants', _request, this.options)
            .map(function (res) { return res.json(); });
    };
    JobBoardService.prototype.JobBoardscroll = function (nextPageURL) {
        var _request = { "search": { "location": [], "functional_area": [] }, "get": ["FunctionalArea", "Location", "SkillSet"], "info": { "uid": this.user_id } };
        return this.http.post(nextPageURL, _request, this.options)
            .map(function (res) { return res.json(); });
    };
    JobBoardService.prototype.appliedJobscroll = function (nextPageURL) {
        var _request = { "search": "", "info": { "uid": this.user_id } };
        return this.http.post(nextPageURL, _request, this.options)
            .map(function (res) { return res.json(); });
    };
    return JobBoardService;
}());
JobBoardService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, Storage])
], JobBoardService);
export { JobBoardService };
//# sourceMappingURL=job-board-service.js.map