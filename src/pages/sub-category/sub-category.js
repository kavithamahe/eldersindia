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
import { SubcategoryListPage } from '../subcategory-list/subcategory-list';
import { ServiceProvider } from '../../providers/service-provider';
import { DashboardPage } from '../../pages/dashboard/dashboard';
/*
  Generated class for the SubCategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SubCategoryPage = (function () {
    // subcategories: Array<{title: string, lists: any, color: string}>;
    function SubCategoryPage(loadingCtrl, navCtrl, navPara, providerService) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navPara = navPara;
        this.providerService = providerService;
        this.elderLocation = "";
        this.subcategories = [];
        var loading = this.loadingCtrl.create({ content: 'Please wait...!' });
        this.subCategoryId = navPara.get("subcategory").id;
        this.subCategoryTitle = navPara.get("subcategory").service;
        var serviceOfferedId = { "serviceOfferedId": this.subCategoryId, "locationId": "" };
        this.loadSubCategory(serviceOfferedId);
        this.loadLocations();
        loading.present();
        loading.dismiss();
    }
    SubCategoryPage.prototype.loadSubCategory = function (serviceListId) {
        var _this = this;
        // getVendorServiceSubCategory
        this.providerService.webServiceCall("getVendorServiceSubCategory", serviceListId)
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
    SubCategoryPage.prototype.loadLocations = function () {
        var _this = this;
        this.providerService.webServiceCall("getLocations", "")
            .subscribe(function (data) {
            _this.locations = data.result.info;
            console.log("Location data : " + _this.locations);
        }, function (err) {
            _this.providerService.showErrorToast(err);
            console.log("Response for Location data: " + err);
        });
    };
    SubCategoryPage.prototype.locationChanged = function () {
        var locationBasedData = { "serviceOfferedId": this.subCategoryId, "locationId": this.elderLocation };
        this.subcategories = "";
        this.loadSubCategory(locationBasedData);
    };
    SubCategoryPage.prototype.openSelected = function (serviceData) {
        var location_id = this.elderLocation;
        var service = serviceData;
        if (this.elderLocation == "") {
            this.providerService.showToast("Please Select the Location!");
        }
        else {
            this.navCtrl.push(SubcategoryListPage, { location_id: location_id, service: service });
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
    __metadata("design:paramtypes", [LoadingController, NavController, NavParams, ServiceProvider])
], SubCategoryPage);
export { SubCategoryPage };
//# sourceMappingURL=sub-category.js.map