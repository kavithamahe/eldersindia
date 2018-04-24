import { Component } from '@angular/core';
import { NavController,NavParams, ViewController,LoadingController,ModalController} from 'ionic-angular';
import { FormBuilder } from '@angular/forms';

import { PaymentPage } from '../../pages/payment/payment';
import { ServiceProvider } from '../../providers/service-provider';


import { Storage } from '@ionic/storage';

/*
  Generated class for the Modelpage1Page page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modelpage1',
  templateUrl: 'modelpage1.html'
})
export class Modelpage1PagePage {

  serviceDatas:any;
  name:any;
  serviceType:any;
  datetime:any;
  preferred_time:any;
  serviceTitle:any;
  vendor:any;
  fromdate:any;
  todate:any;
  fromtime:any;
  totime:any;
  timeslot:any;
  servicecost:any;
  paydata:any;
  fullpays:any;
  finalcost:any;
  datCount:any;
  service_cost:any;
  category:any;
  category_id:any;
  service:any;
  service_ids:any;
  sub_category_id:any;
  subcategory:any;
  location_id:any;
  lead_time:any;
  vendor_id:any;
  serviceData:any;
  discountpartial:any;
  payableamount:any;
  servicecosts:any;
  paidPayment:any;
  discounts:any;
  totalservice_costss:any;
  afterdiscount_one_service:any;
  servicediscountcost_one_service:any;
  paymenttype:any;
  constructor(public modalCtrl: ModalController,public nav: NavController,public navParams: NavParams, public formBuilder: FormBuilder, public storage:Storage ,public loadingCtrl: LoadingController,public providerService: ServiceProvider,public params: NavParams,public viewCtrl: ViewController)
   {  
    this.serviceDatas =  navParams.get("serviceDatas");
    this.serviceType = this.serviceDatas.serviceType;
    this.datetime = this.serviceDatas.datetime;
    this.preferred_time = this.serviceDatas.preferred_time;
    this.fromdate = this.serviceDatas.from_date;
    this.todate = this.serviceDatas.to_date;
    this.fromtime = this.serviceDatas.from_time;
    this.totime = this.serviceDatas.to_time;
    this.timeslot = this.serviceDatas.time_slot;

    this.paydata = navParams.get("paydata");
    this.fullpays = this.paydata.fullpays;
    this.finalcost = this.paydata.finalcost;
    this.datCount = this.paydata.datCount;
    this.service_cost = this.paydata.servicecost;
    this.category = this.paydata.category;
    this.category_id = this.paydata.category_id;
    this.service = this.paydata.service;
    this.service_ids = this.paydata.service_ids;
    this.sub_category_id = this.paydata.sub_category_id;
    this.subcategory = this.paydata.subcategory;
    this.location_id = this.paydata.location_id;
    this.lead_time = this.paydata.lead_time;
    this.vendor_id = this.paydata.vendor_id;
    this.servicecosts = this.paydata.service_costs;
    this.payableamount = this.paydata.payableamount;
    this.paidPayment = this.paydata.paidPayment;
    this.discounts = this.paydata.discounts;
    this.totalservice_costss = this.paydata.totalservice_costss;
    this.afterdiscount_one_service = this.paydata.afterdiscount_one_service;
    this.discountpartial = this.paydata.discountpartial;
    this.servicediscountcost_one_service = this.paydata.servicediscountcost_one_service;
    this.serviceData =  navParams.get("serviceDatas");

    if(this.serviceType == "One time"){
      this.servicecost =this.serviceDatas.servicecost;
    }else{
      this.servicecost =this.serviceDatas.servicecosts;
    }
    this.name = navParams.get("name"); 
    this.serviceTitle = navParams.get("serviceTitle"); 
    this.vendor = navParams.get("vendor");
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Modelpage1PagePage');
  }
  submit() {
    if(this.fullpays == true){
        this.paymenttype = "full_payment";
      }
      else if(this.finalcost == undefined){
        this.paymenttype = "CommonRate";
      }
      else{
        this.paymenttype = "partial_payment";
      }
    if(this.datCount != undefined){
      console.log(this.payableamount);
     this.nav.push(PaymentPage,{serviceData:this.serviceData,servicecost:this.service_cost,service_costs:this.servicecosts,servicediscountcost:this.finalcost,payableamount:this.payableamount,
      category:this.category,category_id:this.category_id,service:this.service,service_ids:this.service_ids,
      sub_category_id:this.sub_category_id,subcategory:this.subcategory,datCount:this.datCount,paymenttype:this.paymenttype,
      location_id:this.location_id,lead_time:this.lead_time,vendor_id:this.vendor_id,discounts:this.discounts,totalservice_costss:this.totalservice_costss,afterdiscount_one_service:this.afterdiscount_one_service,
      paidPayment:this.paidPayment,servicediscountcost_one_service:this.servicediscountcost_one_service,discountpartial:this.discountpartial});
    
     }
     else{
    this.nav.push(PaymentPage,{serviceData:this.serviceData,servicecost:this.servicecost,
      category:this.category,category_id:this.category_id,service:this.service,service_ids:this.service_ids,
      sub_category_id:this.sub_category_id,subcategory:this.subcategory,
      location_id:this.location_id,lead_time:this.lead_time,vendor_id:this.vendor_id});
   
     }

}
edit(){ 
  let seviceCheck = "0";
  this.viewCtrl.dismiss(seviceCheck);
}
 paylater(){
      this.viewCtrl.dismiss(this.serviceDatas);
  }
  dismiss(){
    let seviceCheck = "0";
    this.viewCtrl.dismiss(seviceCheck);
  }
}
