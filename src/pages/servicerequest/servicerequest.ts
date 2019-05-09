import { Component,ViewChild,ElementRef } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController, NavParams, LoadingController,ToastController,AlertController,ModalController,Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CallNumber } from 'ionic-native';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { FileOpener } from '@ionic-native/file-opener';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import {saveAs as importedSaveAs} from "file-saver";

import { ServiceRequestService } from '../../providers/service-request-service';
import { ViewServiceRequestPage } from '../../pages/view-service-request/view-service-request';
import { DashboardPage } from '../../pages/dashboard/dashboard';
 import { PackagepaymentPagePage } from '../../pages/packagepayment/packagepayment';
 import { RecurringPagePage } from '../../pages/recurring/recurring';
 import { CancelrequestsPage } from '../../pages/cancelrequests/cancelrequests';

import moment from 'moment';

declare var cordova: any;



/*
  Generated class for the Servicerequest page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-servicerequest',
  templateUrl: 'servicerequest.html',
  providers:[ServiceRequestService]
})
export class ServicerequestPage {
    @ViewChild(Content) content: Content;
imageUrl:any;
token:any;
status:any="";
serviceRequestInfo:any=[];
showRemark:any=null;
rating:number=0;
remarks:string='';
nextPageURL:any='';
getRemarksList:any=[];
serviceRequestScrollLists:any=[];
vendorStatus:any=[];
servicestatus:any=[];
sr_token:any;
searchEvent:any="";
sortby:any="";
other:any;
result:any;
deduction_amount:any;
dedaction_service_cost:any;
payment_status:any;
percentage:any;
deductionamount:any;
servicecancelamount:any;
servicecost:any;
totalcostofrecurring:any;
paid_amount:any;
utilized_service_cost:any;
cancelCharges:any;
service_remaing_cost:any;
new_service_amount:any;
final_payable_amount:any;
paystatus:any;
results:any;
user_type:any;
get_participants:any=[];
preferred_date:any;
scrollTop:boolean = false;
paynowcost:any;
paynowCosts:any;
prompt:any;
cancel_services:any;
balanceamount_to_pay:any;
actual_service_cost:any;
dedaction_amount:any;
service_refund_amount:any;
refund_amount:any;
payableamount:any;
getinvoicefile:any;
headers:any;
options:any;
private lastScrollTop: number = 0;
private direction: string = "";
  constructor(public fileOpener :FileOpener,private transfer: FileTransfer,public http:Http,public platform:Platform,private file: File,public alertCtrl: AlertController,public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public loadingCtrl: LoadingController,public toastCtrl: ToastController,public serviceRequest:ServiceRequestService) {
  	this.paystatus = navParams.get("status");
    this.results = navParams.get("result");
    if(this.paystatus == "1"){
      this.showToaster(this.results);
    }
    this.storage.ready().then(() => {
  	  storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;
       storage.get('user_type').then((user_type) => { this.user_type=user_type; 
      console.log(this.user_type); })
      storage.get('token').then((token) => { this.token=token; 
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
    this.options = new RequestOptions({ headers: this.headers});
      this.sr_token=navParams.get("sr_token");
      if(navParams.get("sr_token")){
        this.onInits();
      }
      else{
        this.onInit(); 
      }
  		
      this.getRemarks();
      })
    });
  	});
  }
   downloadBlobToPDF(service) { 
        let loader = this.loadingCtrl.create({ content: "Please wait..." });     
      loader.present();
      this.serviceRequest.invoiceFromUser(service.sr_token,service.is_recreation_config).subscribe(
    res => {
      // console.log(res);
      const blob = res.blob();
      const file = new Blob([blob], {type:'application/pdf'});
      const filename = 'invoice' + Date.now() + '.pdf';
      // importedSaveAs(file, filename);
   loader.dismiss(); 

    var blobs = new Blob([blob], {type:'application/pdf'});
    // console.log(blobs);
   
  let filePath =  this.file.externalApplicationStorageDirectory;

  // .....................IOS....................
  // let filePath =  cordova.file.dataDirectory;
  // ...............................................

    //Write the file
    this.file.writeFile(filePath, filename, blobs, { replace: true }).then((fileEntry) => {
// console.log(fileEntry);  
          // console.log("File created!");          
          this.fileOpener.open(fileEntry.nativeURL, 'application/pdf')
            .then(() => {
              // console.log(fileEntry.nativeURL);
              let url = fileEntry.nativeURL;
              // console.log(url);
               const fileTransfer: FileTransferObject = this.transfer.create();

         var targetPath = cordova.file.externalRootDirectory + filename;

      cordova.plugins.DownloadManager.download(url,targetPath);
        fileTransfer.download(url, targetPath,  true ).then((entry) => {
         this.showToaster("Downloaded Succesfully"); 
        },
         (error) => {
        }); 
            })
            .catch(err => console.error('Error openening file: ' + err));
        })
          .catch((err) => {
            console.error("Error creating file: " + err);
            throw err;  
          });
   },
    (err) => { 
      loader.dismiss(); 
        if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
      })  
   
}

  doRefresh(refresher) {
   this.storage.ready().then(() => {
      this.storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
       this.storage.get('user_type').then((user_type) => { this.user_type=user_type; 
      console.log(this.user_type); })
      this.storage.get('token').then((token) => { this.token=token; 
      this.sr_token=this.navParams.get("sr_token");
      if(this.navParams.get("sr_token")){
        this.onInits();
      }
      else{
       this.onInit(); 
      }
      
      this.getRemarks();
      })
    });

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  scrollToTop() {
    this.content.scrollToTop(300);
  }
  scrollToBottom(){
    this.content.scrollToBottom();
  }
  getparticipants(service){
    this.serviceRequest.travelServiceMemberList(service.id).subscribe(
     (serviceRequest) => {
      this.get_participants=serviceRequest.result;
      this.toggleDetails(service);
    },
    (err) => { 
        if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
      }
    ); 
  }
  toggleDetails(service) {
    if (service.showDetails) {
        service.showDetails = false;
    } else {
        service.showDetails = true;
    }
  }
  onInitstatus(){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    //this.serviceRequestInfo =[];
    this.serviceRequest.serviceRequestStatus(this.searchEvent,this.status,this.sortby).subscribe(
     (serviceRequest) => {
      this.serviceRequestInfo=serviceRequest.result.info.list.data; 
       var dataList=serviceRequest.result.info.list.data;
        for(let data of dataList) {
          data.preferred_date = moment(data.preferred_date).format("DD-MM-YYYY");
          data.scheduled_date = moment(data.scheduled_date).format("DD-MM-YYYY");
          data.pendingserviceamount = parseFloat(data.pending_service_amount);
          data.additionalservicecost = parseFloat(data.additional_service_cost);
          data.prevserviceamountbalance = parseFloat(data.prev_service_amount_balance);
          this.paynowcost =  (parseFloat(data.pending_service_amount) + parseFloat(data.additional_service_cost) - parseFloat(data.prev_service_amount_balance));
          this.paynowCosts = (parseFloat(data.pending_service_amount) + parseFloat(data.additional_service_cost) - parseFloat(data.prev_service_amount_balance));
        }
        this.serviceRequestInfo = dataList;
        this.vendorStatus=serviceRequest.result.info.status;
        this.servicestatus=serviceRequest.result.info.status;
        this.nextPageURL=serviceRequest.result.info.list.next_page_url;  
      loader.dismiss();    
    },
    (err) => { 
      this.serviceRequestInfo =[];
        if(err.status===401)
        {
        this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
        loader.dismiss();
      }
    ); 
  }
  payOptionforAdditionalServiceCost(sr_token,id,additional_service_cost,payment_status,service_type){
     this.navCtrl.push(PackagepaymentPagePage,{"sr_token":sr_token,"service_cost":additional_service_cost,"service_id":id,"payment_status":payment_status,"status":"1","service_type":service_type});
  }
  payOptionforpendingPayment(sr_token,pending_service_amount,id,additional_service_cost,payment_status,prev_service_amount_balance,type){
      if(payment_status == 'payment_success'){
   this.servicecost = pending_service_amount;
  }else{
    this.servicecost = parseFloat(pending_service_amount) + parseFloat(additional_service_cost) - parseFloat(prev_service_amount_balance);
  console.log(this.servicecost);
  }
     this.navCtrl.push(PackagepaymentPagePage,{"sr_token":sr_token,"service_cost":this.servicecost,"service_id":id,"payment_status":payment_status,"pending_service_amount":pending_service_amount,"prev_service_amount_balance":prev_service_amount_balance,"additional_service_cost":additional_service_cost,"paymentType":type});
  }

  public onInit()
  {
  	let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    //this.serviceRequestInfo =[];
    this.serviceRequest.serviceRequestList(this.searchEvent,this.status,this.sortby).subscribe(
     (serviceRequest) => {
      this.serviceRequestInfo=serviceRequest.result.info.list.data; 
       var dataList=serviceRequest.result.info.list.data;
        for(let data of dataList) {
          // this.imagePath = normalizeURL(serviceRequest.result.info.list.data);
          //  return path;
          data.preferred_date = moment(data.preferred_date).format("DD-MM-YYYY");
          data.scheduled_date = moment(data.scheduled_date).format("DD-MM-YYYY");
          data.pendingserviceamount = parseFloat(data.pending_service_amount);
          data.additionalservicecost = parseFloat(data.additional_service_cost);
          data.prevserviceamountbalance = parseFloat(data.prev_service_amount_balance);
          this.paynowcost =  ((parseFloat(data.pending_service_amount) + parseFloat(data.additional_service_cost)) - parseFloat(data.prev_service_amount_balance));
          this.paynowCosts = (parseFloat(data.pending_service_amount) + parseFloat(data.additional_service_cost) - parseFloat(data.prev_service_amount_balance));
               }
               
          this.serviceRequestInfo = dataList;
          this.vendorStatus=serviceRequest.result.info.status;
          this.servicestatus=serviceRequest.result.info.status;
          this.nextPageURL=serviceRequest.result.info.list.next_page_url;  
          loader.dismiss();    
    },
    (err) => { 
      this.serviceRequestInfo =[];
        if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
        loader.dismiss();
      }
    );    
  }
  public onInits()
  {
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.serviceRequestInfo =[];
    this.serviceRequest.serviceRequestLists(this.sr_token,this.searchEvent,this.status,this.sortby).subscribe(
     (serviceRequest) => {
      this.serviceRequestInfo=serviceRequest.result.info.list.data; 
       var dataList=serviceRequest.result.info.list.data;
        for(let data of dataList) {
          data.preferred_date = moment(data.preferred_date).format("DD-MM-YYYY");
          data.scheduled_date = moment(data.scheduled_date).format("DD-MM-YYYY");
          data.pendingserviceamount = parseFloat(data.pending_service_amount);
          data.additionalservicecost = parseFloat(data.additional_service_cost);
          data.prevserviceamountbalance = parseFloat(data.prev_service_amount_balance);
          this.paynowcost =  (parseFloat(data.pending_service_amount) + parseFloat(data.additional_service_cost) - parseFloat(data.prev_service_amount_balance));
          this.paynowCosts = (parseFloat(data.pending_service_amount) + parseFloat(data.additional_service_cost) - parseFloat(data.prev_service_amount_balance));
        }
      this.serviceRequestInfo = dataList;
      this.vendorStatus=serviceRequest.result.info.status;
      this.servicestatus=serviceRequest.result.info.status;
      this.nextPageURL=serviceRequest.result.info.list.next_page_url;  
      loader.dismiss();    
    },
    (err) => { 
      this.serviceRequestInfo =[];
        if(err.status===401)
        {
        this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
        loader.dismiss();
      }
    );    
  }
  public getItems(searchEvent) {
    this.searchEvent = searchEvent;
    this.onInit();
      // this.serviceRequest.searchConnection(term).subscribe(searchConnection => {
      //   this.serviceRequestInfo= searchConnection.result.info.list.data;
      // });
  }
  public getRemarks()
  {
    this.serviceRequest.getRemarks().subscribe(
     (getRemarks) => {
      this.getRemarksList=getRemarks.result.info.remark;       
    },
    (err) => { 
        if(err.status===401)
        {
        // this.showToaster(JSON.parse(err._body).error);
        }
        
      }
    );
  }
   showConfirmcancel(serviceId,hours,service_id,sub_category_id,status,servicediscountcost_one_service,
    service_type,txnid,id,service_cost,recurring_request_id,req_count,package_id,Paymentstatus,
    paid_amount,sr_token,coupon_id,pending_service_amount,vendor_name,is_recreation_config,payment_status,coupon_offer){
   
          if(hours == undefined){
        hours = "";
      }
      if(service_type == "Recurring"){
        this.totalcostofrecurring = service_cost * req_count;
        // this.totalcostofrecurring = paid_amount;
        let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.serviceRequest.getcancelRecurringPolicyConfig(hours,service_id,sub_category_id,status,service_type,recurring_request_id,req_count,id).subscribe(
     (cancelRequest) => {
      this.result = cancelRequest.result;
      this.percentage = this.result.percentage;
      this.paid_amount = this.result.paid_amount;
      this.service_remaing_cost = this.result.service_remaing_cost;
      this.utilized_service_cost = this.result.utilized_service_cost;
      this.cancel_services = this.result.cancel_services;
      this.balanceamount_to_pay = this.result.balanceamount_to_pay;
      this.actual_service_cost = this.result.actual_service_cost;
      this.refund_amount = this.result.refund_amount;
      loader.dismiss();

      //   if(this.percentage !='hours expired'){
      //    if(this.paid_amount > this.utilized_service_cost){
      //     this.dedaction_amount = service_cost * (this.percentage/100).toFixed(2);
      //     console.log(this.dedaction_amount);
      //     if(this.service_remaing_cost > this.dedaction_amount){
      //       this.dedaction_service_cost = parseFloat(this.service_remaing_cost - this.dedaction_amount).toFixed(2);
      //     console.log(this.dedaction_service_cost);
      //     }else{
            
      //     }
      //    }else if(this.paid_amount == this.utilized_service_cost){
      //     this.dedaction_amount = service_cost * (this.percentage/100).toFixed(2);
      //    }else{
      //     this.dedaction_amount   = service_cost * (this.reduction_percentage/100).toFixed(2);
      //     this.new_service_amount = this.utilized_service_cost + this.dedaction_amount;
      //     this.final_payable_amount = (this.new_service_amount - this.paid_amount).toFixed(2);
      //     // this.service_type = response.data.result.service_type;
      //    }  
      // }else{
      //   this.final_payable_amount = (this.new_service_amount - this.paid_amount).toFixed(2);
      //   this.dedaction_service_cost = parseFloat(this.paid_amount).toFixed(2);
      //   console.log(this.dedaction_service_cost);
      // }

       if(this.paid_amount > this.utilized_service_cost){
          this.cancelCharges = service_cost * (this.percentage/100);
          if(this.service_remaing_cost > this.cancelCharges){
           this.dedaction_service_cost = this.service_remaing_cost - this.cancelCharges;
           console.log(this.dedaction_service_cost);
          }else{
            
          }
        }
          else if(this.paid_amount == this.utilized_service_cost){
          this.cancelCharges = service_cost*(this.percentage/100);
         }else{
          this.cancelCharges = service_cost*(this.percentage/100);
          this.new_service_amount = this.utilized_service_cost + this.cancelCharges;
          this.final_payable_amount = (this.new_service_amount - this.paid_amount).toFixed(2);
         }  
            if(this.percentage != 'hours expired'){
             if(this.balanceamount_to_pay !=0 && this.cancel_services!=1){
                this.dedaction_amount = Math.floor(this.actual_service_cost*(this.percentage/100)).toFixed(2);    
                this.final_payable_amount = parseFloat(this.balanceamount_to_pay) + parseFloat(this.dedaction_amount);
             }
             else if(this.cancel_services == 1){
                this.dedaction_amount = Math.floor(this.actual_service_cost*(this.percentage/100)).toFixed(2);    
                this.service_refund_amount = parseFloat(this.refund_amount) - parseFloat(this.dedaction_amount);
             }
        }else{

          this.final_payable_amount = (this.new_service_amount - this.paid_amount).toFixed(2);
        this.dedaction_service_cost = parseFloat(this.paid_amount).toFixed(2);
        }
          if(this.prompt){ 
                    this.prompt.dismiss();
                    this.prompt = null;     
                  }
          else{
            this.navCtrl.push(CancelrequestsPage,{"serviceId":serviceId,"service_cost":service_cost,"result":this.result,
              "service_type":service_type,"status":status,"txnid":txnid,"percentage":this.percentage,
              "totalcostofrecurring":this.totalcostofrecurring,"req_count":req_count,"paid_amount":this.paid_amount,
              "utilized_service_cost":this.utilized_service_cost,"recurring_request_id":recurring_request_id,"cancelCharges":this.cancelCharges,
              "dedaction_service_cost":this.dedaction_service_cost,"service_remaing_cost":this.service_remaing_cost,"final_payable_amount":this.final_payable_amount,
              "package_id":package_id,"sr_token":sr_token,"cancel_services":this.cancel_services,"balanceamount_to_pay":this.balanceamount_to_pay,
              "service_refund_amount":this.service_refund_amount,"actual_service_cost":this.actual_service_cost,"vendor_name":vendor_name,
              "refund_amount":this.refund_amount,"is_recreation_config":is_recreation_config,"payment_status":payment_status,"coupon_offer":coupon_offer});
    }
    },
    (err) => { 
      loader.dismiss();
        if(err.status===401)
        {
           this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
      });
  }
  else{
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.serviceRequest.getcancelPolicyConfig(hours,service_id,sub_category_id,status,id,service_type).subscribe(
     (cancelRequest) => {
      this.result = cancelRequest.result;  
      this.percentage = this.result.percentage;
      this.payment_status = this.result.payment_status;
      loader.dismiss();
      if(this.payment_status == "payment_processing"){
        this.deductionamount = (service_cost * this.percentage/100).toFixed(2);
        this.servicecancelamount = service_cost - this.deductionamount;
      }
      else{
        this.deductionamount = (paid_amount * this.percentage/100).toFixed(2);
        this.servicecancelamount = paid_amount - this.deductionamount;
      }
      
     this.navCtrl.push(CancelrequestsPage,{"serviceId":serviceId,"service_cost":service_cost,"result":this.result,"service_type":service_type,"status":status,"txnid":txnid,
      "percentage":this.percentage,"payment_status":this.payment_status,"deductionamount":this.deductionamount,"servicecancelamount":this.servicecancelamount,"package_id":package_id,
      "Paymentstatus":Paymentstatus,"paid_amount":paid_amount,"sr_token":sr_token,"coupon_id":coupon_id,"pending_service_amount":pending_service_amount,"vendor_name":vendor_name,"is_recreation_config":is_recreation_config,"coupon_offer":coupon_offer});
    },
    (err) => { 
      loader.dismiss();
        if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
      });
  }
   }

  public razorPaymentResponseforCancel(title,serviceId,service_type,txnid,percentage,payment_status,deductionamount,servicecancelamount,package_id)
  {
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.serviceRequest.razorPaymentResponseforCancel(title,serviceId,service_type,txnid,percentage,payment_status,deductionamount,servicecancelamount,package_id).subscribe(
     (cancelRequest) => {
      this.getRemarksList=cancelRequest.result;   
      this.showToaster(cancelRequest.result); 
      loader.dismiss(); 
      this.onInit();   
    },
    (err) => { 
        if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
        loader.dismiss();
      });
  }
  
  public viewRequest(serviceRequestId,service)
  {
     this.navCtrl.push(ViewServiceRequestPage, {serviceRequestId,service});
  }
  public showToaster(message)
  {
   let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
        });
   toast.present();
  }
  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
  enableRemark(eventId)
  {
    this.remarks='';
    this.rating=0;
    this.other = '';
   if(this.showRemark==eventId)
   {
     this.showRemark=null;
   }
   else
   {
     this.showRemark=eventId;
   }
  }
  submitRemark(serviceId,service_type,sr_token,recurring_request_id)
  {
    if(this.rating==0 && this.remarks=='')
    {
    this.showAlert('Please enter rating and remarks');
    }
    else if(this.rating==0)
    {
    this.showAlert('Please enter rating');
    }
    else if(this.remarks=='')
    {
    this.showAlert('Please enter remarks');
    }
    else
    { 
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.serviceRequest.submitRemark(serviceId,this.rating,this.remarks,this.other,service_type,sr_token,recurring_request_id).subscribe(
     (submitRemark) => {      
      this.showToaster(submitRemark.result);  
      this.remarks='';
      this.rating=0;  
      this.other = '';
      this.showRemark=null;  
      this.onInit(); 
      loader.dismiss(); 
    },
    (err) => { 
        if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
        loader.dismiss();
      }
    );    
  }
  }
  showAlert(errorMsg) {
    let alert = this.alertCtrl.create({
      title: 'Error Message',
      subTitle:errorMsg,
      buttons: ['OK']
    });
    alert.present();
  }
  doInfinite(infiniteScroll) {
   //     this.content.ionScrollEnd.subscribe((data) => {
   //    let currentScrollTop = data.scrollTop;
   //    if(currentScrollTop > this.lastScrollTop){
   //      this.direction = 'down';
   //    }else if(currentScrollTop < this.lastScrollTop){
   //      this.direction = 'up';
   //    }
   //    this.lastScrollTop = currentScrollTop;
   //     console.log("this.direction");
   // if(this.direction == "down"){
   //    this.scrollTop = true;
   //  }
   //  else{
   //    this.scrollTop = false;
   //  }
   //    console.log(this.direction);
   //  })
    setTimeout(() => {      
      if(this.nextPageURL!=null && this.nextPageURL!='')
      {
       this.serviceRequestScroll();
      }
      else{
        infiniteScroll.enable(false);
      }
      infiniteScroll.complete();
    }, 500);
  }
  serviceRequestScroll()
  {
    this.scrollTop = true;
     let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.serviceRequest.serviceRequestScroll(this.nextPageURL,this.searchEvent,this.status,this.sortby).subscribe(
     (serviceRequestScroll) => {
      this.serviceRequestScrollLists=serviceRequestScroll.result.info.list.data; 
       var dataList=serviceRequestScroll.result.info.list.data;
       loader.dismiss(); 
        for(let data of dataList) {
          data.preferred_date = moment(data.preferred_date).format("DD-MM-YYYY");
          data.scheduled_date = moment(data.scheduled_date).format("DD-MM-YYYY");
          data.pendingserviceamount = parseFloat(data.pending_service_amount);
          data.additionalservicecost = parseFloat(data.additional_service_cost);
          data.prevserviceamountbalance = parseFloat(data.prev_service_amount_balance);
          this.paynowcost =  (parseFloat(data.pending_service_amount) + parseFloat(data.additional_service_cost) - parseFloat(data.prev_service_amount_balance));
          this.paynowCosts = (parseFloat(data.pending_service_amount) + parseFloat(data.additional_service_cost) - parseFloat(data.prev_service_amount_balance));
        }
       for (let i = 0; i < Object.keys(this.serviceRequestScrollLists).length; i++) {
        this.serviceRequestInfo.push(dataList[i]);
        }
      
       this.nextPageURL=serviceRequestScroll.result.info.list.next_page_url;  
          
    },
    (err) => { 
      loader.dismiss(); 
        if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
      }
    );
     
  }
  public makeCall(number)
  {
    if(number)
    {
    CallNumber.callNumber(number, true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));
   }
   else
   {
    this.showToaster("There is no contact number");
   }
  }
  viewRecurring(sr_token){
    this.navCtrl.push(RecurringPagePage,{"sr_token":sr_token});
  }
}
