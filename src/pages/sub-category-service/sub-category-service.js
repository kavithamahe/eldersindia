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
import { NavController, NavParams } from 'ionic-angular';
import { SubcategoryListPage } from '../subcategory-list/subcategory-list';
//import { ServiceProvider } from '../../providers/service-provider';
import { DashboardPage } from '../../pages/dashboard/dashboard';
/*
  Generated class for the SubCategoryService page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SubCategoryServicePage = (function () {
    function SubCategoryServicePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.subcategory = navParams.get("sub_service");
        this.locationId = navParams.get("location_id");
    }
    SubCategoryServicePage.prototype.itemSelected = function (serviceData) {
        var service = serviceData;
        var location_id = this.locationId;
        this.navCtrl.push(SubcategoryListPage, { location_id: location_id, service: service });
    };
    SubCategoryServicePage.prototype.dashboardPage = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    SubCategoryServicePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SubCategoryServicePage');
    };
    return SubCategoryServicePage;
}());
SubCategoryServicePage = __decorate([
    Component({
        selector: 'page-sub-category-service',
        templateUrl: 'sub-category-service.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams])
], SubCategoryServicePage);
export { SubCategoryServicePage };
//# sourceMappingURL=sub-category-service.js.map