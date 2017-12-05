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
 
serviceInit(token){
      this.rootUrl= this.app.setrooturl();
      this.storage.ready().then(() => {
        this.storage.set('rooturl',this.rootUrl);
      });
      this.token = token; 
    console.log("token intialized",token);
    console.log("root url: ",this.rootUrl);   
}

webServiceCall(serviceName,bodyData){
      this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Authorization', 'Bearer ' + this.token);
      this.head = new RequestOptions({ headers: this.headers });

  return this.http.post(this.rootUrl+serviceName, bodyData, this.head)
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
   let _request= {"category": category, "category_id": category_id,"datCount":datCount,"preferred_time":serviceData.preferred_time,
    "dependentid": serviceData.dependentId,"durations":serviceData.durations,"exclude_days":serviceData.exclude_days,"from_date":serviceData.from_date,
    "from_time":serviceData.from_time,"lead_time":lead_time,"location_id":location_id,"package_id":serviceData.package_id,"quantity":"","selected_dates":serviceData.selected_dates,
    "service":service,"serviceType":serviceData.serviceType,"service_id":service_id,"sub_category_id":sub_category_id,"subcategory":subcategory,"time_slot":serviceData.time_slot,
    'to_date':serviceData.to_date,"to_time":serviceData.to_time,"vendor_id":vendor_id};

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


