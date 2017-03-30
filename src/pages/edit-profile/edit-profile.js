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
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Camera } from 'ionic-native';
import { ServiceProvider } from '../../providers/service-provider';
/*
  Generated class for the EditProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var EditProfilePage = (function () {
    function EditProfilePage(loadingCtrl, formBuilder, providerService, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.formBuilder = formBuilder;
        this.providerService = providerService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // et
        this.profileData = navParams.get("profileData");
        this.logoUrl = "http://183.82.33.232:8097/";
        this.user_type = this.profileData.user_type;
        console.log(this.logoUrl + this.profileData.logo);
        this.edit_profile_Form = formBuilder.group({
            name: [this.profileData.name, Validators.compose([Validators.minLength(6), Validators.required])],
            designation: [this.profileData.designation, Validators.compose([Validators.minLength(3), Validators.required])],
            gender: ["male", Validators.compose([Validators.required])],
            mobile_number: [this.profileData.mobile, Validators.compose([Validators.minLength(10), Validators.required])],
            location: [this.profileData.locationName, Validators.compose([Validators.minLength(6), Validators.required])],
            dob: [this.profileData.dob, Validators.compose([Validators.minLength(6), Validators.required])],
            email: [this.profileData.email, Validators.compose([Validators.minLength(6), Validators.required])],
            user_type: [this.profileData.user_type, Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }
    EditProfilePage.prototype.dismiss = function () {
        this.navCtrl.pop();
    };
    EditProfilePage.prototype.accessGallery = function () {
        var _this = this;
        Camera.getPicture({
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            destinationType: Camera.DestinationType.DATA_URL
        }).then(function (imageData) {
            _this.base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.avatar = imageData;
        }, function (err) {
            console.log(err);
        });
    };
    EditProfilePage.prototype.onChange1 = function (event) {
        var eventObj = event;
        var target = eventObj.target;
        var files = target.files;
        this.file = files[0];
        console.log(target);
        console.log(this.file);
        var data = this.edit_profile_Form.value;
        var updateData = { name: data.name, mobile: data.mobile_number, dob: data.dob, avatar: this.file };
        this.providerService.webServiceCall("myaccountEdit", updateData)
            .subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    EditProfilePage.prototype.updateProfile = function () {
        var data = this.edit_profile_Form.value;
        var updateData = { name: data.name, mobile: data.mobile_number, dob: data.dob, avatar: this.file };
        this.providerService.webServiceCall("myaccountEdit", updateData)
            .subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    EditProfilePage.prototype.viewDidLoad = function () {
        console.log('ionViewDidLoad EditProfilePage');
    };
    return EditProfilePage;
}());
EditProfilePage = __decorate([
    Component({
        selector: 'page-edit-profile',
        templateUrl: 'edit-profile.html'
    }),
    __metadata("design:paramtypes", [LoadingController, FormBuilder, ServiceProvider, NavController, NavParams])
], EditProfilePage);
export { EditProfilePage };
//# sourceMappingURL=edit-profile.js.map