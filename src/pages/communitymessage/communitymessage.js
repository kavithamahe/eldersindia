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
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Camera } from 'ionic-native';
import { CommunityServices } from '../../providers/community-services';
var CommunitymessagePage = (function () {
    function CommunitymessagePage(navCtrl, navParams, communityServices, formBuilder, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.communityServices = communityServices;
        this.formBuilder = formBuilder;
        this.viewCtrl = viewCtrl;
        this.member_name = navParams.get("member_data").name;
        this.member_id = navParams.get("member_data").id;
        console.log("member name in message", this.member_name);
        this.authForm = formBuilder.group({
            subject: ['', Validators.compose([Validators.required])],
            message: ['', Validators.compose([Validators.required])]
        });
    }
    CommunitymessagePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CommunitymessagePage');
    };
    CommunitymessagePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CommunitymessagePage.prototype.sendMessage = function () {
        var _this = this;
        this.communityServices.sendMessage(this.member_id, this.attachment, this.authForm.value.subject, this.authForm.value.message).subscribe(function (users) {
            _this.communityServices.showToast(users.result);
            _this.authForm.reset();
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
        if (!this.authForm.valid) {
            this.submitAttempt = true;
        }
        else {
            this.submitAttempt = false;
        }
    };
    CommunitymessagePage.prototype.accessGallery = function () {
        var _this = this;
        Camera.getPicture({
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            destinationType: Camera.DestinationType.DATA_URL
        }).then(function (imageData) {
            _this.base64Image = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            console.log(err);
        });
    };
    return CommunitymessagePage;
}());
CommunitymessagePage = __decorate([
    Component({
        selector: 'page-communitymessage',
        templateUrl: 'communitymessage.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, CommunityServices, FormBuilder, ViewController])
], CommunitymessagePage);
export { CommunitymessagePage };
//# sourceMappingURL=communitymessage.js.map