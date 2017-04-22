import { Component } from '@angular/core';
import { NavController,ViewController, NavParams } from 'ionic-angular';

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
show_service:any;
sub_category:any;
showContactDetails = false;
showServiceOffered = false;
title:any;
  constructor(public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {

  	this.vendorList = navParams.get("vendorList");
  	if(navParams.get("service") == "contact"){
  		this.showContactDetails = true;	
  		this.title = "Contact Details";
  	}else{
  		this.showServiceOffered = true;
  		this.title = "Service Offered";
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

 show_sub_category(){
      this.show_service = false;      
    if(this.sub_category){
      this.sub_category = false; 
    }else{
      this.sub_category = true;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceModalPage');
  }

}
