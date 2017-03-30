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
// import { Device, LocalNotifications } from 'ionic-native';
import { Platform, NavController, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SubCategoryPage } from '../sub-category/sub-category';
import { ServiceProvider } from '../../providers/service-provider';
// import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { DashboardPage } from '../../pages/dashboard/dashboard';
/*
  Generated class for the Serviceproviders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ServiceprovidersPage = (function () {
    function ServiceprovidersPage(alertCtrl, modalCtrl, loadingCtrl, platform, navCtrl, providerService, storage) {
        var _this = this;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.providerService = providerService;
        this.storage = storage;
        this.services = [];
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('token').then(function (token) {
                _this.token = token;
                _this.loadServiceProvider();
            });
        });
        // alert('Device UUID is: ' + Device.uuid);
    }
    ServiceprovidersPage.prototype.loadServiceProvider = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please wait...!' });
        loading.present();
        // this.providerService.loadServiceOffered()
        this.providerService.webServiceCall("getServiceOffered", { "location": "" })
            .subscribe(function (data) {
            _this.services = data.result.info;
            console.log("Recieved filtered data :" + _this.services);
        }, function (err) {
            _this.providerService.showErrorToast(err);
            console.log("Response for get service offered: " + err);
        });
        loading.dismiss();
    };
    ServiceprovidersPage.prototype.dashboardPage = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    ServiceprovidersPage.prototype.subCategory = function (subcategory) {
        this.navCtrl.push(SubCategoryPage, { subcategory: subcategory });
    };
    // forgotPassword(){
    //   this.passwordCode ="";
    //   this.createModal("forgotPassword");
    // }
    // resetPassword(){
    //     this.passwordCode = "1234";
    //     this.createModal("passwordReset");
    // }
    // createModal(requestData){
    //       let requestType = {modalType:requestData,passCode:this.passwordCode};
    //       let passwordModal = this.modalCtrl.create(ForgotPasswordPage,requestType);
    //   passwordModal.onDidDismiss(data =>{
    //     if(data == "dismiss"){
    //       console.log(" Forgot Password modal dismissed..!");
    //     }else{
    //           if(data.modalType == "forgotPassword"){
    //               this.mailID = data.modalData.emailId;
    //               alert(this.mailID);
    //               // this.serviceRequestCall(data);
    //                 if(this.platform.is('cordova')){
    //                     LocalNotifications.schedule({
    //                             title: "Password Reset",
    //                             text: "password Reset code is 1234",
    //                             at: new Date(new Date().getTime() + 2 * 1000),
    //                             // sound: null
    //                         });
    //                   console.log("forgot Password modal submitted..!");
    //                   LocalNotifications.on("click", (notification, state) => {
    //                   let alert = this.alertCtrl.create({
    //                       title: "Notification Clicked",
    //                       subTitle: "You just clicked the scheduled notification",
    //                       buttons: ["OK"]
    //                       });
    //                     alert.present();
    //                     });
    //                   }else{
    //                     console.log("current platform is not cordova..");
    //                   }
    //                   this.resetPassword();
    //           }else{
    //               this.newPassword = data.modalData.newPassword;
    //               this.providerService.showToast("Password Reset Successful..!")
    //           }
    //       }
    //     })  
    //   passwordModal.present();
    // }
    ServiceprovidersPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DependentsPage');
    };
    return ServiceprovidersPage;
}());
ServiceprovidersPage = __decorate([
    Component({
        selector: 'page-serviceproviders',
        templateUrl: 'serviceproviders.html'
    }),
    __metadata("design:paramtypes", [AlertController, ModalController, LoadingController, Platform, NavController, ServiceProvider, Storage])
], ServiceprovidersPage);
export { ServiceprovidersPage };
//# sourceMappingURL=serviceproviders.js.map