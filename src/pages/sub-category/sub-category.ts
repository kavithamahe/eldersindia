import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';


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

elderLocation : string ="";
subcategories:any =[];
locations:any;
emptyRecord:any;
subCategoryId:any;
subCategoryTitle:any;


		// subcategories: Array<{title: string, lists: any, color: string}>;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navPara: NavParams,public providerService: ServiceProvider) {

  	let loading = this.loadingCtrl.create({content: 'Please wait...!'});

      this.elderLocation ="";
      this.subCategoryId = navPara.get("subcategory").id;
      this.subCategoryTitle = navPara.get("subcategory").service;
    
      let serviceOfferedId = {"serviceOfferedId":this.subCategoryId,"locationId":""};
      this.loadSubCategory(serviceOfferedId);
      this.loadLocations();

	   loading.present();
     loading.dismiss();

  }	
  
loadSubCategory(serviceListId){

	// getVendorServiceSubCategory
	this.providerService.webServiceCall(`getVendorServiceSubCategory`,serviceListId)
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

loadLocations(){
  
  this.providerService.webServiceCall(`getLocations`,"")
          .subscribe(data =>{
                            this.locations = data.result.info;
                            console.log("Location data : "+this.locations);
                            },
                      err =>{                       
                            this.providerService.showErrorToast(err);
                            console.log("Response for Location data: "+err);
                            });
}

locationChanged(){
    let locationBasedData = {"serviceOfferedId":this.subCategoryId,"locationId":this.elderLocation};
    this.subcategories="";
    this.loadSubCategory(locationBasedData);
  }

openSelected(sub_category_Data){
let location_id = this.elderLocation;
    let sub_service = sub_category_Data;
    if(this.elderLocation==""){
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
