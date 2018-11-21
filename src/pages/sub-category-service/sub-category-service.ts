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
@Component({
  selector: 'page-sub-category-service',
  templateUrl: 'sub-category-service.html'
})
export class SubCategoryServicePage {
  serviceOffered: any;
	subcategory:any;
	locationId:any;
  recreation_config:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("this is sub category service page");
  	this.subcategory = navParams.get("sub_service");
    console.log(this.subcategory);
    this.locationId = navParams.get("location_id");
    this.serviceOffered = navParams.get("serviceOfferedtype");
    this.recreation_config = navParams.get("recreation_config");

  }

  itemSelected(serviceData) {
    let service = serviceData;
    let location_id = this.locationId;
    let serviceOffereds = this.serviceOffered;
    this.navCtrl.push(SubcategoryListPage,{location_id,service,serviceOffereds,"recreation_config":this.recreation_config});
  }

   public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubCategoryServicePage');
  }

}
