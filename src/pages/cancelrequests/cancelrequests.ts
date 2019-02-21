import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { ServiceRequestService } from '../../providers/service-request-service';
import { ServicerequestPage } from '../../pages/servicerequest/servicerequest';



/**
 * Generated class for the CancelrequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cancelrequests',
  templateUrl: 'cancelrequests.html',
  providers:[ServiceRequestService]
})
export class CancelrequestsPage {
serviceId:any;
service_cost:any;
result:any;
service_type:any;
status:any;
txnid:any;
percentage:any;
payment_status:any;
deductionamount:any;
servicecancelamount:any;
package_id:any;
Paymentstatus:any;
paid_amount:any;
sr_token:any;
coupon_id:any;
pending_service_amount:any;
comments:any;
refund_amount:any;
vendor_name:any;
totalcostofrecurring:any;
req_count:any;
utilized_service_cost:any;
recurring_request_id:any;
cancelCharges:any;
dedaction_service_cost:any;
cancel_services:any;
balanceamount_to_pay:any;
service_refund_amount:any;
actual_service_cost:any;
refund_amounts:any;
cancellationfees:any;
payableamount:any;
deductionamounts:any;
recurringrefund:any;
service_remaing_cost:any;
is_recreation_config:any;
refund_amountsrecurring:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,public loadingCtrl: LoadingController,public serviceRequest:ServiceRequestService) {
      this.service_type = navParams.get("service_type");
      if(this.service_type == "One time"){
          this.serviceId = navParams.get("serviceId");
      this.service_cost = navParams.get("service_cost");
      this.result = navParams.get("result");
      this.service_type = navParams.get("service_type");
      this.percentage = navParams.get("percentage");
      this.payment_status = navParams.get("payment_status");
      this.deductionamount = navParams.get("deductionamount");
      this.servicecancelamount = navParams.get("servicecancelamount");
      this.package_id = navParams.get("package_id");
      this.Paymentstatus = navParams.get("Paymentstatus");
      this.paid_amount = navParams.get("paid_amount");
      this.sr_token = navParams.get("sr_token");
      this.coupon_id = navParams.get("coupon_id");
      this.vendor_name = navParams.get("vendor_name");
      this.is_recreation_config = navParams.get("is_recreation_config");
      this.pending_service_amount = navParams.get("pending_service_amount");
      if(this.percentage == "hours expired"){
        this.percentage = "0";
      }
        let percentages = ((100 - this.percentage));
      this.refund_amount = (this.paid_amount * percentages/100);
 
      }
    else{
       this.txnid = navParams.get("txnid");
       this.paid_amount = navParams.get("paid_amount");
      this.totalcostofrecurring = navParams.get("totalcostofrecurring");
      this.req_count = navParams.get("req_count");
      this.utilized_service_cost = navParams.get("utilized_service_cost");
      this.recurring_request_id = navParams.get("recurring_request_id");
      this.cancelCharges = navParams.get("cancelCharges");
      this.dedaction_service_cost = navParams.get("dedaction_service_cost");
      this.package_id = navParams.get("package_id");
      this.sr_token = navParams.get("sr_token");
      this.service_remaing_cost = navParams.get("service_remaing_cost");
      this.cancel_services = navParams.get("cancel_services");
      this.balanceamount_to_pay = navParams.get("balanceamount_to_pay");
      this.service_refund_amount = navParams.get("service_refund_amount");
      this.actual_service_cost = navParams.get("actual_service_cost");
      this.vendor_name = navParams.get("vendor_name");
      this.refund_amounts = navParams.get("refund_amount");
      this.serviceId = navParams.get("serviceId");
      this.service_cost = navParams.get("service_cost");
      this.is_recreation_config = navParams.get("is_recreation_config");
      this.result = navParams.get("result");
      this.percentage = navParams.get("percentage");
      this.payment_status = navParams.get("payment_status");
        if(this.percentage == "hours expired"){ 
        this.percentage = "0";
      }
      this.refund_amountsrecurring = (this.dedaction_service_cost * this.percentage/100);
      this.recurringrefund=(this.refund_amounts - ((this.paid_amount * this.percentage/100)/this.req_count));
          if(this.cancel_services > 1 && this.package_id != 1){
    this.cancellationfees = ((this.actual_service_cost * this.percentage/100)/this.req_count);
    // this.cancellationfees = (this.utilized_service_cost * this.percentage/100);
    }
    if(this.cancel_services ==1 && this.package_id != 1){
    this.cancellationfees = ((this.paid_amount * this.percentage/100)/this.req_count);
  }
    if(this.balanceamount_to_pay!=0 && this.cancel_services!=1 && this.percentage!='hours expired' && this.package_id != 1){
      this.cancellationfees = (this.utilized_service_cost * this.percentage/100);
    }
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CancelrequestsPage');
  }
  cancel(){
  	this.navCtrl.pop();
  }
   public delete()
  {
    if(this.is_recreation_config == 1){
      this.deletezerocost();
    }
    else{
        if(this.comments == undefined || this.comments == ""){
      this.showToaster("Please Enter The Reason");
    }
    else{
      this.deductionamount = this.deductionamount.toString();
      this.servicecancelamount = this.servicecancelamount.toString();
      let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.serviceRequest.razorPaymentResponseforCancel(this.comments,this.serviceId,this.service_type,this.txnid,this.percentage,
      this.payment_status,this.deductionamount,this.servicecancelamount,this.package_id).subscribe(
     (cancelRequest) => {  
      this.showToaster(cancelRequest.result); 
      loader.dismiss(); 
      this.navCtrl.setRoot(ServicerequestPage);
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
    }
  
  }

    deletezerocost(){
       if(this.comments == undefined || this.comments == ""){
      this.showToaster("Please Enter The Reason");
    }
    else{
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.serviceRequest.updateServiceReceiveStatus(this.comments,this.serviceId,this.service_type,this.is_recreation_config).subscribe(
     (cancelRequest) => { 
      this.showToaster(cancelRequest.result); 
      loader.dismiss(); 
      this.navCtrl.setRoot(ServicerequestPage); 
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
  }

  public cancelRequestrecurring()
  {
      if(this.comments == undefined || this.comments == ""){
      this.showToaster("Please Enter The Reason");
    }
    else{
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    if(this.cancel_services > 1 && this.package_id != 1){
    this.deductionamounts = ((this.actual_service_cost * this.percentage/100)/this.req_count);
    }
    if(this.cancel_services==1 && this.package_id != 1){
    this.deductionamounts = ((this.paid_amount * this.percentage/100)/this.req_count);
  }
    // if(this.balanceamount_to_pay!=0 && this.cancel_services!=1 && this.percentage!='hours expired' && this.package_id != 1){
    //   this.deductionamounts = (this.totalcostofrecurring * this.percentage/100);
    // }
    
    this.payableamount = (this.balanceamount_to_pay + this.deductionamounts);
    this.serviceRequest.cancelRequest(this.comments,this.serviceId,this.service_type,this.txnid,this.paid_amount,
      this.utilized_service_cost,this.percentage,this.recurring_request_id,this.cancelCharges,this.refund_amountsrecurring,
      this.service_remaing_cost,this.req_count,this.package_id,this.balanceamount_to_pay,this.deductionamounts,this.payableamount,
      this.cancel_services).subscribe(
     (cancelRequest) => {  
      this.showToaster(cancelRequest.result); 
      loader.dismiss(); 
      this.navCtrl.setRoot(ServicerequestPage); 
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
}
