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
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MessagesService } from '../../providers/messages-service';
import { ViewMessagesPage } from '../../pages/view-messages/view-messages';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CreateMessagePage } from '../../pages/create-message/create-message';
/*
  Generated class for the Messages page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var MessagesPage = (function () {
    function MessagesPage(navCtrl, navParams, storage, messagesService, loadingCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.messagesService = messagesService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.messages = "inbox";
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('token').then(function (token) {
                _this.token = token;
                // this.blogId=navParams.get("blogId");
                _this.onInit();
            });
        });
    }
    MessagesPage.prototype.onInit = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.messagesService.inbox().subscribe(function (inbox) {
            _this.inboxInfo = inbox.result;
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
        loader.dismiss();
    };
    MessagesPage.prototype.sent = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.messagesService.sent().subscribe(function (sent) {
            _this.sentInfo = sent.result;
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
        loader.dismiss();
    };
    MessagesPage.prototype.viewMessages = function (messageId) {
        this.navCtrl.push(ViewMessagesPage, { messageId: messageId });
    };
    MessagesPage.prototype.showToaster = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    MessagesPage.prototype.dashboardPage = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    MessagesPage.prototype.createMessage = function () {
        this.navCtrl.push(CreateMessagePage);
    };
    return MessagesPage;
}());
MessagesPage = __decorate([
    Component({
        selector: 'page-messages',
        templateUrl: 'messages.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Storage, MessagesService, LoadingController, ToastController])
], MessagesPage);
export { MessagesPage };
//# sourceMappingURL=messages.js.map