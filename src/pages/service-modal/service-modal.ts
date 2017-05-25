import { Component } from '@angular/core';
import { NavController,ViewController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { SubcategoryListPage } from '../subcategory-list/subcategory-list';
/*
  Generated class for the ServiceModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-service-modal',
  templateUrl: 'service-modal.html'
})
export class ServiceModalPage {
vendorList:any;
show_service:any = null;
sub_category:any;
showContactDetails = false;
showServiceOffered = false;
title:any;
  constructor(public storage:Storage, public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
   console.log("this is service modal page");
  	this.vendorList = navParams.get("vendorList");
  	if(navParams.get("service") == "contact"){
  		this.showContactDetails = true;	
  		this.title = this.vendorList.vendorDetails.name+" - Contact Details";
  	}else{
  		this.showServiceOffered = true;
  		this.title = this.vendorList.vendorDetails.name+" - Service Offered";
  	}
  	
  }

  dismiss(){
	this.viewCtrl.dismiss();
  }


  showService(event){
    // this.comment="";
    if(this.show_service==event){
        this.show_service=null;
    }
    else{
      this.show_service=event;
    }

 }

 goToService(sub_service){
   let service = {id:sub_service.service_id, name:sub_service.service};
    let location_id = this.locationId;
    this.navCtrl.push(SubcategoryListPage,{location_id,service});
 }

 show_sub_category(){
      this.show_service = false;      
    if(this.sub_category){
      this.sub_category = false; 
    }else{
      this.sub_category = true;
    }
  }
  ionViewWillEnter() {
    this.storage.ready().then(() => {
      this.storage.get('service_location').then((location) => { this.locationId=location;});
    });
    
  }
locationId:any;
}
