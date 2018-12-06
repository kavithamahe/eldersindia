import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { ServiceRequestService } from '../../providers/service-request-service';
import { ServicerequestPage } from '../../pages/servicerequest/servicerequest';



/**
 * Generated class for the CancelrequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,public loadingCtrl: LoadingController,public serviceRequest:ServiceRequestService) {
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
      this.pending_service_amount = navParams.get("pending_service_amount");
      if(this.percentage == "hours expired"){
      	this.percentage = "0";
      }
       let percentages = ((100 - this.percentage));
      this.refund_amount = (this.paid_amount * percentages/100);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CancelrequestsPage');
  }
  cancel(){
  	this.navCtrl.pop();
  }
   public delete()
  {
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
          this.showToaster("Try again later");
        }
        loader.dismiss();
      });
  }

    deletezerocost(){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.serviceRequest.updateServiceReceiveStatus(this.comments,this.serviceId,this.service_type).subscribe(
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
          this.showToaster("Try again later");
        }
        loader.dismiss();
      });
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
