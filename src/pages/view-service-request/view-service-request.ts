import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { ServiceRequestService } from '../../providers/service-request-service';
import moment from 'moment';
/*
  Generated class for the ViewServiceRequest page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-service-request',
  templateUrl: 'view-service-request.html',
  providers:[ServiceRequestService]
})
export class ViewServiceRequestPage {
imageUrl:any;
token:any;
viewServiceRequestInfo:any;
serviceRequestId:number;
preffer:any;
service:any;
payment_method:any;
discountservicecost:any;
paidamount:any;
balanceamount:any;
Paymentstatus:any;
additional_service_cost:any;
emergencyContact:any=[];
paidamount1:any;
paidamount2:any;
paidamount3:any;
paidamount4:any;
prebookcost:any;
updated_at:any;
cancelled_date:any;
scheduled_at:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public loadingCtrl: LoadingController,public toastCtrl: ToastController,public serviceRequest:ServiceRequestService) {
  	this.storage.ready().then(() => {
  	  storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
        this.serviceRequestId=navParams.get("serviceRequestId");
        this.service = navParams.get("service");
        this.payment_method= this.service.payment_method;
        this.Paymentstatus = this.service.Paymentstatus;
        this.additional_service_cost = this.service.additional_service_cost;
        if(this.payment_method == "partial_payment"){
          this.discountservicecost = parseFloat(this.service.servicediscountcost_one_service)+parseFloat(this.service.final_service_cost);
          this.paidamount = this.service.servicediscountcost_one_service;
          this.balanceamount = this.service.final_service_cost;
        }
        if(this.payment_method == "full_payment"){
          this.discountservicecost = parseFloat(this.service.servicediscountcost_one_service)+parseFloat(this.service.final_service_cost);
          this.paidamount = parseFloat(this.service.servicediscountcost_one_service) + parseFloat(this.service.final_service_cost);
          this.balanceamount = "0";


        }
        if(this.payment_method == ""){
          this.discountservicecost = "0";
          this.paidamount = "0";
          this.balanceamount = "0";
        }

  		this.onInit(this.serviceRequestId);
      })
  	});
  }
  onInit(serviceRequestId)
  {
  	let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.serviceRequest.viewServiceRequest(this.serviceRequestId).subscribe(
     (viewServiceRequest) => {
      this.viewServiceRequestInfo=viewServiceRequest.result;
      this.updated_at = moment(viewServiceRequest.result.updated_at).format("DD-MM-YYYY HH:mm:ss");
      this.cancelled_date = moment(viewServiceRequest.result.cancelled_date).format("DD-MM-YYYY HH:mm:ss");
      this.paidamount1 = (parseFloat(this.viewServiceRequestInfo.service_cost) - parseFloat(this.viewServiceRequestInfo.additional_service_cost));
      this.paidamount2 = (parseFloat(this.viewServiceRequestInfo.service_cost) + parseFloat(this.viewServiceRequestInfo.additional_service_cost));
      this.paidamount3 = (this.viewServiceRequestInfo.service_cost - parseFloat(this.viewServiceRequestInfo.service_balance_amount) + parseFloat(this.viewServiceRequestInfo.additional_service_cost));
      this.paidamount4 = (parseFloat(this.viewServiceRequestInfo.service_cost) - parseFloat(this.viewServiceRequestInfo.additional_service_cost));
      this.prebookcost = (parseFloat(this.viewServiceRequestInfo.service_cost) - parseFloat(this.viewServiceRequestInfo.additional_service_cost));
      this.emergencyContact = this.viewServiceRequestInfo.emergencyContact;
      this.scheduled_at = moment(viewServiceRequest.result.scheduled_at).format("DD-MM-YYYY HH:mm:ss");
      this.preffer= viewServiceRequest.enquiry_date;
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
  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
  showToaster(message)
  {
   let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
        });
   toast.present();
  }
}
