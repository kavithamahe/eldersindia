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
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the AppConfig provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var AppConfig = (function () {
    function AppConfig(http) {
        this.http = http;
        /*imageUrl="http://183.82.33.232:8097/";
        rooturl="http://183.82.33.232:8097/api/"; */
        this.imageUrl = "http://192.168.1.20:8000/";
        this.rooturl = "http://192.168.1.20:8000/api/";
    }
    AppConfig.prototype.setImageurl = function () {
        return this.imageUrl;
    };
    AppConfig.prototype.setrooturl = function () {
        return this.rooturl;
    };
    return AppConfig;
}());
AppConfig = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], AppConfig);
export { AppConfig };
//# sourceMappingURL=app-config.js.map