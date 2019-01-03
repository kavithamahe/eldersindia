import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions,ResponseContentType,Response } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';

import { HttpClient, HttpHeaders   } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";


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
optionss:any;
  constructor(public http: Http,public storage:Storage, private httpClient: HttpClient) {
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

invoiceFromUser(sr_token,is_recreation_config): Observable<any> {

    let body= {"id":sr_token,"recreation": is_recreation_config};

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append("Content-Type", "application/json");
    headers.append('Authorization', "Bearer " + this.token);

    let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });
    return this.http.post(this.rootUrl+'invoiceFromUser', body, options)
      .map((res: Response) => <any>res )
      .catch((error: any) =>
        Observable.throw(error.json().error || "Server error")
      );
  }
  getcancelRecurringPolicyConfig(hours,service_id,sub_category_id,status,service_type,recurring_request_id,req_count,id){
    let _request= {"hour":hours,"service_id":service_id,"service_type":service_type,"status":status,"sub_category_id":sub_category_id,
    "cancelId":id,"recurring_req_id":recurring_request_id,"req_count":req_count};
    return this.http.post(this.rootUrl+'getcancelRecurringPolicyConfig',_request,this.options)
      .map(res => res.json()); 
  }
  getcancelPolicyConfig(hours,service_id,sub_category_id,status,id,service_type){
    let _request= {"hour":hours,"service_id":service_id,"status":status,"sub_category_id":sub_category_id,"cancel_id":id,"service_type":service_type};
    return this.http.post(this.rootUrl+'getcancelPolicyConfig',_request,this.options)
      .map(res => res.json()); 
  }
  serviceRequestStatus(searchText,status,sortby){
     let _request= {"info":{"list":true,"sort":sortby,"searchValue":searchText,"status":status,"token":""}};
    return this.http.post(this.rootUrl+'serviceRequestList',_request,this.options)
      .map(res => res.json()); 
  }
  travelServiceMemberList(id){
    let _request = {};
    return this.http.post(this.rootUrl+'travelServiceMemberList/' + id,_request,this.options)
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
  
   let _request= {};
    return this.http.post(this.rootUrl+'userServiceRquestDetails/' + serviceRequestId,_request,this.options)
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


    cancelRequest(title,serviceId,service_type,txnid,paid_amount,utilized_service_cost,percentage,recurring_request_id,cancelCharges,dedaction_service_cost,service_remaing_cost,req_count,package_id,
      balanceamount_to_pay,deductionamounts,payable_amount,cancel_services) 
  {
  
   let _request= {"status":3,"id":serviceId,"comments":title,"razorpay_payment_id":txnid,"service_type":service_type,
   "dedaction_amount":deductionamounts,"paid_amount":paid_amount,"utilized_service_cost":utilized_service_cost,"recurring_req_id":recurring_request_id,"reduction_percentage":percentage,
   "service_cancel_amount":dedaction_service_cost,"service_remaing_cost":service_remaing_cost,"balanceamount_to_pay":balanceamount_to_pay,
   "cancel_services":cancel_services,"package_id":package_id,"payable_amount":payable_amount };
    return this.http.post(this.rootUrl+'razorPaymentResponseforCancel',_request,this.options)
      .map(res => res.json()); 
  }
  razorPaymentResponseforCancel(title,serviceId,service_type,txnid,percentage,payment_status,deductionamount,servicecancelamount,package_id){
    let _request= {"status":3,"id":serviceId,"comments":title,"razorpay_payment_id":txnid,"service_type":service_type,
    "dedaction_amount":deductionamount,"payment_status":payment_status,"recurring_req_id":"","reduction_percentage":percentage,"service_cancel_amount":servicecancelamount,
  "package_id":package_id};
    return this.http.post(this.rootUrl+'razorPaymentResponseforCancel',_request,this.options)
      .map(res => res.json());
  }
   updateServiceReceiveStatus(title,serviceId,service_type,is_recreation_config){
     let _request= {"info":{"status":3,"id":serviceId,"comments":title,"service_type":service_type,"recreation":is_recreation_config,"recurring_id":""}};
    return this.http.post(this.rootUrl+'updateServiceReceiveStatus',_request,this.options)
      .map(res => res.json());
  }
}
