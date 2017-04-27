var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { ModalController, LoadingController, NavController, NavParams, Slides, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { ServiceModalPage } from '../../pages/service-modal/service-modal';
import { ModalContentPage } from '../modal-page/modal-page';
import { ServiceProvider } from '../../providers/service-provider';
import { InAppBrowser } from 'ionic-native';
/*
  Generated class for the ServiceInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ServiceInfoPage = (function () {
    // @ViewChild('ghbslides') ghbslides: any;
    function ServiceInfoPage(modalCtrl, platform, formBuilder, loadingCtrl, providerService, navCtrl, navParams, storage) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.platform = platform;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.providerService = providerService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.locationId = "";
        this.vendorList = [];
        this.show_service = null;
        // this.url = this.providerService.getUrl();
        this.subCategoryId = navParams.get("subCategoryId");
        this.locationId = navParams.get("location_id");
        this.vendor_id = navParams.get("vendor").id;
        this.vendor_name = navParams.get("vendor").name;
        this.showDetails = false;
        this.showRequestService = false;
        this.sub_category = false;
        // this.show_service = null;
        this.showServiceOffered = false;
        this.requestForm = formBuilder.group({
            problem: ['', Validators.compose([Validators.minLength(5), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            date: ['', Validators.compose([Validators.required])],
            time: ['', Validators.compose([Validators.required])],
            contact: ['', Validators.compose([Validators.minLength(10), Validators.pattern('[0-9]*'), Validators.required])],
            dependents: ['', Validators.compose([Validators.required])]
        });
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.url = imageurl; });
            storage.get('user_type').then(function (user_type) { _this.userType = user_type; });
            if (_this.userType != 'sponsor') {
                storage.get('id').then(function (id) { _this.elderId = id; });
            }
            storage.get('token').then(function (token) {
                _this.token = token;
                var servieListData = { "vendor_id": _this.vendor_id, "subCategoryId": _this.subCategoryId, "flag": "1", "location_id": _this.locationId };
                _this.loadServiceInformation(servieListData);
            });
        });
    }
    ServiceInfoPage.prototype.openUrl = function () {
        var _this = this;
        console.log("URL is ", this.website);
        this.platform.ready().then(function () {
            var browser = new InAppBrowser(_this.website, '_blank');
        });
    };
    ServiceInfoPage.prototype.loadServiceInformation = function (subcategoryData) {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please wait...!' });
        loading.present();
        // this.providerService.loadVendorDetails(subcategoryData)
        this.providerService.webServiceCall("getVendorDetails", subcategoryData)
            .subscribe(function (data) {
            _this.vendorList = data.result.info;
            _this.serviceData = data.result.info.requestServices;
            _this.website = _this.vendorList.vendorDetails.website;
        }, function (err) {
            _this.providerService.showErrorToast(err);
            console.log("Response for getVendorDetails: " + err);
        });
        loading.dismiss();
    };
    ServiceInfoPage.prototype.modal = function () {
        var modal = this.modalCtrl.create(ServiceModalPage, { service: "service_offered", vendorList: this.vendorList });
        modal.present();
    };
    // ngViewInit() {
    //     this.sliderOptions = {
    //       initialSlide: 0,
    //     loop: true,
    //     autoplay:2000,
    //     autoplayDisableOnInteraction: false
    //     }
    //     this.slider.startAutoplay();
    // };
    ServiceInfoPage.prototype.dashboardPage = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    // ionViewDidLoad() {
    //   console.log('ionViewDidLoad ServiceInfoPage');
    //   this.slider.startAutoplay();
    // }
    ServiceInfoPage.prototype.sendRequestService = function (data) {
        // if(!this.requestForm.valid){
        //   this.submitAttempt = true;
        // }else{
        //   this.submitAttempt = false;
        //   this.dependentID = this.requestForm.value.dependents; 
        //   if(this.userType != 'sponsor'){
        //   this.dependentID = this.elderId;
        //   }
        var _this = this;
        // let requestServiceData = {"location_id":this.locationId,"vendor_id":this.vendor_id, "category_id":this.serviceData.category_id, "sub_category_id":this.serviceData.sub_category_id, "service_id":this.serviceData.service_id, "problem":this.requestForm.value.problem, "datetime":this.requestForm.value.date+" "+this.requestForm.value.time, "dependentid":this.dependentID, "mobile":this.requestForm.value.contact}
        var requestServiceData = { "location_id": this.locationId, "vendor_id": this.vendor_id, "category_id": this.serviceData.category_id, "sub_category_id": this.serviceData.sub_category_id, "service_id": this.serviceData.service_id, "problem": data.problem, "datetime": data.datetime, "dependentid": data.dependentId, "mobile": data.mobile_no };
        this.providerService.webServiceCall("serviceRequest", requestServiceData)
            .subscribe(function (data) {
            console.log(data);
            _this.providerService.showToast(data.result);
            // this.toggleRequestService();
            // this.requestForm.reset();
        }, function (err) {
            _this.providerService.showErrorToast(err);
            console.log("Response for serviceRequest: " + err);
        });
    };
    ServiceInfoPage.prototype.toggleContact = function () {
        var modal = this.modalCtrl.create(ServiceModalPage, { service: "contact", vendorList: this.vendorList });
        modal.present();
        // this.showServiceOffered = false;
        // this.showRequestService = false;
        // this.show_service = false;
        // if (this.showDetails){
        //   this.showDetails = false;
        // }else
        // {
        //   this.showDetails = true;
        // }
    };
    ServiceInfoPage.prototype.toggleRequestService = function () {
        var _this = this;
        var service_modal = this.modalCtrl.create(ModalContentPage, { dependentList: this.vendorList.dependentLists });
        service_modal.present();
        service_modal.onDidDismiss(function (data) {
            if (data == "dismiss") {
                console.log(" schedule request modal dismissed..!");
            }
            else {
                _this.sendRequestService(data);
            }
        });
        // this.submitAttempt = false;
        // this.showServiceOffered = false;
        // this.showDetails = false;
        // this.show_service = false;
        // if (this.showRequestService){
        //   this.showRequestService = false;
        // }else
        // {
        //   this.showRequestService = true;
        // }
    };
    ServiceInfoPage.prototype.toggleServiceOffered = function () {
        this.showDetails = false;
        this.showRequestService = false;
        this.show_service = false;
        this.sub_category = false;
        if (this.showServiceOffered) {
            this.showServiceOffered = false;
        }
        else {
            this.showServiceOffered = true;
        }
    };
    ServiceInfoPage.prototype.show_sub_category = function () {
        this.show_service = false;
        if (this.sub_category) {
            this.sub_category = false;
        }
        else {
            this.sub_category = true;
        }
    };
    // showService(n){
    ServiceInfoPage.prototype.showService = function (event) {
        // this.comment="";
        if (this.show_service == event) {
            this.show_service = null;
        }
        else {
            this.show_service = event;
        }
    };
    return ServiceInfoPage;
}());
__decorate([
    ViewChild('ghbslides'),
    __metadata("design:type", Slides)
], ServiceInfoPage.prototype, "slider", void 0);
ServiceInfoPage = __decorate([
    Component({
        selector: 'page-service-info',
        templateUrl: 'service-info.html',
        providers: [ServiceModalPage]
    }),
    __metadata("design:paramtypes", [ModalController, Platform, FormBuilder, LoadingController, ServiceProvider, NavController, NavParams, Storage])
], ServiceInfoPage);
export { ServiceInfoPage };
//# sourceMappingURL=service-info.js.map