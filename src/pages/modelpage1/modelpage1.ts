import { Component } from '@angular/core';
import { NavController,NavParams, ViewController,LoadingController,ModalController,Platform} from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { InAppBrowser } from 'ionic-native';
import { PaymentPage } from '../../pages/payment/payment';
import { ServiceProvider } from '../../providers/service-provider';
import moment from 'moment';

import { Storage } from '@ionic/storage';
 import { ServicerequestPage } from '../../pages/servicerequest/servicerequest';

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
  getCustomerBalanceAmount:any;
  get_custome_amount:any;
  get_custome_deliever_amount:any;
  get_custome_service_cancel_amount:any;
  total_cost:any;
  total_service_cost:any;
  servicediscountcost:any;
  discountcost:any;
  packageListsvalue:any;
  requestService:any;
  recurringType:any;
  newtotalcost:any;
  servicediscost:any;
  recurring_cost:any;
  coupan_code:any;
  final_service_cost:any;
  coupon_id:any;
  discounted_cost:any;
  coupandiscount :any;
  wallet_value:any;
  constructor(public modalCtrl: ModalController,public nav: NavController,public platform: Platform,public navParams: NavParams, public formBuilder: FormBuilder, public storage:Storage ,public loadingCtrl: LoadingController,public providerService: ServiceProvider,public params: NavParams,public viewCtrl: ViewController)
   {
    this.recurringType = navParams.get("recurringType");
    this.requestService = navParams.get("requestService");
    this.serviceDatas =  navParams.get("serviceDatas");
    this.getCustomerBalanceAmount = this.serviceDatas.getCustomerBalanceAmount;
    this.get_custome_amount = this.serviceDatas.get_custome_amount;
    this.get_custome_deliever_amount = this.serviceDatas.get_custome_deliever_amount;
    this.get_custome_service_cancel_amount = this.serviceDatas.get_custome_service_cancel_amount;
    this.total_cost = this.serviceDatas.total_cost;
    this.total_service_cost = this.serviceDatas.total_service_cost;
    this.newtotalcost = this.serviceDatas.total_service_cost;
    this.servicediscountcost = this.serviceDatas.servicediscountcost;
    this.discountcost = this.serviceDatas.discountcost;
    this.serviceType = this.serviceDatas.serviceType;
    this.datetime = moment(this.serviceDatas.datetime).format("DD-MM-YYYY");
    this.preferred_time = this.serviceDatas.preferred_time;
    if(this.serviceDatas.from_date != "Invalid date" && this.serviceDatas.from_date != ""){
    this.fromdate = moment(this.serviceDatas.from_date).format("DD-MM-YYYY");
    this.todate = moment(this.serviceDatas.to_date).format("DD-MM-YYYY");
  }
    this.fromtime = this.serviceDatas.from_time;
    this.totime = this.serviceDatas.to_time;
    this.timeslot = this.serviceDatas.time_slot;
    this.packageListsvalue = navParams.get("packageListsvalue");
    this.paydata = navParams.get("paydata");
    this.fullpays = this.paydata.fullpays;
    this.finalcost = this.paydata.finalcost;
    console.log(this.finalcost);
    this.datCount = this.paydata.datCount;
    this.service_cost = this.paydata.servicecost;
    this.servicediscost = navParams.get("servicediscountcost");
    console.log(this.servicediscost);
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
       if(this.get_custome_deliever_amount != 0 || this.getCustomerBalanceAmount != 0 || this.get_custome_service_cancel_amount != 0){
      this.recurring_cost = this.finalcost;
      console.log(this.recurring_cost);
     }
     else{
       this.recurring_cost = this.service_cost;
       console.log(this.recurring_cost);
     }

      this.servicecost =this.serviceDatas.servicecosts;
      console.log(this.servicecost);
    }
    this.name = navParams.get("name"); 
    this.serviceTitle = navParams.get("serviceTitle"); 
    this.vendor = navParams.get("vendor");
    this.vendor_id = navParams.get("vendor_id");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Modelpage1PagePage');
  }
   applyCoupan(serviceType){
      if(this.serviceDatas.datetime == "Invalid date"){
      this.serviceDatas.datetime = "";
    }
    if(serviceType == "One time"){
   let payment_data= {"info":{"category_id":this.category_id,"sub_category_id":this.sub_category_id,"service_id":this.service_ids,
    "category":this.category,"subcategory":this.subcategory,
    "service":this.service,"location_id":this.location_id,"discount":"",
    "pay_method":"","serviceType":this.serviceType,"coupon_code_discount_cost":0,
    "final_service_cost_after_coupon_code_discount":0,"service_name":this.service,
    "paymentflag":1,"service_cost":this.serviceDatas.total_service_cost,"service_cost_travel":this.serviceDatas.total_service_cost,"base_cost":this.serviceDatas.base_cost,
    "from_date":this.serviceDatas.from_date,"to_date":this.serviceDatas.to_date,"time_slot":this.serviceDatas.time_slot,
    "from_time":"","to_time":"","durations":this.serviceDatas.durations,"problem":"",
    "datetime":this.serviceDatas.datetime,"mobile":"","preferred_time":this.serviceDatas.preferred_time,
    "package_id":"","quantity":"","getCustomerBalanceAmount":this.serviceDatas.getCustomerBalanceAmount,"get_custome_amount_actual":0,
    "get_custome_amount":this.serviceDatas.get_custome_amount,"total_cost":this.serviceDatas.total_service_cost,"get_custome_deliever_amount":this.serviceDatas.get_custome_deliever_amount,
    "total_service_cost":this.serviceDatas.total_service_cost,"get_custome_service_cancel_amount":this.serviceDatas.get_custome_service_cancel_amount,"dependentid":this.serviceDatas.dependentId,
    "servicecost":this.serviceDatas.servicecosts,"datCount":this.datCount,"payment_type":"full_payment","discountcost12":null,
    "discountcost2":null,"servicediscost2":null,"servicediscountcost12":"NaN",
    "servicediscountcost13":"NaN","servicediscountcost14":"NaN","discountcost1":"",
    "discountcost":this.serviceDatas.discountcost,"servicediscountcost":"","servicediscost":"",
    "coupen_code":this.coupan_code,"vendor_id":this.vendor_id,"type":"service"}}
        let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
  this.providerService.webServiceCall(`checkCoupenCodeValidity`,payment_data)
  .subscribe(
      data =>{
        this.coupon_id = data.result.coupon_id;
        this.discounted_cost = data.result.discounted_cost;
        this.final_service_cost = data.result.final_service_cost;
        this.wallet_value = data.result.wallet_value;
        this.coupandiscount = "1";
        loading.dismiss();
              },
      err =>{
        loading.dismiss();
        if(err.status===400)
      {
        this.coupon_id = "";
        this.discounted_cost = "";
        this.final_service_cost = "";
        this.coupandiscount = "0";
        this.coupan_code = "";
        this.providerService.showToast(JSON.parse(err._body).error);
      }
      else if(err.status === 401){
        this.coupon_id = "";
        this.discounted_cost = "";
        this.final_service_cost = "";
        this.coupandiscount = "0";
        this.coupan_code = "";
        this.providerService.showToast(JSON.parse(err._body).error);
      }
      else
      {
        this.coupon_id = "";
        this.discounted_cost = "";
        this.final_service_cost = "";
        this.coupandiscount = "0";
        this.coupan_code = "";
        this.providerService.showToast("Something went wrong");
      }
            })
  }
  else{
     let payment_data= {"info":{"category_id":this.category_id,"sub_category_id":this.sub_category_id,"service_id":this.service_ids,
    "category":this.category,"subcategory":this.subcategory,
    "service":this.service,"location_id":this.location_id,"discount":"",
    "pay_method":"","serviceType":this.serviceType,"coupon_code_discount_cost":0,
    "final_service_cost_after_coupon_code_discount":0,"service_name":this.service,
    "paymentflag":1,"service_cost":this.serviceDatas.total_service_cost,"service_cost_travel":this.serviceDatas.total_service_cost,"base_cost":this.serviceDatas.base_cost,
    "from_date":this.serviceDatas.from_date,"to_date":this.serviceDatas.to_date,"time_slot":this.serviceDatas.time_slot,
    "from_time":this.serviceDatas.from_time,"to_time":this.serviceDatas.to_time,"durations":this.serviceDatas.durations,"problem":"",
    "datetime":this.serviceDatas.datetime,"mobile":"","preferred_time":this.serviceDatas.preferred_time,
    "package_id":"","quantity":this.serviceDatas.quantity,"getCustomerBalanceAmount":this.serviceDatas.getCustomerBalanceAmount,"get_custome_amount_actual":0,
    "get_custome_amount":this.serviceDatas.get_custome_amount,"total_cost":this.serviceDatas.total_cost,"get_custome_deliever_amount":this.serviceDatas.get_custome_deliever_amount,
    "total_service_cost":this.serviceDatas.total_service_cost,"get_custome_service_cancel_amount":this.serviceDatas.get_custome_service_cancel_amount,"dependentid":this.serviceDatas.dependentId,
    "servicecost":this.serviceDatas.servicecosts,"datCount":this.datCount,"payment_type":"full_payment","discountcost12":null,
    "discountcost2":null,"servicediscost2":null,"servicediscountcost12":"NaN",
    "servicediscountcost13":"NaN","servicediscountcost14":"NaN","discountcost1":"","selected_dates":this.serviceDatas.selected_dates,
    "discountcost":this.serviceDatas.discountcost,"servicediscountcost":this.serviceDatas.total_cost,"servicediscost":this.serviceDatas.total_cost,
    "coupen_code":this.coupan_code,"vendor_id":this.vendor_id,"type":"service"}}
        let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
  this.providerService.webServiceCall(`checkCoupenCodeValidity`,payment_data)
  .subscribe(
      data =>{
        this.coupon_id = data.result.coupon_id;
        this.discounted_cost = data.result.discounted_cost;
        this.final_service_cost = data.result.final_service_cost;
        this.wallet_value = data.result.wallet_value;
        this.coupandiscount = "1";
        loading.dismiss();
              },
      err =>{
        loading.dismiss();
        if(err.status===400)
      {
        this.coupandiscount = "0";
        this.coupon_id = "";
        this.discounted_cost = "";
        this.final_service_cost = "";
        this.coupan_code = "";
        this.providerService.showToast(JSON.parse(err._body).error);
      }
      else if(err.status === 401){
        this.coupon_id = "";
        this.discounted_cost = "";
        this.final_service_cost = "";
        this.coupandiscount = "0";
        this.coupan_code = "";
        this.providerService.showToast(JSON.parse(err._body).error);
      }
      else
      {
        this.coupandiscount = "0";
        this.coupon_id = "";
        this.discounted_cost = "";
        this.final_service_cost = "";
        this.coupan_code = "";
        this.providerService.showToast("Something went wrong");
      }
            })
  }
    
  }
 checkRefundPolicy() {
this.platform.ready().then(() => {
            let browser = new InAppBrowser("https://www.eldersindia.com/refund-policy/",'_blank');

        });
}
submitRequest(){
  // this.serviceDatas.datetime = moment(this.serviceDatas.datetime).format("DD-MM-YYYY");
   if(this.serviceDatas.datetime == "Invalid date"){
      this.serviceDatas.datetime = "";
    }
    if(this.serviceDatas.from_date == "Invalid date"){
      this.serviceDatas.from_date = "";
    }
    if(this.serviceDatas.to_date == "Invalid date"){
      this.serviceDatas.to_date = "";
    }
  let data={"category_id":this.category_id,"sub_category_id":this.sub_category_id,"service_id":this.service_ids,
  "category":this.category,"subcategory":this.subcategory,
  "service":this.service,"location_id":this.location_id,"discount":"","pay_method":"",
  "serviceType":this.serviceType,"coupon_code_discount_cost":this.discounted_cost,"datCount":this.datCount,
  "final_service_cost_after_coupon_code_discount":this.final_service_cost,"service_name":this.service,
  "paymentflag":1,"service_cost":this.serviceDatas.total_service_cost,"service_cost_travel":this.serviceDatas.total_service_cost,"base_cost":this.serviceDatas.base_cost,
  "from_date":this.serviceDatas.from_date,"to_date":this.serviceDatas.to_date,"time_slot":this.serviceDatas.time_slot,"from_time":this.serviceDatas.from_time,"to_time":this.serviceDatas.to_time,
  "durations":this.serviceDatas.durations,"problem":"","datetime":this.serviceDatas.datetime,"mobile":"",
  "preferred_time":this.serviceDatas.preferred_time,"package_id":this.serviceDatas.package_id,"quantity":this.serviceDatas.quantity,
  "getCustomerBalanceAmount":this.serviceDatas.getCustomerBalanceAmount,"get_custome_amount_actual":0,"get_custome_amount":this.serviceDatas.get_custome_amount,
  "total_cost":this.serviceDatas.total_cost,"get_custome_deliever_amount":this.serviceDatas.get_custome_deliever_amount,"total_service_cost":this.serviceDatas.total_service_cost,
  "get_custome_service_cancel_amount":this.serviceDatas.get_custome_service_cancel_amount,"dependentid":this.serviceDatas.dependentId,"servicecost":this.serviceDatas.servicecosts,
  "coupen_code":this.coupan_code,"wallet_value":this.wallet_value,"vendor_id":this.vendor_id,"type":"service","coupon_id":this.coupon_id,
  "lead_time":this.lead_time,"selected_dates":this.serviceDatas.selected_dates,"exclude_days":this.serviceDatas.exclude_days}
       let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
  this.providerService.webServiceCall(`serviceRequest`,data)
  .subscribe(
      data =>{
        this.providerService.showToast(data.result);
        let paydismiss = "paydismiss";
        this.viewCtrl.dismiss(paydismiss);
        loading.dismiss();
              },
      err =>{
        loading.dismiss();
        if(err.status===400)
      {
        this.providerService.showToast(JSON.parse(err._body).error);
      }
      else if(err.status === 401){
        this.providerService.showToast(JSON.parse(err._body).error);
      }
      else
      {
        this.providerService.showToast("Something went wrong");
      }
            })
}
  submit() {
    // if(this.coupandiscount == "1"){
    //   this.servicecost = this.final_service_cost;
    //   this.service_cost = this.final_service_cost;
    // }
    // else{
    //   this.servicecost = this.servicecost;
    //   this.service_cost = this.service_cost;
    // }
    console.log(this.serviceData);
    let paydismiss = "paydismiss";
    this.viewCtrl.dismiss(paydismiss);
    if(this.fullpays == true){
        this.paymenttype = "full_payment";
      }
      else if(this.finalcost == undefined){
        this.paymenttype = "CommonRate";
      }
      else{
        this.paymenttype = "partial_payment";
      }
    if(this.datCount != undefined && this.datCount != ""){
     this.nav.push(PaymentPage,{serviceData:this.serviceData,servicecost:this.service_cost,service_costs:this.servicecosts,servicediscountcost:this.finalcost,payableamount:this.payableamount,
      category:this.category,category_id:this.category_id,service:this.service,service_ids:this.service_ids,
      sub_category_id:this.sub_category_id,subcategory:this.subcategory,datCount:this.datCount,paymenttype:this.paymenttype,
      location_id:this.location_id,lead_time:this.lead_time,vendor_id:this.vendor_id,discounts:this.discounts,totalservice_costss:this.totalservice_costss,afterdiscount_one_service:this.afterdiscount_one_service,
      paidPayment:this.paidPayment,servicediscountcost_one_service:this.servicediscountcost_one_service,discountpartial:this.discountpartial,requestService:this.requestService,coupan_id:this.coupon_id,
      coupan_code:this.coupan_code,discounted_cost:this.discounted_cost,final_service_cost:this.final_service_cost,wallet_value:this.wallet_value});
    
     }
     else{
    this.nav.push(PaymentPage,{serviceData:this.serviceData,servicecost:this.servicecost,
      category:this.category,category_id:this.category_id,service:this.service,service_ids:this.service_ids,
      sub_category_id:this.sub_category_id,subcategory:this.subcategory,
      location_id:this.location_id,lead_time:this.lead_time,vendor_id:this.vendor_id,requestService:this.requestService,coupan_id:this.coupon_id,
      coupan_code:this.coupan_code,discounted_cost:this.discounted_cost,final_service_cost:this.final_service_cost,wallet_value:this.wallet_value});
   
     }
}

edit(){ 
  let seviceCheck = "0";
  this.viewCtrl.dismiss(seviceCheck);
}
 paylater(){
  if(this.get_custome_deliever_amount != 0){
    this.providerService.showToast("Your previous service due amount not paid");
  }
  else{
  let coupanDetails= {"coupon_id":this.coupon_id,"coupan_code":this.coupan_code,"discounted_cost":this.discounted_cost,"final_service_cost":this.final_service_cost,"wallet_value":this.wallet_value}
      var obj = Object.assign(this.serviceDatas, coupanDetails);
      this.viewCtrl.dismiss(obj);
    }
  }
  dismiss(){
    // let seviceCheck = "0";
    let paydismiss = "paydismiss";
    this.viewCtrl.dismiss(paydismiss);
  }
}
