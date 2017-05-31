import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { ServiceRequestService } from '../../providers/service-request-service';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public loadingCtrl: LoadingController,public toastCtrl: ToastController,public serviceRequest:ServiceRequestService) {
  	this.storage.ready().then(() => {
  	  storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
        this.serviceRequestId=navParams.get("serviceRequestId");
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
      this.viewServiceRequestInfo=viewServiceRequest; 
      loader.dismiss();   
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
