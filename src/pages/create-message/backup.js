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
import { CompleterService } from 'ng2-completer';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { MessagesService } from '../../providers/messages-service';
/*
  Generated class for the CreateMessage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var CreateMessagePage = (function () {
    //protected captains = ['James T. Kirk', 'Benjamin Sisko', 'Jean-Luc Picard', 'Spock', 'Jonathan Archer', 'Hikaru Sulu', 'Christopher Pike', 'Rachel Garrett' ];
    function CreateMessagePage(completerService, navCtrl, navParams, storage, loadingCtrl, toastCtrl, messagesService) {
        var _this = this;
        this.completerService = completerService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.messagesService = messagesService;
        this.friendsList = [];
        this.getFriendsListobj = [];
        this.storage.ready().then(function () {
            console.log('create message');
            storage.get('user_type').then(function (user_type) { _this.user_type = user_type; });
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('token').then(function (token) { _this.token = token; });
            _this.onInit();
        });
    }
    CreateMessagePage.prototype.onInit = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.messagesService.getFriendsList().subscribe(function (getFriendsList) {
            _this.getFriendsListobj = getFriendsList.result;
            for (var i = 0; i < getFriendsList.result.length; i++) {
                _this.friendsList[i] = getFriendsList.result[i].friend_name;
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
    CreateMessagePage.prototype.dashboardPage = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    CreateMessagePage.prototype.sendMessage = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        for (var i = 0; i < this.getFriendsListobj.length; i++) {
            if (this.toAddress == this.getFriendsListobj[i].friend_name) {
                this.toId = this.getFriendsListobj[i].id;
                this.toEmail = this.getFriendsListobj[i].email;
            }
        }
        this.messageObj = { "message": { "attachments": [], "to": { "title": this.toAddress, "description": this.toEmail, "image": "", "originalObject": { "id": this.toId, "avatar": "", "email": this.toEmail, "user_type": this.user_type, "friend_name": "" } }, "subject": this.subject, "message": this.message } };
        this.messagesService.sendMessage(this.messageObj).subscribe(function (sendMessage) {
            _this.toAddress = '';
            _this.subject = '';
            _this.message = '';
            _this.showToaster(sendMessage.result);
            //console.log(singleJob);
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
    CreateMessagePage.prototype.showToaster = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    return CreateMessagePage;
}());
CreateMessagePage = __decorate([
    Component({
        selector: 'page-create-message',
        templateUrl: 'create-message.html',
        providers: [MessagesService]
    }),
    __metadata("design:paramtypes", [CompleterService, NavController, NavParams, Storage, LoadingController, ToastController, MessagesService])
], CreateMessagePage);
export { CreateMessagePage };
//# sourceMappingURL=backup.js.map