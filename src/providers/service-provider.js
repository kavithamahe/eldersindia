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
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/Rx';
// let webServiceURL="http://192.168.1.120:8000/api/";
/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var ServiceProvider = (function () {
    function ServiceProvider(http, storage, toastCtrl) {
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
                _this.head = new RequestOptions({ headers: _this.headers });
            });
            storage.get('rooturl').then(function (rooturl) { _this.rootUrl = rooturl; });
        });
    }
    ServiceProvider.prototype.serviceInit = function (token) {
        console.log("token intialized", token);
        this.token = token;
    };
    ServiceProvider.prototype.webServiceCall = function (serviceName, bodyData) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'Bearer ' + this.token);
        this.head = new RequestOptions({ headers: this.headers });
        return this.http.post(this.rootUrl + serviceName, bodyData, this.head)
            .map(function (res) { return res.json(); });
    };
    ServiceProvider.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            position: "top",
            duration: 3000,
        });
        toast.present();
    };
    ServiceProvider.prototype.showErrorToast = function (error) {
        if (error.status === 401) {
            this.showToast(JSON.parse(error._body).result);
        }
        else {
            this.showToast("Please try again later..!");
        }
    };
    return ServiceProvider;
}());
ServiceProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, Storage, ToastController])
], ServiceProvider);
export { ServiceProvider };
//# sourceMappingURL=service-provider.js.map