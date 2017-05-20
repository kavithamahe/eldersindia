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
import { Storage } from '@ionic/storage';
import { ServiceProvider } from '../../providers/service-provider';
import { MyProfilePage } from '../../pages/my-profile/my-profile';
/*
  Generated class for the EditProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var EditProfilePage = (function () {
    function EditProfilePage(storage, loadingCtrl, formBuilder, providerService, navCtrl, navParams) {
        var _this = this;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.formBuilder = formBuilder;
        this.providerService = providerService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.profileData = "";
        this.avatar = "";
        this.pemail = '';
        this.profileData = navParams.get("profileData");
        console.log("xxxxxxxxxxx");
        console.log(this.profileData);
        console.log("person" + this.profileData.personal_email);
        this.pemail = this.profileData.personal_email;
        this.avatar = this.profileData.avatar;
        this.storage.ready().then(function () {
            _this.storage.get('imageurl').then(function (imageurl) {
                _this.imageURL = imageurl;
                _this.base64Image = _this.imageURL + _this.profileData.avatar;
            });
        });
        this.user_dob = this.profileData.dob;
        this.user_type = this.profileData.user_type;
        if (this.user_type == 'sponsor') {
            this.my_location = this.profileData.locationName;
        }
        else {
            this.user_type = "Elder";
            this.my_location = this.profileData.address;
        }
        // this.gender = this.profileData.gender;
        this.edit_profile_Form = formBuilder.group({
            name: [this.profileData.name, Validators.compose([Validators.required])],
            company: [{ value: this.profileData.company_name, disabled: true }],
            designation: [{ value: this.profileData.designation, disabled: true }, Validators.compose([Validators.minLength(3), Validators.required])],
            gender: [this.profileData.gender, Validators.compose([Validators.required])],
            mobile_number: [this.profileData.mobile, Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.required])],
            location: [{ value: this.my_location, disabled: false }, Validators.compose([Validators.required])],
            dob: [{ value: this.my_location, disabled: false }, Validators.compose([])],
            email: [{ value: this.profileData.email, disabled: true }, Validators.compose([Validators.required])],
            personal_email: ['', Validators.compose([])],
            user_type: [{ value: this.user_type, disabled: true }, Validators.compose([Validators.required])]
        });
    }
    EditProfilePage.prototype.loadMyProfile = function () {
        var _this = this;
        this.providerService.webServiceCall("myaccount", "")
            .subscribe(function (data) {
            _this.profileData = data.result.info;
            _this.user_dob = data.result.info.dob;
            _this.user_type = data.result.info.user_type;
        }, function (err) {
            _this.providerService.showErrorToast(err);
        });
    };
    EditProfilePage.prototype.getDate = function (datepar) {
        var dateParts = datepar.split("-").reverse().join("-");
        // let date = dateParts[2]+"-"+dateParts[1]+"-"+dateParts[0];
        return dateParts;
    };
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
            _this.avatar = _this.base64Image;
        }, function (err) {
            console.log(err);
        });
    };
    EditProfilePage.prototype.updateProfile = function () {
        var _this = this;
        if (!this.edit_profile_Form.valid) {
            this.submitAttempt = true;
        }
        else {
            this.submitAttempt = false;
            var data = this.edit_profile_Form.value;
            //     if(this.user_type == 'elder'){
            this.updateData = { name: data.name, gender: data.gender, mobile: data.mobile_number, personal_email: data.personal_email, dob: this.user_dob, app: "", avatar1: this.avatar };
            //     }else{
            // this.updateData = {name: data.name,mobile:data.mobile_number,dob:this.user_dob ,app:"",avatar1:this.avatar};
            // }
            // 
            this.providerService.webServiceCall("myaccountEdit", this.updateData)
                .subscribe(function (data) {
                console.log(data);
                _this.navCtrl.setRoot(MyProfilePage);
            }, function (err) {
                console.log(err);
            });
        }
    };
    EditProfilePage.prototype.showToaster = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    return EditProfilePage;
}());
EditProfilePage = __decorate([
    Component({
        selector: 'page-edit-profile',
        templateUrl: 'edit-profile.html',
        providers: [ServiceProvider]
    }),
    __metadata("design:paramtypes", [Storage, LoadingController, FormBuilder, ServiceProvider, NavController, NavParams])
], EditProfilePage);
export { EditProfilePage };
//# sourceMappingURL=edit-profile.js.map