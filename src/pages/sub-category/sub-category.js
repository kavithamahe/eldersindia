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
import { Storage } from '@ionic/storage';
import { SubCategoryServicePage } from '../sub-category-service/sub-category-service';
import { ServiceProvider } from '../../providers/service-provider';
import { DashboardPage } from '../../pages/dashboard/dashboard';
/*
  Generated class for the SubCategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SubCategoryPage = (function () {
    // subcategories: Array<{title: string, lists: any, color: string}>;
    function SubCategoryPage(storage, loadingCtrl, navCtrl, navPara, providerService) {
        var _this = this;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navPara = navPara;
        this.providerService = providerService;
        this.serviceLocation = "";
        this.subcategories = [];
        // this.loadLocations();
        this.subCategoryTitle = navPara.get("subcategory").service;
        this.locations = navPara.get("locations");
        var loading = this.loadingCtrl.create({ content: 'Please wait...!' });
        this.storage.ready().then(function () {
            _this.storage.get('service_location').then(function (my_location) {
                console.log("this.serviceLocation1", my_location);
                for (var i = 0; i < _this.locations.length; i++) {
                    if (_this.locations[i].location == my_location || _this.locations[i].id == my_location) {
                        _this.serviceLocation = my_location;
                        console.log("this.serviceLocation2", _this.serviceLocation);
                    }
                    // else{
                    //   this.serviceLocation = "";
                    //   console.log("this.serviceLocation3",this.serviceLocation);
                    // }
                }
                _this.loadSubCategory(_this.serviceLocation);
            });
        });
        loading.present();
        loading.dismiss();
    }
    SubCategoryPage.prototype.loadSubCategory = function (location) {
        var _this = this;
        this.subCategoryId = this.navPara.get("subcategory").id;
        var serviceOfferedData = { "serviceOfferedId": this.subCategoryId, "locationId": location };
        this.providerService.webServiceCall("getVendorServiceSubCategory", serviceOfferedData)
            .subscribe(function (data) {
            _this.subcategories = data.result;
        }, function (err) {
            if (err.status === 401) {
                // this.providerService.showToast(JSON.parse(err._body).result);
                // this.providerService.showToast(JSON.parse(err._body).error);  
                _this.emptyRecord = JSON.parse(err._body).result;
            }
            else {
                _this.providerService.showToast("Please try again later..!");
                _this.emptyRecord = "No Records Found";
            }
        });
    };
    SubCategoryPage.prototype.locationChanged = function () {
        var _this = this;
        console.log("this.serviceLocation4", this.serviceLocation);
        var loading = this.loadingCtrl.create({ content: 'Please wait...!' });
        this.storage.ready().then(function () {
            _this.storage.set('service_location', _this.serviceLocation);
            // let locationBasedData = {"serviceOfferedId":this.subCategoryId,"locationId":this.serviceLocation};
            _this.subcategories = "";
            _this.loadSubCategory(_this.serviceLocation);
        });
        loading.present();
        loading.dismiss();
    };
    SubCategoryPage.prototype.openSelected = function (sub_category_Data) {
        var location_id = this.serviceLocation;
        var sub_service = sub_category_Data;
        if (this.serviceLocation == "") {
            this.providerService.showToast("Please Select the Location!");
        }
        else {
            this.navCtrl.push(SubCategoryServicePage, { location_id: location_id, sub_service: sub_service });
        }
    };
    SubCategoryPage.prototype.dashboardPage = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    return SubCategoryPage;
}());
SubCategoryPage = __decorate([
    Component({
        selector: 'page-sub-category',
        templateUrl: 'sub-category.html'
    }),
    __metadata("design:paramtypes", [Storage, LoadingController, NavController, NavParams, ServiceProvider])
], SubCategoryPage);
export { SubCategoryPage };
//# sourceMappingURL=sub-category.js.map