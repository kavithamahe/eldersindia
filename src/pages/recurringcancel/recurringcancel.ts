import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { RecurringPagePage } from '../../pages/recurring/recurring';
import { BlogListService } from '../../providers/blog-list-service';
import { PackagepaymentPagePage } from '../../pages/packagepayment/packagepayment';
import { ServiceRequestService } from '../../providers/service-request-service';




/*
  Generated class for the RecurringcancelPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recurringcancel',
  templateUrl: 'recurringcancel.html',
  providers:[BlogListService,ServiceRequestService]
})
export class RecurringcancelPagePage {
rootUrl:any;
recurring_request_id:any;
dedction_amounts:any=[];
refund_amount:any;
dedction_amount:any;
remaining_amount:any;
recurringRequest:any=[];
recurringlist:any;
hours:any;
paid_cost:any;
reamining_cost:any;
service_cost:any;
status:any;
total_service_cost:any;
service_costs:any;
paid_amount:any;
balance_amount:any;
total_amount:any;
service_cost_total:any;
previous_service_pending_cost:any;
bulkcomplete:any;
getCompleteBulk:any=[];
getRemarksList:any=[];
remarks:any;
other:any;
rating:any;
amount_received:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public blogListService: BlogListService,public loadingCtrl: LoadingController,public storage:Storage,public serviceRequest:ServiceRequestService) {
  		this.storage.ready().then(() => {
  		storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
	  	this.recurringlist = navParams.get("recurringview");
      this.bulkcomplete = navParams.get("bulkcomplete");
	  	this.recurring_request_id = this.recurringlist.recurring_request_id;
      this.hours = this.recurringlist.hours;
      this.paid_cost = this.recurringlist.paid_amount;
      this.reamining_cost = this.recurringlist.remaining_amount;
      console.log(this.reamining_cost);
      this.service_cost = this.recurringlist.service_cost;
      this.status = this.recurringlist.status;
      this.total_service_cost = this.recurringlist.total_service_cost;
      if(this.bulkcomplete != 1){
	  	this.getrecurringRequestdelete();
    }
      if(this.bulkcomplete == 1){
        this.getCompleteBulkRecurringService();
        this.getRemarks();
      }
      });  
  	
  });
  }
  getCompleteBulkRecurringService(){
    let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    loading.present();
    this.blogListService.getCompleteBulkRecurringService(this.rootUrl,this.recurring_request_id)
      .subscribe(data =>{ 
        this.getCompleteBulk = data.result;
        loading.dismiss();
    },
    err =>{
      this.blogListService.showErrorToast(err);     
      loading.dismiss();
    })
  }
    getRemarks()
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
  getrecurringRequestdelete(){
  	let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    loading.present();
    this.blogListService.getrecurringRequestdelete(this.rootUrl,this.recurring_request_id,this.hours,
      this.paid_cost,this.reamining_cost,this.service_cost,this.status,this.total_service_cost)
      .subscribe(data =>{ 
      	this.recurringRequest = data.result;
        this.dedction_amounts = data.result[0];
        this.refund_amount = this.dedction_amounts.refund_amount;
        this.dedction_amount= this.dedction_amounts.dedction_amount;
        this.remaining_amount = this.dedction_amounts.remaining_amount;
        this.balance_amount = this.dedction_amounts.balance_amount;
        this.paid_amount = this.dedction_amounts.paid_amount;
        this.service_costs = this.dedction_amounts.service_cost;
        this.total_amount = this.dedction_amounts.total_amount;
        this.service_cost_total = this.dedction_amounts.service_cost_total;
        this.amount_received = this.dedction_amounts.amount_received;
        this.previous_service_pending_cost = this.dedction_amounts.previous_service_pending_cost;
        loading.dismiss();
    },
    err =>{
      this.blogListService.showErrorToast(err);     
      loading.dismiss();
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RecurringcancelPagePage');
  }
  cancel(){
  	this.dismiss();
  }
  delete(){
    if(this.balance_amount == undefined){
      this.balance_amount = null;
    }
  	let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    loading.present();
    this.blogListService.deleterecurringrequest(this.rootUrl,this.recurring_request_id,this.dedction_amount,this.refund_amount,
      this.remaining_amount,this.paid_amount,this.balance_amount,this.total_amount)
      .subscribe(data =>{ 
      	this.blogListService.showToast(data.result);
      	this.navCtrl.setRoot(RecurringPagePage);
        loading.dismiss();
    },
    err =>{
      this.blogListService.showErrorToast(err);     
      loading.dismiss();
    })
  }
  completebulkservice(){
    if(this.reamining_cost != 0 || this.reamining_cost == null){
      this.blogListService.showToast("You cannot complete the above services");
    }
    else{
          let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    loading.present();
    this.blogListService.completeBulkRecurringService(this.rootUrl,this.recurring_request_id,this.rating,this.other,this.remarks)
      .subscribe(data =>{ 
        this.blogListService.showToast(data.result);
        this.navCtrl.setRoot(RecurringPagePage);
        loading.dismiss();
    },
    err =>{
      this.blogListService.showErrorToast(err);     
      loading.dismiss();
    })
    }

  }
  payserviceamount(){
    let service_type = "Recurring";
    this.navCtrl.push(PackagepaymentPagePage,{"service_type":service_type,"service_cost":this.reamining_cost,"service_id":this.recurring_request_id,"recurring_request_id":this.recurring_request_id,"reqstatus":"2"});
   }
  dismiss(){
  	this.viewCtrl.dismiss();
  }
  dashboardPage(){
    this.navCtrl.setRoot(DashboardPage);
  }
}
