import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { BlogListService } from '../../providers/blog-list-service';



/*
  Generated class for the RecurringcancelPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recurringcancel',
  templateUrl: 'recurringcancel.html',
  providers:[BlogListService]
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public blogListService: BlogListService,public loadingCtrl: LoadingController,public storage:Storage,) {
  		this.storage.ready().then(() => {
  		storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
	  	this.recurringlist = navParams.get("recurringview");
	  	this.recurring_request_id = this.recurringlist.recurring_request_id;
	  	this.getrecurringRequestdelete();
      });  
  	
  });
  }
  getrecurringRequestdelete(){
  	let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    loading.present();
    this.blogListService.getrecurringRequestdelete(this.rootUrl,this.recurring_request_id)
      .subscribe(data =>{ 
      	this.recurringRequest = data.result;
        this.dedction_amounts = data.result[0];
        this.refund_amount = this.dedction_amounts.refund_amount;
        this.dedction_amount= this.dedction_amounts.dedction_amount;
        this.remaining_amount = this.dedction_amounts.remaining_amount;
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
  	let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    loading.present();
    this.blogListService.deleterecurringrequest(this.rootUrl,this.recurring_request_id,this.dedction_amount,this.refund_amount,
      this.remaining_amount)
      .subscribe(data =>{ 
      	this.blogListService.showToast(data.result);
      	this.navCtrl.pop();
        loading.dismiss();
    },
    err =>{
      this.blogListService.showErrorToast(err);     
      loading.dismiss();
    })
  }
  dismiss(){
  	this.viewCtrl.dismiss();
  }
dashboardPage(){
    this.navCtrl.setRoot(DashboardPage);
  }
}
