import { Component } from '@angular/core';
import { Platform,LoadingController, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { SubCategoryServicePage } from '../sub-category-service/sub-category-service';
import { ServiceProvider } from '../../providers/service-provider';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { PackageDetailPagePage } from '../../pages/package-detail/package-detail';

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

serviceLocation : any ="";
subcategories:any =[];
locations:any;
emptyRecord:any;
subCategoryId:any;
subCategoryTitle:any;
 packageCount;
packages:any=[];
selectserviceLocation:any;
		// subcategories: Array<{title: string, lists: any, color: string}>;

  constructor(public platform: Platform,public storage:Storage, public loadingCtrl: LoadingController, public navCtrl: NavController, public navPara: NavParams,public providerService: ServiceProvider) {
    // this.loadLocations();
     this.subCategoryTitle = navPara.get("subcategory").service;
    this.locations= navPara.get("locations");
    
    let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    platform.ready().then(() => {
    this.storage.ready().then(() => {
      this.storage.get('service_location').then((my_location) => {
        console.log("this.serviceLocation1",my_location);
          for(let i=0; i<this.locations.length;i++){
            if(this.locations[i].location == my_location || this.locations[i].id == my_location){
              this.serviceLocation = my_location;
             // console.log("this.serviceLocation2",this.serviceLocation);
            }
            // else{
            //   this.serviceLocation = "";
            //   console.log("this.serviceLocation3",this.serviceLocation);
            // }
          }          
          this.loadSubCategory(this.serviceLocation);      
          this.loadPackages(this.serviceLocation);    
      });
    });
  });
    loading.present();
    loading.dismiss();
  }	
    loadPackagesByLocationID(locationId){
    this.providerService.webServiceCall(`getPackage`,{"locationId":locationId})
      .subscribe(data =>{
        //console.log(data);
       this.packages =  data.result;
       //console.log(this.packages.length);
       this.packageCount = this.packages.length;
    },
    err =>{
      this.providerService.showErrorToast(err);
      console.log("Response for get service offered: "+err);
      // this.services=[];      
    })
  }
   loadPackages(location){
    this.providerService.webServiceCall(`getPackage`,{"locationId":location})
      .subscribe(data =>{
        //console.log(data);
       this.packages =  data.result;
       //console.log(this.packages.length);
       this.packageCount = this.packages.length;
    },
    err =>{
      this.providerService.showErrorToast(err);
      console.log("Response for get service offered: "+err);
      //this.services=[];      
    }) 
  }
   viewPackage(vendor_id){
    this.navCtrl.push(PackageDetailPagePage,{"vendor_id":vendor_id,'location_id':this.serviceLocation});
  }
loadSubCategory(location){
  let loading = this.loadingCtrl.create({content: 'Please wait...!'});
  loading.present();
  this.subCategoryId = this.navPara.get("subcategory").id;
  let serviceOfferedData = {"serviceOfferedId":this.subCategoryId,"locationId": location};
          
	this.providerService.webServiceCall(`getVendorServiceSubCategory`,serviceOfferedData)
	// this.providerService.loadVendorServiceSubCategory(serviceListId)
    .subscribe(data =>{
      this.subcategories = data.result;
      loading.dismiss();
    },
    err =>{
      if(err.status===401){
      // this.providerService.showToast(JSON.parse(err._body).result);
      // this.providerService.showToast(JSON.parse(err._body).error);  
      //this.emptyRecord = JSON.parse(err._body).result;
      console.log(this.serviceLocation);
      if(this.serviceLocation != ""){
      this.emptyRecord = "We are in the process of identifying partners in this category for this location!"
      }}
      else{
       this.providerService.showToast("Please try again later..!");  
        
      }
      loading.dismiss();
    })
}

locationChanged(){
console.log("this.serviceLocation4",this.serviceLocation);
     this.storage.ready().then(() => {
      this.storage.set('service_location',this.serviceLocation);
      console.log(this.serviceLocation);
      console.log("change location"+this.serviceLocation);
      // let locationBasedData = {"serviceOfferedId":this.subCategoryId,"locationId":this.serviceLocation};
      this.subcategories="";
      this.loadSubCategory(this.serviceLocation);
      this.loadPackagesByLocationID(this.serviceLocation);
    });
   
  }

openSelected(sub_category_Data){
let location_id = this.serviceLocation;
    let sub_service = sub_category_Data;
    if(this.serviceLocation==""){
      this.providerService.showToast("Please select the location!");
    }else{
    this.navCtrl.push(SubCategoryServicePage,{location_id,sub_service});  
    }
  }

  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
}
