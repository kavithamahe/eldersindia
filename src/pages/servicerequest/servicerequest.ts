import { Component,ViewChild } from '@angular/core';
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
  constructor(public fileOpener :FileOpener,private transfer: FileTransfer,public http:Http,public platform:Platform,private file: File,public alertCtrl: AlertController,public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public loadingCtrl: LoadingController,public toastCtrl: ToastController,public serviceRequest:ServiceRequestService) {
  	this.paystatus = navParams.get("status");
    this.results = navParams.get("result");
    if(this.paystatus == "1"){
      this.showToaster(this.results);
    }
    this.storage.ready().then(() => {
  	  storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
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
  }
   downloadBlobToPDF(service) { 
        let loader = this.loadingCtrl.create({ content: "Please wait..." });     
      loader.present();
      this.serviceRequest.invoiceFromUser(service.sr_token,service.is_recreation_config).subscribe(
    res => {
      const blob = res.blob();
      const file = new Blob([blob], {type:'application/pdf'});
      const filename = 'invoice' + Date.now() + '.pdf';
  //     importedSaveAs(file, filename);
   loader.dismiss(); 

    var blobs = new Blob([blob], {type:'application/pdf'});
    console.log(blobs);
   
  let filePath =  this.file.externalApplicationStorageDirectory;

    //Write the file
    this.file.writeFile(filePath, filename, blobs, { replace: true }).then((fileEntry) => {
console.log(fileEntry);  
          console.log("File created!");          
          this.fileOpener.open(fileEntry.nativeURL, 'application/pdf')
            .then(() => {console.log(fileEntry.nativeURL);
              let url = fileEntry.nativeURL;
              console.log(url);
               const fileTransfer: FileTransferObject = this.transfer.create();

         var targetPath = cordova.file.externalRootDirectory + filename;

      cordova.plugins.DownloadManager.download(url,targetPath);
        fileTransfer.download(url, targetPath,  true ).then((entry) => {
         this.showToaster("Downloaded Succesfully"); 
        },
         (error) => {
          console.log("error");
        }); 
            })
            .catch(err => console.error('Error openening file: ' + err));
        })
          .catch((err) => {
            console.error("Error creating file: " + err);
            throw err;  
          });
 

  
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
    this.content.scrollToTop();
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
    this.servicecost = parseInt(pending_service_amount) + parseInt(additional_service_cost) - parseInt(prev_service_amount_balance);
 
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
          data.preferred_date = moment(data.preferred_date).format("DD-MM-YYYY");
          data.scheduled_date = moment(data.scheduled_date).format("DD-MM-YYYY");
          data.pendingserviceamount = parseFloat(data.pending_service_amount);
          data.additionalservicecost = parseFloat(data.additional_service_cost);
          data.prevserviceamountbalance = parseFloat(data.prev_service_amount_balance);
          this.paynowcost =  ((parseFloat(data.pending_service_amount) + parseFloat(data.additional_service_cost)) - parseFloat(data.prev_service_amount_balance));
         console.log("this.paynowcost" + this.paynowcost);
          this.paynowCosts = (parseFloat(data.pending_service_amount) + parseFloat(data.additional_service_cost) - parseFloat(data.prev_service_amount_balance));
               }
               
          this.serviceRequestInfo = dataList;
          console.log(this.serviceRequestInfo);
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
      console.log(this.serviceRequestInfo);
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
      this.getRemarksList=getRemarks.result.info.remark.data;       
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
    paid_amount,sr_token,coupon_id,pending_service_amount,vendor_name){
   
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
       if(this.paid_amount > this.utilized_service_cost){
          this.cancelCharges = service_cost * (this.percentage/100);
          if(this.service_remaing_cost > this.cancelCharges){
           this.dedaction_service_cost = this.service_remaing_cost - this.cancelCharges;
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
            if(this.percentage !='hours expired'){
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
                    this.prompt =null;     
                  }
          else{
            this.navCtrl.push(CancelrequestsPage,{"serviceId":serviceId,"service_cost":service_cost,"result":this.result,
              "service_type":service_type,"status":status,"txnid":txnid,"percentage":this.percentage,
              "totalcostofrecurring":this.totalcostofrecurring,"req_count":req_count,"paid_amount":this.paid_amount,
              "utilized_service_cost":this.utilized_service_cost,"recurring_request_id":recurring_request_id,"cancelCharges":this.cancelCharges,
              "dedaction_service_cost":this.dedaction_service_cost,"service_remaing_cost":this.service_remaing_cost,"final_payable_amount":this.final_payable_amount,
              "package_id":package_id,"sr_token":sr_token,"cancel_services":this.cancel_services,"balanceamount_to_pay":this.balanceamount_to_pay,
              "service_refund_amount":this.service_refund_amount,"actual_service_cost":this.actual_service_cost,"vendor_name":vendor_name,"refund_amount":this.refund_amount});
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
      if(this.payment_status == "payment_processing" || coupon_id != null){
        this.deductionamount = service_cost * this.percentage/100;
        this.servicecancelamount = service_cost - this.deductionamount;
        console.log(this.servicecancelamount);
      }
      else{
        this.deductionamount = paid_amount * this.percentage/100;
        this.servicecancelamount = paid_amount - this.deductionamount;
      }
      
     this.navCtrl.push(CancelrequestsPage,{"serviceId":serviceId,"service_cost":service_cost,"result":this.result,"service_type":service_type,"status":status,"txnid":txnid,
      "percentage":this.percentage,"payment_status":this.payment_status,"deductionamount":this.deductionamount,"servicecancelamount":this.servicecancelamount,"package_id":package_id,
      "Paymentstatus":Paymentstatus,"paid_amount":paid_amount,"sr_token":sr_token,"coupon_id":coupon_id,"pending_service_amount":pending_service_amount,"vendor_name":vendor_name});
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
  //   showConfirm(serviceId,hours,service_id,sub_category_id,status,servicediscountcost_one_service,service_type,txnid,id,service_cost,recurring_request_id,req_count,package_id,Paymentstatus,paid_amount,sr_token,coupon_id,pending_service_amount,vendor_name){
   
  //     if(hours == undefined){
  //       hours = "";
  //     }
  //     if(service_type == "Recurring"){
  //       this.totalcostofrecurring = service_cost * req_count;
  //       // this.totalcostofrecurring = paid_amount;
  //   this.serviceRequest.getcancelRecurringPolicyConfig(hours,service_id,sub_category_id,status,service_type,recurring_request_id,req_count,id).subscribe(
  //    (cancelRequest) => {
  //     this.result = cancelRequest.result;
  //     this.percentage = this.result.percentage;
  //     this.paid_amount = this.result.paid_amount;
  //     this.service_remaing_cost = this.result.service_remaing_cost;
  //     this.utilized_service_cost = this.result.utilized_service_cost;
  //     this.cancel_services = this.result.cancel_services;
  //     this.balanceamount_to_pay = this.result.balanceamount_to_pay;
  //     this.actual_service_cost = this.result.actual_service_cost;
  //     this.refund_amount = this.result.refund_amount;
  //      if(this.paid_amount > this.utilized_service_cost){
  //         this.cancelCharges = service_cost * (this.percentage/100);
  //         if(this.service_remaing_cost > this.cancelCharges){
  //          this.dedaction_service_cost = this.service_remaing_cost - this.cancelCharges;
  //         }else{
            
  //         }
  //       }
  //         else if(this.paid_amount == this.utilized_service_cost){
  //         this.cancelCharges = service_cost*(this.percentage/100);
  //        }else{
  //         this.cancelCharges = service_cost*(this.percentage/100);
  //         this.new_service_amount = this.utilized_service_cost + this.cancelCharges;
  //        this.final_payable_amount = (this.new_service_amount - this.paid_amount).toFixed(2);
  //        }  
  //           if(this.percentage !='hours expired'){
  //            if(this.balanceamount_to_pay !=0 && this.cancel_services!=1){

  //               this.dedaction_amount = Math.floor(this.actual_service_cost*(this.percentage/100)).toFixed(2);    
  //               this.final_payable_amount = parseFloat(this.balanceamount_to_pay) + parseFloat(this.dedaction_amount);
  //            }
  //            else if(this.cancel_services == 1){
  //               this.dedaction_amount = Math.floor(this.actual_service_cost*(this.percentage/100)).toFixed(2);    
  //               this.service_refund_amount = parseFloat(this.refund_amount) - parseFloat(this.dedaction_amount);
  //            }


  //       }else{

  //         this.final_payable_amount = (this.new_service_amount - this.paid_amount).toFixed(2);
  //       this.dedaction_service_cost = parseFloat(this.paid_amount).toFixed(2);

  //       }
  //     // this.deduction_amount=servicediscountcost_one_service * (this.result / 100);
  //     // this.dedaction_service_cost = servicediscountcost_one_service - this.deduction_amount;
  //     // var number = parseFloat(this.dedaction_service_cost).toFixed(2);
  //      if(this.prompt){ 
  //                   this.prompt.dismiss();
  //                   this.prompt =null;     
  //                 }
  //         else{
  //     this.showConfirms(serviceId,service_cost,this.result,service_type,status,txnid,this.percentage,this.totalcostofrecurring,req_count,this.paid_amount,this.utilized_service_cost,recurring_request_id,this.cancelCharges,this.dedaction_service_cost,this.service_remaing_cost,this.final_payable_amount,package_id,sr_token,this.cancel_services,this.balanceamount_to_pay,this.service_refund_amount,this.actual_service_cost,vendor_name,this.refund_amount); 
  //   }
  //   },
  //   (err) => { 
  //       if(err.status===401)
  //       {
  //       this.showToaster(JSON.parse(err._body).error);
  //       }
  //       else
  //       {
  //         this.showToaster("Try again later");
  //       }
  //     });
  // }
  // else{
  //   this.serviceRequest.getcancelPolicyConfig(hours,service_id,sub_category_id,status,id,service_type).subscribe(
  //    (cancelRequest) => {
  //     this.result = cancelRequest.result;  
  //     this.percentage = this.result.percentage;
  //     this.payment_status = this.result.payment_status;
  //     if(this.payment_status == "payment_processing" || coupon_id != null){
  //       this.deductionamount = service_cost * this.percentage/100;
  //       this.servicecancelamount = service_cost - this.deductionamount;
  //       console.log(this.servicecancelamount);
  //     }
  //     else{
  //       this.deductionamount = paid_amount * this.percentage/100;
  //       this.servicecancelamount = paid_amount - this.deductionamount;
  //     }
      
  //      if(this.prompt){ 
  //                   this.prompt.dismiss();
  //                   this.prompt =null;     
  //                 }
  //     else{
  //     this.showOnetime(serviceId,service_cost,this.result,service_type,status,txnid,this.percentage,this.payment_status,this.deductionamount,this.servicecancelamount,package_id,Paymentstatus,paid_amount,sr_token,coupon_id,pending_service_amount); 
  //   }
  //   },
  //   (err) => { 
  //       if(err.status===401)
  //       {
  //         this.showToaster(JSON.parse(err._body).error);
  //       }
  //       else
  //       {
  //         this.showToaster("Try again later");
  //       }
  //     });
  // }
  // }
  // showConfirms(serviceId,service_cost,result,service_type,status,txnid,percentage,totalcostofrecurring,req_count,paid_amount,utilized_service_cost,recurring_request_id,cancelCharges,dedaction_service_cost,service_remaing_cost,final_payable_amount,package_id,sr_token,cancel_services,balanceamount_to_pay,service_refund_amount,
  //   actual_service_cost,vendor_name,refund_amount){
  //   if(cancel_services > 1 && package_id != 1){
  //       this.prompt = this.alertCtrl.create({
  //     title: sr_token,
  //     message: "Total services requests :"+ req_count +
  //     " and Total cost of the recurring : <i class='fa fa-rupee'></i>"+ parseFloat(actual_service_cost).toFixed(2) +
  //     " and Cost of remaining SRs : <i class='fa fa-rupee'></i>"+utilized_service_cost+
  //     " and Total Paid Amount : <i class='fa fa-rupee'></i>"+ Math.floor(paid_amount).toFixed(2)+
  //     " and Cancellation fee : <i class='fa fa-rupee'></i>"+(Math.floor(paid_amount*percentage/100)/req_count).toFixed(2)+
  //     // " and Balance amount : <i class='fa fa-rupee'></i>"+ parseFloat(balanceamount_to_pay).toFixed(2) +
  //     " and service cancellation percentage : "+ percentage + "% ",

  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'Comments'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //         }
  //       },
  //       {
  //         text: 'Confirm',
  //         handler: data => {
  //           if(data.title == ""){
  //             this.showToaster("Please enter the reason");
  //              return false;
  //           }
  //           else{
  //          this.cancelRequest(data.title,serviceId,service_type,txnid,paid_amount,utilized_service_cost,percentage,recurring_request_id,cancelCharges,dedaction_service_cost,service_remaing_cost,req_count,package_id,balanceamount_to_pay,((paid_amount*percentage/100)/req_count),cancel_services);
  //         }
  //         }
  //       }
  //     ]
  //   });
  //   this.prompt.present();
  //   }
  //    else if(balanceamount_to_pay!=0 && cancel_services!=1 && percentage!='hours expired' && package_id != 1){
  //       this.prompt = this.alertCtrl.create({
  //     title: sr_token,
  //     message: "Total services requests :"+ req_count +
  //     " and Total cost of the recurring : <i class='fa fa-rupee'></i>"+ parseFloat(actual_service_cost).toFixed(2) +
  //     " and Total Paid Amount : <i class='fa fa-rupee'></i>"+ Math.floor(paid_amount).toFixed(2)+
  //     " and Cancellation fee : <i class='fa fa-rupee'></i>"+ Math.floor(totalcostofrecurring*percentage/100).toFixed(2)+
  //     " and Balance amount : <i class='fa fa-rupee'></i>"+ parseFloat(balanceamount_to_pay).toFixed(2) +
  //     " and service cancellation percentage : "+ percentage + "% ",

  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'Comments'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //         }
  //       },
  //       {
  //         text: 'Confirm',
  //         handler: data => {
  //           if(data.title == ""){
  //             this.showToaster("Please enter the reason");
  //              return false;
  //           }
  //           else{
  //          this.cancelRequest(data.title,serviceId,service_type,txnid,paid_amount,utilized_service_cost,percentage,recurring_request_id,cancelCharges,dedaction_service_cost,service_remaing_cost,req_count,package_id,balanceamount_to_pay,totalcostofrecurring*percentage/100,cancel_services);
  //         }
  //         }
  //       }
  //     ]
  //   });
  //   this.prompt.present();
  //    }
  //    else if(cancel_services==1 && package_id != 1){
  //     this.prompt = this.alertCtrl.create({
  //     title: sr_token,
  //     message: "Total services requests :"+ req_count +
  //     " and Total cost of the recurring : <i class='fa fa-rupee'></i>"+ parseFloat(actual_service_cost).toFixed(2) +
  //     " and Total Paid Amount : <i class='fa fa-rupee'></i>"+ Math.floor(paid_amount).toFixed(2)+
  //     " and Cancellation fee : <i class='fa fa-rupee'></i>"+ Math.floor((paid_amount*percentage/100)/req_count).toFixed(2)+
  //     " and Refund on cancellation : <i class='fa fa-rupee'></i>"+ Math.floor(refund_amount - ((paid_amount*percentage/100)/req_count)).toFixed(2)+
  //     " and service cancellation percentage : "+ percentage + "% ",

  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'Comments'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //         }
  //       },
  //       {
  //         text: 'Confirm',
  //         handler: data => {
  //           if(data.title == ""){
  //             this.showToaster("Please enter the reason");
  //              return false;
  //           }
  //           else{
  //          this.cancelRequest(data.title,serviceId,service_type,txnid,paid_amount,utilized_service_cost,percentage,recurring_request_id,cancelCharges,dedaction_service_cost,service_remaing_cost,req_count,package_id,balanceamount_to_pay,((paid_amount*percentage/100)/req_count),cancel_services);
  //         }
  //         }
  //       }
  //     ]
  //   });
  //   this.prompt.present();
    
  //   }
  //   else if(package_id == 1){
  //       this.prompt = this.alertCtrl.create({
  //     title: sr_token,
  //     message: "Service provider name :"+ vendor_name +"",

  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'Comments'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //         }
  //       },
  //       {
  //         text: 'Confirm',
  //         handler: data => {
  //           if(data.title == ""){
  //             this.showToaster("Please enter the reason");
  //              return false;
  //           }
  //           else{
  //          this.updateServiceReceiveStatus(data.title,serviceId,service_type);
  //         }
  //         }
  //       }
  //     ]
  //   });
  //   this.prompt.present();
  //   }
  // }
  // showOnetime(serviceId,service_cost,result,service_type,status,txnid,percentage,payment_status,deductionamount,servicecancelamount,package_id,Paymentstatus,paid_amount,sr_token,coupon_id,pending_service_amount){
  //   console.log(pending_service_amount);
  //  if(percentage == "hours expired"){
  //       this.prompt = this.alertCtrl.create({
  //     title: sr_token,
  //     // message: "Service cost : <i class='fa fa-rupee'></i>"+ parseFloat(pending_service_amount).toFixed(2) +"<br> and Service cancellation percentage :"+ percentage +" % ",
  //     message: "Token Id : "+ sr_token ,
  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'Comments'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //         }
  //       },
  //       {
  //         text: 'Confirm',
  //         handler: data => {
  //           if(data.title == ""){
  //             this.showToaster("Please enter the reason");
  //              return false;
  //           }
  //           else{
  //             this.updateServiceReceiveStatus(data.title,serviceId,service_type);
  //           // this.razorPaymentResponseforCancel(data.title,serviceId,service_type,txnid,percentage,payment_status,deductionamount,servicecancelamount,package_id);
  //         }
  //         }
  //       }
  //     ]
  //   });
  //   this.prompt.present();
  //  }
  //  else{
  //   if(Paymentstatus == null){
  //   if(pending_service_amount == 0){
  //      this.prompt = this.alertCtrl.create({
  //     title: sr_token,
  //     // message: "Service cost : <i class='fa fa-rupee'></i>"+ parseFloat(pending_service_amount).toFixed(2) +"<br> and Service cancellation percentage :"+ percentage +" % ",
  //     message: "Token Id : "+ sr_token ,
  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'Comments'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //         }
  //       },
  //       {
  //         text: 'Confirm',
  //         handler: data => {
  //           if(data.title == ""){
  //             this.showToaster("Please enter the reason");
  //              return false;
  //           }
  //           else{
  //             this.updateServiceReceiveStatus(data.title,serviceId,service_type);
  //           // this.razorPaymentResponseforCancel(data.title,serviceId,service_type,txnid,percentage,payment_status,deductionamount,servicecancelamount,package_id);
  //         }
  //         }
  //       }
  //     ]
  //   });
  //   this.prompt.present();
  //   }
  //   else{
  //      this.prompt = this.alertCtrl.create({
  //     title: sr_token,
  //     message: "Service cost : <i class='fa fa-rupee'></i>"+ parseFloat(pending_service_amount).toFixed(2) +"<br> and Service cancellation percentage :"+ percentage +" % ",
  //     // message: "Token Id : "+ sr_token ,
  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'Comments'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //         }
  //       },
  //       {
  //         text: 'Confirm',
  //         handler: data => {
  //           if(data.title == ""){
  //             this.showToaster("Please enter the reason");
  //              return false;
  //           }
  //           else{
  //             // this.updateServiceReceiveStatus(data.title,serviceId,service_type);
  //           this.razorPaymentResponseforCancel(data.title,serviceId,service_type,txnid,percentage,payment_status,deductionamount,servicecancelamount,package_id);
  //         }
  //         }
  //       }
  //     ]
  //   });
  //   this.prompt.present();
  //   }
       
  // }
  // else{
  //   if(coupon_id == null){
  //     let percentages = ((100 - percentage));
  //     console.log(percentages);
  //      this.prompt = this.alertCtrl.create({
  //     title: sr_token,
  //     // message: "Service cost :  <i class='fa fa-rupee'></i>"+ parseFloat(paid_amount).toFixed(2) +"<br> and Service cancellation percentage :"+ percentage +" % and Service cancellation deduction : <i class='fa fa-rupee'></i>"+ parseFloat(deductionamount).toFixed(2)+" and Service refund amount : <i class='fa fa-rupee'></i>"+ parseFloat(servicecancelamount).toFixed(2)+" ",
  //     message: "Service cost :  <i class='fa fa-rupee'></i>"+ parseFloat(paid_amount).toFixed(2) +"<br> and Service cancellation percentage :"+ percentage +" and Service refund amount : <i class='fa fa-rupee'></i>"+ Math.floor(paid_amount * percentages/100).toFixed(2) +" ",

  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'Comments'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //         }
  //       },
  //       {
  //         text: 'Confirm',
  //         handler: data => {
  //           if(data.title == ""){
  //             this.showToaster("Please enter the reason");
  //              return false;
  //           }
  //           else{
  //           this.razorPaymentResponseforCancel(data.title,serviceId,service_type,txnid,percentage,payment_status,(paid_amount -(paid_amount * this.percentage/100)),Math.floor(paid_amount * this.percentage/100).toFixed(2),package_id);
  //         }
  //         }
  //       }
  //     ]
  //   });
  //   this.prompt.present();
  //   }
  //   else{
  //     this.percentage = (100 - percentage);
  //     console.log(this.percentage);
  //      this.prompt = this.alertCtrl.create({
  //     title: sr_token,
  //     message: "Service cost :  <i class='fa fa-rupee'></i>"+ parseFloat(paid_amount).toFixed(2) +"<br> and Service cancellation percentage :"+ percentage +" and Service refund amount : <i class='fa fa-rupee'></i>"+ Math.floor(paid_amount * this.percentage/100).toFixed(2)+" ",
  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'Comments'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //         }
  //       },
  //       {
  //         text: 'Confirm',
  //         handler: data => {
  //           if(data.title == ""){
  //             this.showToaster("Please enter the reason");
  //              return false;
  //           }
  //           else{
  //           this.razorPaymentResponseforCancel(data.title,serviceId,service_type,txnid,percentage,payment_status,(paid_amount -(paid_amount * this.percentage/100)),Math.floor(paid_amount * this.percentage/100).toFixed(2),package_id);
  //         }
  //         }
  //       }
  //     ]
  //   });
  //   this.prompt.present();
  //   } 
  // }
  //  }
  
    
  // }
  // updateServiceReceiveStatus(title,serviceId,service_type){
  //   let loader = this.loadingCtrl.create({ content: "Please wait..." });     
  //   loader.present();
  //   this.serviceRequest.updateServiceReceiveStatus(title,serviceId,service_type).subscribe(
  //    (cancelRequest) => { 
  //     this.showToaster(cancelRequest.result); 
  //     loader.dismiss(); 
  //     this.onInit();   
  //   },
  //   (err) => { 
  //       if(err.status===401)
  //       {
  //         this.showToaster(JSON.parse(err._body).error);
  //       }
  //       else
  //       {
  //         this.showToaster("Try again later");
  //       }
  //       loader.dismiss();
  //     });
  // }
 
  // public cancelRequest(title,serviceId,service_type,txnid,paid_amount,utilized_service_cost,percentage,recurring_request_id,cancelCharges,dedaction_service_cost,service_remaing_cost,req_count,package_id,balanceamount_to_pay,deductionamounts,cancel_services)
  // {
  //   let loader = this.loadingCtrl.create({ content: "Please wait..." });     
  //   loader.present();
  //   this.payableamount = (balanceamount_to_pay + deductionamounts);
  //   this.serviceRequest.cancelRequest(title,serviceId,service_type,txnid,paid_amount,utilized_service_cost,percentage,recurring_request_id,cancelCharges,dedaction_service_cost,service_remaing_cost,req_count,package_id,balanceamount_to_pay,deductionamounts,this.payableamount,cancel_services).subscribe(
  //    (cancelRequest) => {
  //     this.getRemarksList=cancelRequest.result;   
  //     this.showToaster(cancelRequest.result); 
  //     loader.dismiss(); 
  //     this.onInit();   
  //   },
  //   (err) => { 
  //       if(err.status===401)
  //       {
  //        this.showToaster(JSON.parse(err._body).error);
  //       }
  //       else
  //       {
  //         this.showToaster("Try again later");
  //       }
  //       loader.dismiss();
  //     });
  // }
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
  submitRemark(serviceId)
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
    this.serviceRequest.submitRemark(serviceId,this.rating,this.remarks,this.other).subscribe(
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
    console.log("kavitha");
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
    console.log(sr_token);
    this.navCtrl.push(RecurringPagePage,{"sr_token":sr_token});
  }
}
