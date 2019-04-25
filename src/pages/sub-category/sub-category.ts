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

  serviceOffered: any;
serviceLocation : any ="";
subcategories:any =[];
locations:any;
emptyRecord:any;
subCategoryId:any;
subCategoryTitle:any;
packageCount;
packages:any=[];
imageUrl:any;
selectserviceLocation:any;
servicelocationid:any;
term:any = "";
recreation_config:any;
category_id:any;
getPackageTags:any=[];
packagess:any=[];
selectedRow : Number;
alltags:boolean = false;
		// subcategories: Array<{title: string, lists: any, color: string}>;

  constructor(public platform: Platform,public storage:Storage, public loadingCtrl: LoadingController, public navCtrl: NavController, public navPara: NavParams,public providerService: ServiceProvider) {
    // this.loadLocations();
    this.alltags = true;
     this.subCategoryTitle = navPara.get("subcategory").service;
     this.category_id = navPara.get("subcategory").id;
    this.locations= navPara.get("locations");
    
    let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    platform.ready().then(() => {
    this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
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
          this.getpackageTags();
          this.loadSubCategory(this.serviceLocation);      
          this.loadPackages(this.serviceLocation,this.category_id);    
      });
    });
  });
    loading.present();
    loading.dismiss();
  }	
    setClickedRow(index){
      this.selectedRow = index;
      this.alltags = false;
    }
    loadPackagesByLocationID(locationId){
    this.providerService.webServiceCall(`getPackage`,{"locationId":locationId,"categoryId":this.category_id})
      .subscribe(data =>{
       this.packages =  data.result;
       this.packageCount = this.packages.length;
    },
    err =>{
      this.providerService.showErrorToast(err);
      
    })
  }
   loadPackages(location,category_id){
    this.providerService.webServiceCall(`getPackage`,{"locationId":location,"categoryId":this.category_id})
      .subscribe(data =>{
       this.packages =  data.result;
       this.packagess = data.result;
       this.packageCount = this.packages.length;
    },
    err =>{
      this.providerService.showErrorToast(err);        
    }) 
  }
  getpackageall(){
     this.providerService.webServiceCall(`getPackage`,{"locationId":this.serviceLocation,"categoryId":this.category_id})
      .subscribe(data =>{
        this.alltags = true;
       this.packages =  data.result;
       this.packagess = data.result;
       this.packageCount = this.packages.length;
    },
    err =>{
      this.providerService.showErrorToast(err);        
    }) 
  }
    getpackageTags(){
    this.providerService.webServiceCall(`getPackageTags`,"")
      .subscribe(data =>{
       this.getPackageTags =  data.result.info;
    },
    err =>{
      this.providerService.showErrorToast(err);        
    }) 
  }
  searchpackageTags(package_tags){
      if (package_tags && package_tags.trim() != '') {
      this.packages = this.packagess.filter((item) => {
        return (item.tags.indexOf(package_tags) > -1);
      })
    }
  }
   viewPackage(vendor_id,pack_id){
    this.navCtrl.push(PackageDetailPagePage,{"vendor_id":vendor_id,'location_id':this.serviceLocation,"pack_id":pack_id});
  }
   public getItems(term){
    this.term = term;
    this.loadsSubCategory(this.term);
  }
  loadsSubCategory(term){
  let loading = this.loadingCtrl.create({content: 'Please wait...!'});
  loading.present();
  this.subCategoryId = this.navPara.get("subcategory").id;
  this.serviceOffered = this.navPara.get("subcategory").service;
  let serviceOfferedData = {"serviceOfferedId":this.subCategoryId,"locationId": this.serviceLocation,"serviceOffered":this.serviceOffered,"searchVal":term};
          
  this.providerService.webServiceCall(`getVendorServiceSubCategory`,serviceOfferedData)
  // this.providerService.loadVendorServiceSubCategory(serviceListId)
    .subscribe(data =>{
      this.subcategories = data.result;
      this.recreation_config = data.result.recreation_config;
      console.log(this.recreation_config);
      loading.dismiss();
    },
    err =>{
      if(err.status===401){
         this.subcategories = [];
      if(this.serviceLocation != ""){
      this.emptyRecord = "We are in the process of identifying partners in this category for this location!"
      }}
      else{
       this.providerService.showToast("Something went wrong");  
        
      }
      loading.dismiss();
    })
}
loadSubCategory(location){
  let loading = this.loadingCtrl.create({content: 'Please wait...!'});
  loading.present();
  this.subCategoryId = this.navPara.get("subcategory").id;
  this.serviceOffered = this.navPara.get("subcategory").service;
  let serviceOfferedData = {"serviceOfferedId":this.subCategoryId,"locationId": location,"serviceOffered":this.serviceOffered,"searchVal":""};
          
	this.providerService.webServiceCall(`getVendorServiceSubCategory`,serviceOfferedData)
	// this.providerService.loadVendorServiceSubCategory(serviceListId)
    .subscribe(data =>{
      this.subcategories = data.result;
      this.recreation_config = data.result.recreation_config;
      console.log(this.recreation_config);
      loading.dismiss();
    },
    err =>{
      if(err.status===401){
      if(this.serviceLocation != ""){
      this.emptyRecord = "We are in the process of identifying partners in this category for this location!"
      }}
      else{
       this.providerService.showToast("Something went wrong");  
        
      }
      loading.dismiss();
    })
}

locationChanged(){
     this.storage.ready().then(() => {
      this.storage.set('service_location',this.serviceLocation);
      // let locationBasedData = {"serviceOfferedId":this.subCategoryId,"locationId":this.serviceLocation};
      this.subcategories="";
      this.loadSubCategory(this.serviceLocation);
      this.loadPackagesByLocationID(this.serviceLocation);
    });
   
  }

openSelected(sub_category_Data){
  let serviceOfferedtype = this.navPara.get("subcategory").service;
  let location_id = this.serviceLocation;
    let sub_service = sub_category_Data;
    if(this.serviceLocation==""){
      this.providerService.showToast("Please select the location!");
    }else{
    this.navCtrl.push(SubCategoryServicePage,{location_id,sub_service,serviceOfferedtype,"recreation_config":this.recreation_config});  
    }
  }

  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
}
