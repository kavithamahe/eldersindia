import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import {ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../providers/app-config';
import 'rxjs/Rx';

// let webServiceURL="http://192.168.1.120:8000/api/";
/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ServiceProvider {

headers:any;
head:any;
body: any;
token:any; 
rootUrl:any;

  constructor(public app:AppConfig, public http: Http, public storage:Storage,public toastCtrl:ToastController) {
    this.storage.ready().then(() => {
      storage.get('token').then((token) => { this.token=token;
      this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Authorization', 'Bearer ' + this.token);
      this.head = new RequestOptions({ headers: this.headers });
         })    
      storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; });
      
   });  
}
chechLocationID(serviceLocation,head){
  console.log(head);
   let _request= {"location":serviceLocation};
    return this.http.post(this.rootUrl+'setAutoCityLocation',_request,head)
      .map(res => res.json());
} 
serviceInit(token){
      this.rootUrl= this.app.setrooturl();
      this.storage.ready().then(() => {
        this.storage.set('rooturl',this.rootUrl);
      });
      this.token = token; 
    console.log("token intialized",token);
    console.log("root url: ",this.rootUrl);   
}
getCustomerserviceamount(){
   let _request= {};
    return this.http.post(this.rootUrl+'getCustomerserviceamount',_request,this.head)
      .map(res => res.json());
}
getCustomerDeliverStatusAmount(){
   let _request= {};
    return this.http.post(this.rootUrl+'getCustomerDeliverStatusAmount',_request,this.head)
      .map(res => res.json());
}
getServicecancelamount(){
   let _request= {};
    return this.http.post(this.rootUrl+'getServicecancelamount',_request,this.head)
      .map(res => res.json());
}
getCustomerBalanceAmount(){
   let _request= {};
    return this.http.post(this.rootUrl+'getCustomerBalanceAmount',_request,this.head)
      .map(res => res.json());
}
sendotp(){
   let _request= {};
    return this.http.post(this.rootUrl+'sendOtp',_request,this.head)
      .map(res => res.json());
}
elderEmergencySms(url,call_sponsor,sponsor_name,elder_name,elder_lastname){
  console.log(this.head);
  let _request= {"url":url,"sponsor_number":call_sponsor,"sponsor_name":sponsor_name,"elder_name":elder_name,"elder_lastname":elder_lastname};
    return this.http.post(this.rootUrl+'elderEmergencySms',_request,this.head)
      .map(res => res.json());
}
verifyotp(otp){
  let _request= {"otpcode":otp};
    return this.http.post(this.rootUrl+'verifyOtp',_request,this.head)
      .map(res => res.json());
}
getRecurringDiscount(datCount){
   let _request= {"count":datCount};
    return this.http.post(this.rootUrl+'getRecurringDiscount',_request,this.head)
      .map(res => res.json());
}
getdiscountrecurringvalues(getpaidPayment){
  let _request= {"paidPayment":getpaidPayment};
    return this.http.post(this.rootUrl+'getdiscountrecurringvalues',_request,this.head)
      .map(res => res.json());
}

webServiceCall(serviceName,bodyData){
      this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Authorization', 'Bearer ' + this.token);
      this.head = new RequestOptions({ headers: this.headers });

  return this.http.post(this.rootUrl+serviceName, bodyData, this.head)
    .map(res => res.json());
}
getpackagesbasedServices(location_id,vendorid,dependents_id,service_ids){
 let _request= {locationId: location_id, dependent_id: dependents_id, service_id: service_ids, vendor_id: vendorid};
    return this.http.post(this.rootUrl+'getpackagesbasedServices',_request,this.head)
      .map(res => res.json());
}
firsttimelogin(serviceName,bodyData){
      this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Authorization', 'Bearer ' + this.token);
      this.head = new RequestOptions({ headers: this.headers });

  return this.http.post(this.rootUrl+serviceName, bodyData, this.head)
    .map(res => res.json());
}
 packageListsInfo(location_id,service_id,dependents,vendor_id){
     let _request= {locationId: location_id, dependent_id: dependents, service_id: service_id, vendor_id: vendor_id};
    return this.http.post(this.rootUrl+'getpackagesbasedServices',_request,this.head)
      .map(res => res.json());
  }
forgotPassword(serviceName,bodyData){
      this.rootUrl= this.app.setrooturl();
      this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json');
      this.head = new RequestOptions({ headers: this.headers });

  return this.http.post(this.rootUrl+serviceName, bodyData, this.head)
    .map(res => res.json());
}
validateTime(serviceData,location_id,lead_time,vendor_id,category,category_id,service,service_id,sub_category_id,subcategory){
 
   let _request= {"category": category, "category_id": category_id,"datetime":serviceData.datetime,"preferred_time":serviceData.preferred_time,
    "dependentid": serviceData.dependentId,"durations":serviceData.durations,"exclude_days":serviceData.exclude_days,"from_date":serviceData.from_date,
    "from_time":serviceData.from_time,"lead_time":lead_time,"location_id":location_id,"package_id":serviceData.package_id,"quantity":"","selected_dates":serviceData.selected_dates,
    "service":service,"serviceType":serviceData.serviceType,"service_id":service_id,"sub_category_id":sub_category_id,"subcategory":subcategory,"time_slot":serviceData.time_slot,
    'to_date':serviceData.to_date,"to_time":serviceData.to_time,"vendor_id":vendor_id};

    return this.http.post(this.rootUrl+'validateLeadTime',_request,this.head)
      .map(res => res.json());
}
validateTimes(serviceData,location_id,lead_time,vendor_id,category,category_id,service,service_id,sub_category_id,subcategory,datCount){
   let _request= {"category": category, "category_id": category_id,"datCount":datCount,
    "dependentid": serviceData.dependentId,"durations":serviceData.durations,"exclude_days":serviceData.exclude_days,"from_date":serviceData.from_date,
    "from_time":serviceData.from_time,"lead_time":lead_time,"location_id":location_id,"package_id":serviceData.package_id,"quantity":"","selected_dates":serviceData.selected_dates,
    "service":service,"serviceType":serviceData.serviceType,"service_id":service_id,"sub_category_id":sub_category_id,"subcategory":subcategory,"time_slot":serviceData.time_slot,
    'to_date':serviceData.to_date,"to_time":serviceData.to_time,"vendor_id":vendor_id,"service_cost":serviceData.service_cost,"servicecost":serviceData.servicecost,"payment":serviceData.payment};

    return this.http.post(this.rootUrl+'validateLeadTime',_request,this.head)
      .map(res => res.json());
}
showToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      position: "top",
      duration: 3000,
    });
    toast.present();
  }

confirmationToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      position: "bottom",
      duration: 1000,
    });
    toast.present();
  }  

  showErrorToast(error) {

    if(error.status===401){
      this.showToast(JSON.parse(error._body).result);  
      }
      else{
       this.showToast("Please try again later..!");   
      }
  }
 
}


