import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ToastController ,AlertController} from 'ionic-angular';
import 'rxjs/add/operator/map';
/*
  Generated class for the BlogListService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BlogListService {
headers;
token:string;
options:any;
rootUrl:any;
user_id:any;
BlogId:any;
friendsID:any;
Url:any;
  constructor(public http: Http, public storage:Storage,public toastCtrl: ToastController,private alertCtrl: AlertController) {
    this.storage.ready().then(() => {
    storage.get('token').then((token) => { this.token=token;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
    this.options = new RequestOptions({ headers: this.headers });
       })    
    storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
      console.log(this.rootUrl);
      });
     storage.get('id').then((id) => { this.user_id=id; })
   });
  }
  
  blogList(searchCategory,searchText) {  
   let _request= {search: {"title": searchText, "category": searchCategory}};
    return this.http.post(this.rootUrl+`normaListBlog`,_request,this.options)
      .map(res => res.json()); 
  }
 
  searchConnection(term) {  
   let _request= {"search":{"title":term}};
    return this.http.post(this.rootUrl+'normaListBlog',_request,this.options)
      .map(res => res.json()); 
  }
  searchCategory(searchCategory) {  
   let _request= {"search":{"title":"","category": searchCategory}};
    return this.http.post(this.rootUrl+'normaListBlog',_request,this.options)
      .map(res => res.json()); 
  }
  getBlogCategories(){
     let _request= {};
    return this.http.post(this.rootUrl+'getBlogCategories',_request,this.options)
      .map(res => res.json());
  }
  getrecurringRequest(rootUrl,searchText,sort){
    let _request= {"search": searchText,"sort":sort};
    return this.http.post(rootUrl+'getRecurringServiceList',_request,this.options)
      .map(res => res.json());
  }
  serviceRequestSubmitbeforePayment(rootUrl,servicecost,
      category,category_id,service,service_ids,sub_category_id,
     subcategory,datetime,dependentId,durations,exclude_days,
    from_date,from_time,serviceType,selected_dates,time_slot,
     to_date,to_time,package_id,preferred_time,quantity,
     location_id,lead_time,vendor_id,datCount,service_costs,servicediscountcostss,paymenttype,paymentflag,discounts,totalservice_costss,discountcost,
     afterdiscount_one_service,servicediscountcost_one_service,discountpartial,base_cost,servicediscost,getCustomerBalanceAmount,get_custome_amount,get_custome_deliever_amount,
     get_custome_service_cancel_amount,total_cost,total_service_cost,coupon_id,coupan_code,discounted_cost,final_service_cost,wallet_value){
    let _request= {"Category_name":category,"category":category,"category_id":category_id,"datetime":datetime,"dependentid":
dependentId,"durations":durations,"exclude_days":exclude_days,"from_date":from_date,"from_time":
from_time,"lead_time":lead_time,"location_id":location_id,"package_id":package_id,"preferred_time":preferred_time,
"quantity":quantity,"selected_dates":selected_dates,"service":service,"serviceType":
serviceType,"service_cost":servicecost,"service_id":service_ids,"sub_category_id":sub_category_id,"subcategory":subcategory,"time_slot":time_slot
,"to_date":to_date,"to_time":to_time,"vendor_id":vendor_id,"datCount":datCount,"servicecost":service_costs,"servicediscountcost":servicediscountcostss,"servicediscost":servicediscost,
"problem":"","pay_method":paymenttype,"mobile":"","paymentflag":paymentflag,"afterdiscount":totalservice_costss,
"discount":discounts,"discountcost":discountcost,"payment_type":paymenttype,"afterdiscount_one_service":afterdiscount_one_service,"servicediscountcost_one_service":servicediscountcost_one_service,
"discountpartial":discountpartial,"base_cost":base_cost,"getCustomerBalanceAmount":getCustomerBalanceAmount,
"get_custome_amount":get_custome_amount,"get_custome_deliever_amount":get_custome_deliever_amount,"get_custome_service_cancel_amount":get_custome_service_cancel_amount,"total_cost":total_cost,
"total_service_cost":total_service_cost,"coupen_code":coupan_code,"coupon_code_discount_cost":discounted_cost,"coupon_id":coupon_id,"final_service_cost_after_coupon_code_discount":final_service_cost,
"wallet_value":wallet_value};
    return this.http.post(rootUrl+'serviceRequestSubmitbeforePayment',_request,this.options)
      .map(res => res.json());
  }
   serviceRequestSubmitbeforePayments(rootUrl,servicecost,
      category,category_id,service,service_ids,sub_category_id,
     subcategory,datetime,dependentId,durations,exclude_days,
    from_date,from_time,serviceType,selected_dates,time_slot,
     to_date,to_time,package_id,preferred_time,quantity,
     location_id,lead_time,vendor_id,paymentflag,base_cost,getCustomerBalanceAmount,get_custome_amount,get_custome_deliever_amount,
     get_custome_service_cancel_amount,total_cost,total_service_cost,coupon_id,coupan_code,discounted_cost,final_service_cost,wallet_value){
    let _request= {"Category_name":category,"category":category,"category_id":category_id,"datetime":datetime,"dependentid":
dependentId,"durations":durations,"exclude_days":exclude_days,"from_date":from_date,"from_time":
from_time,"lead_time":lead_time,"location_id":location_id,"package_id":package_id,"preferred_time":preferred_time,
"quantity":quantity,"selected_dates":selected_dates,"service":service,"serviceType":
serviceType,"service_cost":servicecost,"service_id":service_ids,"sub_category_id":sub_category_id,"subcategory":subcategory,"time_slot":time_slot
,"to_date":to_date,"to_time":to_time,"vendor_id":vendor_id,"paymentflag":paymentflag,"base_cost":base_cost,"getCustomerBalanceAmount":getCustomerBalanceAmount,
"get_custome_amount":get_custome_amount,"get_custome_deliever_amount":get_custome_deliever_amount,"get_custome_service_cancel_amount":get_custome_service_cancel_amount,
"total_cost":total_cost,"total_service_cost":total_service_cost,"coupen_code":coupan_code,"coupon_code_discount_cost":discounted_cost,"coupon_id":coupon_id,"final_service_cost_after_coupon_code_discount":final_service_cost,
"wallet_value":wallet_value};
    return this.http.post(rootUrl+'serviceRequestSubmitbeforePayment',_request,this.options)
      .map(res => res.json());
  }
  razorPaymentResponses(rootUrl,payment_id){
    let _request= {"razorpay_payment_id": payment_id};
    console.log(_request);
     return this.http.post(rootUrl+'razorPaymentResponse',_request,this.options)
      .map(res => res.json());
  }
  paymentTran(rootUrl,key,productinfo,txnid,amount,firstname,email,
      phone,surl,service_provider,udf1,udf2,udf3){

     let _request= {"key":key,"amount":amount,"txnid":txnid,"phone":phone,"firstname":firstname,

     "email":email,"productinfo":productinfo,"surl":surl,"udf1":udf1,"service_provider":service_provider,"udf3":"serviceType",
     "udf2":"service_request_id"};
    return this.http.post(rootUrl+'checkpayUmoneyforSRMbl',_request,this.options)
      .map(res => res.json());
  }
  recurringRequestScroll(nextPageURL,searchText,sort){
     let _request= {"search": searchText,"sort":sort};
     return this.http.post(nextPageURL,_request,this.options)
      .map(res => res.json());
  }
  getrecurringRequestdetail(rootUrl,recurring){
    let _request= {"id":recurring};
    return this.http.post(rootUrl+'getRecurringServiceById',_request,this.options)
      .map(res => res.json());
  }
  getrecurringRequestdelete(rootUrl,recurring,hours,paid_cost,reamining_cost,service_cost,status,total_service_cost){
     let _request= {"id": recurring,"hours":hours,"paid_cost":paid_cost,"reamining_cost":reamining_cost,"service_cost":service_cost,"status":status,"total_service_cost":total_service_cost};
    return this.http.post(rootUrl+'getBulkRecurringService',_request,this.options)
      .map(res => res.json());
  }
  deleterecurringrequest(rootUrl,recurring,dedction_amount,refund_amount,remaining_amount,paid_amount,balance_amount,total_amount){
    let _request= {"id":recurring,"dedction_amount":dedction_amount,"refund_amount":refund_amount,"remaining_amount":remaining_amount,
    "total_amount":total_amount,"balance_amount":balance_amount,"paid_amount":paid_amount};

    return this.http.post(rootUrl+'deleteBulkRecurringService',_request,this.options)
      .map(res => res.json());
  }
eventsscroll(searchCategory,searchText,nextPageURL) 
   {  
   let _request= {search: {"title": searchText, "category": searchCategory}};
    return this.http.post(nextPageURL,_request,this.options)
      .map(res => res.json()); 
   }
viewrecurring(sr_token) 
  {
  
   let _request= {"info":{"list":true,"sort":"","searchValue":"","status":"","token":sr_token}};
    return this.http.post(this.rootUrl+'serviceRequestList',_request,this.options)
      .map(res => res.json()); 
  }
  singleBlog(blogId) {  
   let _request= {};
    return this.http.post(this.rootUrl+'getBlogDetails/'+blogId,_request,this.options)
      .map(res => res.json()); 
  }
getPackageRequest(Url,searchText,searchemail,searchid,packstatus){
       let _request= {info: {"list": true, "search": "","elder_name":"","elder_email":searchemail,"txnid":"","pack_name":searchid,"status": packstatus,"paymentStatus":"","reqType":"","token": null,"vendor_name":searchText}};
    return this.http.post(Url+`getPackageRequest`,_request,this.options)
      .map(res => res.json()); 
}
eventscrolls(nextPageURL,searchText,searchemail,searchid,packstatus) 
   {  
   let _request= {info: {"list": true, "search": "","elder_name":searchText,"elder_email":searchemail,"txnid":"","pack_name":searchid,"status": packstatus, "token": null}};

    return this.http.post(nextPageURL,_request,this.options)
      .map(res => res.json()); 
   }
getPackageRequestById(rootUrl,packageId){
     let _request= {"id":packageId};
    return this.http.post(rootUrl+'getPackageRequestById',_request,this.options)
      .map(res => res.json());
  }
  getServicesForByElders(rootUrl,packageId,elder,location_id){
       let _request= {"pack_id": packageId, "elder": elder, "location_id": location_id}
    return this.http.post(rootUrl+'getServicesForByElders',_request,this.options)
      .map(res => res.json());
  }
   getVendorpackageDetails(rootUrl,vendor_id,location_id,pack_id){
    if(location_id == undefined || location_id == ''){
      location_id= 'null';
    }
    let _request= {"vendor_id": vendor_id, "location_id": location_id,"pack_id":pack_id}
    return this.http.post(rootUrl+'getVendorpackageDetails',_request,this.options)
      .map(res => res.json());
   }
  blogComment(blogId,commandObj) {  
    let _request=commandObj;
    return this.http.post(this.rootUrl+'postComments/'+blogId,_request,this.options)
      .map(res => res.json()); 
  }

  viewComments(blogId) {  
   let _request= {};
    return this.http.post(this.rootUrl+'getComments/'+blogId,_request,this.options)
      .map(res => res.json()); 
  }
  deleteComment(commentId) {  
   let _request= {"id":commentId};
    return this.http.post(this.rootUrl+'deleteComment',_request,this.options)
      .map(res => res.json()); 
  }
  deleteReplyComment(commentId) {  
   let _request= {"id":commentId};
    return this.http.post(this.rootUrl+'deleteReplyComment',_request,this.options)
      .map(res => res.json()); 
  }
   postReply(commentId,to_id,comments) {  
   let _request= {info: {"comments": comments, "uid_from": this.user_id, "uid_to": to_id, "comment_id": commentId}}
    return this.http.post(this.rootUrl+'postReply',_request,this.options)
      .map(res => res.json()); 
  }
  createBlog(blogObject,actionUrl)
  {
    let _request= blogObject;
    return this.http.post(this.rootUrl+actionUrl,_request,this.options)
      .map(res => res.json());
  }
  getBlogCategory()
  {
    let _request= {};
    return this.http.post(this.rootUrl+'getBlogCategories',_request,this.options)
      .map(res => res.json());
  }
  getTagsList(tagsInput)
  {
   // let _request= {};
    return this.http.get(this.rootUrl+'getBlogTags/'+tagsInput,this.options)
      .map(res => res.json());
  }
  manageblogs(searchCategory,searchText,searchstatus) {  
   let _request= {"search":{"title":searchText,"status":searchstatus,"category":searchCategory,"posted_by":"others","author":this.user_id}};
    return this.http.post(this.rootUrl+'listBlog',_request,this.options)
      .map(res => res.json()); 
  }
  deleteBlog(blogId) {  
   let _request= {"info":{"id":blogId}};
    return this.http.post(this.rootUrl+'deleteBlog',_request,this.options)
      .map(res => res.json()); 
  }
  manageBlogscroll(nextPageURL,searchCategory,searchText,searchstatus)
   {
   let _request= {"search":{"title":searchText,"status":searchstatus,"category":searchCategory,"posted_by":"others","author":this.user_id}};
    return this.http.post(nextPageURL,_request,this.options)
      .map(res => res.json()); 
   }
   getEditBlog(blogId)
   {   
      let _request= {};
    return this.http.post(this.rootUrl+'getBlog/'+blogId,_request,this.options)
      .map(res => res.json());      
   }
   getConnections(rootUrl){
       let _request= {};
       console.log(this.rootUrl+'getConnections');
    return this.http.post(this.rootUrl+'getConnections',_request,this.options)
      .map(res => res.json()); 
   }

   shareBlog(BlogId,friendsID,description,selectedCommunity){
   if(selectedCommunity != ""){
    let _request={"friends":{"addType":"Communities","comm_id":selectedCommunity,"description":description},"shareurl":this.rootUrl+'/#/blog/details/'+BlogId}  
    return this.http.post(this.rootUrl+'shareblog',_request,this.options)
      .map(res => res.json()); 
     }
     else{
      let _request= {'friends':{"addType":"Friends",'user_id':friendsID,'description':description},'shareurl':this.rootUrl+'/#/blog/details/'+BlogId};
       return this.http.post(this.rootUrl+'shareblog',_request,this.options)
      .map(res => res.json()); 
     }
      }
  packageAvailAlert(selectedConnections,packId,service_quantity,location_id){
     let _request= {"packId": packId, "elderId": selectedConnections,"service_quantity":service_quantity,"locationId":location_id};
    return this.http.post(this.rootUrl+'packageAvailAlert',_request,this.options)
      .map(res => res.json()); 
      }
   getPackage(selectedConnections,packId,location_id){
    let _request= {"pack_id": packId, "dependent_id": selectedConnections,"location_id":location_id};
    return this.http.post(this.rootUrl+'availPackage',_request,this.options)
      .map(res => res.json()); 
   }
   getPackageselder(packId,location_id){
    let _request= {"pack_id": packId,"location_id":location_id};
    return this.http.post(this.rootUrl+'availPackage',_request,this.options)
      .map(res => res.json()); 
   }
   showErrorToast(error){
    if(error.status===401){
      this.showToast(JSON.parse(error._body).error);
    }
    else{
      this.showToast("Something went wrong");
    }
  }
  showToast(messageData){
    let toast = this.toastCtrl.create({
        message: messageData,
        position:"top",
        duration: 5000
      });

      toast.present();
   }
   showToaster(messageData){
    let toast = this.toastCtrl.create({
        message: messageData,
        position:"top",
        duration: 5000
      });
      toast.present();
   }
   presentConfirm(messageData) {
  let alert = this.alertCtrl.create({
    title: 'Response',
    message: messageData,
    buttons: [
    
      {
        text: 'Ok',
        handler: () => {
          console.log('Buy clicked');
        }
      }
    ]
  });
  alert.present();
}
}
