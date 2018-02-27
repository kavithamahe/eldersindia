import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the ServiceRequestService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ServiceRequestService {
headers;
token:string;
options:any;
rootUrl:any;
  constructor(public http: Http,public storage:Storage) {
   this.storage.ready().then(() => {
    storage.get('token').then((token) => { this.token=token;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
    this.options = new RequestOptions({ headers: this.headers });
     })    
   
   	storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; });
   });
  }
  serviceRequestList(searchText,status,sort) 
  {
  
   let _request= {"info":{"list":true,"sort":sort,"searchValue":searchText,"status":status,"token":""}};
    return this.http.post(this.rootUrl+'serviceRequestList',_request,this.options)
      .map(res => res.json()); 
  }
  getcancelRecurringPolicyConfig(hours,service_id,sub_category_id,status,servicediscountcost_one_service){
    let _request= {"hour":hours,"service_id":service_id,"servicediscountcost_one_service":servicediscountcost_one_service,"status":status,"sub_category_id":sub_category_id};
    return this.http.post(this.rootUrl+'getcancelRecurringPolicyConfig',_request,this.options)
      .map(res => res.json()); 
  }
  getcancelPolicyConfig(hours,service_id,sub_category_id,status){
    let _request= {"hour":hours,"service_id":service_id,"status":status,"sub_category_id":sub_category_id};
    return this.http.post(this.rootUrl+'getcancelPolicyConfig',_request,this.options)
      .map(res => res.json()); 
  }
  serviceRequestStatus(searchText,status){
     let _request= {"info":{"list":true,"sort":"","searchValue":searchText,"status":status,"token":""}};
    return this.http.post(this.rootUrl+'serviceRequestList',_request,this.options)
      .map(res => res.json()); 
  }

   serviceRequestLists(sr_token,searchText,status,sort) 
  
  {
  
   let _request= {"info":{"list":true,"sort":sort,"searchValue":searchText,"status":status,"token":sr_token}};
    return this.http.post(this.rootUrl+'serviceRequestList',_request,this.options)
      .map(res => res.json()); 
  }
  searchConnection(term){
     let _request= {"info":{"list":true,"sort":"","searchValue":term,"status":""}};
    return this.http.post(this.rootUrl+'serviceRequestList',_request,this.options)
      .map(res => res.json()); 
  }
  viewServiceRequest(serviceRequestId) 
  {
  
   let _request= {"id":serviceRequestId};
    return this.http.post(this.rootUrl+'serviceRequestListById',_request,this.options)
      .map(res => res.json()); 
  }
  
  submitRemark(serviceId,rating,remarks,other) 
  {
  
   let _request= {info: {"starvalue": rating, "remarks": remarks, "id": serviceId,"other":other,"status": 2}};
    return this.http.post(this.rootUrl+'updateServiceReceiveStatus',_request,this.options)
      .map(res => res.json()); 
  }
  serviceRequestScroll(nextPageURL,searchEvent,status,sort)
   {
     let _request= {"info":{"list":true,"sort":sort,"searchValue":searchEvent,"status":status}};
    return this.http.post(nextPageURL,_request,this.options)
      .map(res => res.json()); 
   }
  getRemarks() 
  {
  
   let _request= {"info":{"list":true,"searchValue":"","status":""}};
    return this.http.post(this.rootUrl+'getRemarks',_request,this.options)
      .map(res => res.json()); 
  }
 
    cancelRequest(title,serviceId,dedaction_service_cost,service_type,txnid) 
  {
  
   let _request= {"status":3,"id":serviceId,"comments":title,"razorpay_payment_id":txnid,"service_cancel_amount":dedaction_service_cost,"service_type":service_type};
    return this.http.post(this.rootUrl+'razorPaymentResponseforCancel',_request,this.options)
      .map(res => res.json()); 
  }
  razorPaymentResponseforCancel(title,serviceId,service_type,txnid){
    let _request= {"status":3,"id":serviceId,"comments":title,"razorpay_payment_id":txnid,"service_type":service_type};
    return this.http.post(this.rootUrl+'razorPaymentResponseforCancel',_request,this.options)
      .map(res => res.json());
  }
}
