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
import { Validators, FormBuilder } from '@angular/forms';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { MessagesPage } from '../../pages/messages/messages';
import { MessagesService } from '../../providers/messages-service';
/*
  Generated class for the CreateMessage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var CreateMessagePage = (function () {
    //protected captains = ['James T. Kirk', 'Benjamin Sisko', 'Jean-Luc Picard', 'Spock', 'Jonathan Archer', 'Hikaru Sulu', 'Christopher Pike', 'Rachel Garrett' ];
    function CreateMessagePage(formBuilder, completerService, navCtrl, navParams, storage, loadingCtrl, toastCtrl, messagesService, public) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.completerService = completerService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.messagesService = messagesService;
        this.friendsList = [];
        this.getFriendsListobj = [];
        this.submitAttempt = false;
        this.subject1 = '';
        this.customErr = false;
        this.storage.ready().then(function () {
            storage.get('user_type').then(function (user_type) { _this.user_type = user_type; });
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('token').then(function (token) {
                _this.token = token;
                _this.getFriendsList();
            });
        });
        this.toAddress = navParams.get("to");
        this.subject = navParams.get("subject");
        this.message = navParams.get("message");
        this.messageForm = formBuilder.group({
            toAddress: ['', Validators.compose([Validators.required])],
            subject: ['', Validators.compose([Validators.required])],
            message: ['', Validators.compose([Validators.required])]
        });
    }
    CreateMessagePage.prototype.getFriendsList = function () {
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
        if (!this.messageForm.valid) {
            console.log(this.messageForm.valid);
            this.submitAttempt = true;
        }
        else {
            var subject = this.messageForm.value.subject;
            var message = this.messageForm.value.message;
            var loader = this.loadingCtrl.create({ content: "Please wait..." });
            loader.present();
            for (var i = 0; i < this.getFriendsListobj.length; i++) {
                if (this.toAddress == this.getFriendsListobj[i].friend_name) {
                    this.toId = this.getFriendsListobj[i].id;
                    this.toEmail = this.getFriendsListobj[i].email;
                }
            }
            console.log("toId" + this.toId);
            if (this.toId == '' || this.toId === null || this.toId == undefined) {
                //this.showToaster("Please select valid to address");
                loader.dismiss();
                this.customErr = true;
                // return false;
            }
            else {
                this.messageObj = { "message": { "attachments": [], "to": { "title": this.toAddress, "description": this.toEmail, "image": "", "originalObject": { "id": this.toId, "avatar": "", "email": this.toEmail, "user_type": this.user_type, "friend_name": "" } }, "subject": subject, "message": message } };
                this.messagesService.sendMessage(this.messageObj).subscribe(function (sendMessage) {
                    _this.toAddress = '';
                    _this.subject = '';
                    _this.message = '';
                    _this.navCtrl.setRoot(MessagesPage);
                    _this.showToaster(sendMessage.result.info);
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
            }
        }
    };
    CreateMessagePage.prototype.hiddeEorr = function () {
        this.customErr = false;
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
    __metadata("design:paramtypes", [FormBuilder, CompleterService, NavController, NavParams, Storage, LoadingController, ToastController, MessagesService, Object])
], CreateMessagePage);
export { CreateMessagePage };
//# sourceMappingURL=create-message.js.map