import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ServiceRequestService } from '../../providers/service-request-service';
import { ViewServiceRequestPage } from '../../pages/view-service-request/view-service-request';
import { DashboardPage } from '../../pages/dashboard/dashboard';
/*
  Generated class for the Servicerequest page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-servicerequest',
  templateUrl: 'servicerequest.html'
})
export class ServicerequestPage {
imageUrl:any;
token:any;
serviceRequestInfo:any
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public loadingCtrl: LoadingController,public toastCtrl: ToastController,public serviceRequest:ServiceRequestService) {
  	this.storage.ready().then(() => {
  	  storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
      // this.blogId=navParams.get("blogId");
  		this.onInit();
      })
  	});
  }
  
  public onInit()
  {
  	let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.serviceRequest.serviceRequestList().subscribe(
     (serviceRequest) => {
      this.serviceRequestInfo=serviceRequest.result.info;     
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
      }
    );
    loader.dismiss();
  }
  public viewRequest(serviceRequestId)
  {
     this.navCtrl.push(ViewServiceRequestPage, {serviceRequestId});
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
}
