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
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../providers/app-config';
//import { Login } from '../models/login';
/*
  Generated class for the LoginUser provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var LoginUser = (function () {
    function LoginUser(http, storage, appConfig) {
        var _this = this;
        this.http = http;
        this.storage = storage;
        this.appConfig = appConfig;
        this.storage.ready().then(function () {
            _this.storage.set('imageurl', _this.appConfig.setImageurl());
            _this.storage.set('rooturl', _this.appConfig.setrooturl());
            storage.get('rooturl').then(function (rooturl) { _this.rootUrl = rooturl; });
        });
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }
    LoginUser.prototype.loginload = function (credentials) {
        var _request = { "email": credentials.email,
            "password": credentials.password };
        return this.http.post(this.rootUrl + 'login', _request, this.headers)
            .map(function (res) { return res.json(); });
    };
    return LoginUser;
}());
LoginUser = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, Storage, AppConfig])
], LoginUser);
export { LoginUser };
//# sourceMappingURL=login-user.js.map