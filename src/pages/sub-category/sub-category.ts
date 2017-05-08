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
@Component({
  selector: 'page-sub-category',
  templateUrl: 'sub-category.html'
})
export class SubCategoryPage {

serviceLocation : string ="";
subcategories:any =[];
locations:any;
emptyRecord:any;
subCategoryId:any;
subCategoryTitle:any;


		// subcategories: Array<{title: string, lists: any, color: string}>;

  constructor(public storage:Storage, public loadingCtrl: LoadingController, public navCtrl: NavController, public navPara: NavParams,public providerService: ServiceProvider) {
    // this.loadLocations();
    this.subCategoryTitle = navPara.get("subcategory").service;
    this.locations = navPara.get("locations");
  	let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    this.storage.ready().then(() => {
      this.storage.get('service_location').then((my_location) => {
        console.log("this.serviceLocation1",my_location);
          for(let i=0; i<this.locations.length;i++){
            if(this.locations[i].location == my_location || this.locations[i].id == my_location){
              this.serviceLocation = my_location;
              console.log("this.serviceLocation2",this.serviceLocation);
            }
            // else{
            //   this.serviceLocation = "";
            //   console.log("this.serviceLocation3",this.serviceLocation);
            // }
          }          
          this.loadSubCategory(this.serviceLocation);          
      });
    });
    loading.present();
    loading.dismiss();

  }	
  
loadSubCategory(location){
  
  this.subCategoryId = this.navPara.get("subcategory").id;
  let serviceOfferedData = {"serviceOfferedId":this.subCategoryId,"locationId": location};
          
	this.providerService.webServiceCall(`getVendorServiceSubCategory`,serviceOfferedData)
	// this.providerService.loadVendorServiceSubCategory(serviceListId)
    .subscribe(data =>{
      this.subcategories = data.result;
    },
    err =>{

      if(err.status===401){
      // this.providerService.showToast(JSON.parse(err._body).result);
      // this.providerService.showToast(JSON.parse(err._body).error);  
      this.emptyRecord = JSON.parse(err._body).result;
      }
      else{
       this.providerService.showToast("Please try again later..!");  
       this.emptyRecord = "No Records Found" 
      }

    })
}

locationChanged(){
console.log("this.serviceLocation4",this.serviceLocation);
  let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    this.storage.ready().then(() => {
      this.storage.set('service_location',this.serviceLocation);
      // let locationBasedData = {"serviceOfferedId":this.subCategoryId,"locationId":this.serviceLocation};
      this.subcategories="";
      this.loadSubCategory(this.serviceLocation);
    });
    loading.present();
    loading.dismiss();
  }

openSelected(sub_category_Data){
let location_id = this.serviceLocation;
    let sub_service = sub_category_Data;
    if(this.serviceLocation==""){
      this.providerService.showToast("Please Select the Location!");
    }else{
    this.navCtrl.push(SubCategoryServicePage,{location_id,sub_service});  
    }
  }

  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
}
