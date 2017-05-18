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
        this.inboxInfo = [];
        this.sentInfo = [];
        this.nextPageURL1 = '';
        this.nextPageURL2 = '';
        this.inboxScrollLists = [];
        this.sentScrolllLists = [];
        if (navParams.get("viewType") != '' && navParams.get("viewType") != null) {
            this.messages = navParams.get("viewType");
        }
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('token').then(function (token) {
                _this.token = token;
                // this.blogId=navParams.get("blogId");
                if (_this.messages == 'inbox') {
                    _this.onInit();
                }
                else {
                    _this.sent();
                }
            });
        });
    }
    MessagesPage.prototype.onInit = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.messagesService.inbox().subscribe(function (inbox) {
            _this.inboxInfo = inbox.result.data;
            _this.nextPageURL1 = inbox.result.next_page_url;
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
            _this.sentInfo = sent.result.data;
            _this.nextPageURL2 = sent.result.next_page_url;
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
    MessagesPage.prototype.viewMessages = function (messageId, viewType) {
        this.navCtrl.push(ViewMessagesPage, { messageId: messageId, viewType: viewType });
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
    MessagesPage.prototype.doInfinite1 = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            if (_this.nextPageURL1 != null && _this.nextPageURL1 != '') {
                _this.inboxscroll();
            }
            else {
                infiniteScroll.enable(false);
            }
            infiniteScroll.complete();
        }, 500);
    };
    MessagesPage.prototype.inboxscroll = function () {
        var _this = this;
        this.messagesService.inboxScroll(this.nextPageURL1).subscribe(function (inboxScroll) {
            _this.inboxScrollLists = inboxScroll.result.data;
            for (var i = 0; i < Object.keys(_this.inboxScrollLists).length; i++) {
                _this.inboxInfo.push(_this.inboxScrollLists[i]);
            }
            _this.nextPageURL1 = inboxScroll.result.next_page_url;
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
    };
    MessagesPage.prototype.doInfinite2 = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            if (_this.nextPageURL2 != null && _this.nextPageURL2 != '') {
                _this.sentScroll();
            }
            else {
                infiniteScroll.enable(false);
            }
            infiniteScroll.complete();
        }, 500);
    };
    MessagesPage.prototype.sentScroll = function () {
        var _this = this;
        this.messagesService.sentScroll(this.nextPageURL2).subscribe(function (sentScroll) {
            _this.sentScrolllLists = sentScroll.result.data;
            for (var i = 0; i < Object.keys(_this.sentScrolllLists).length; i++) {
                _this.sentInfo.push(_this.sentScrolllLists[i]);
            }
            _this.nextPageURL2 = sentScroll.result.next_page_url;
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
    };
    MessagesPage.prototype.deleteMessage = function (messageId, viewType) {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.messagesService.deleteMessage(messageId, viewType).subscribe(function (deleteMessage) {
            _this.showToaster(deleteMessage.result);
            if (viewType == 'sent') {
                _this.sent();
            }
            else {
                _this.onInit();
            }
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
    return MessagesPage;
}());
MessagesPage = __decorate([
    Component({
        selector: 'page-messages',
        templateUrl: 'messages.html',
        providers: [MessagesService]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Storage, MessagesService, LoadingController, ToastController])
], MessagesPage);
export { MessagesPage };
//# sourceMappingURL=messages.js.map