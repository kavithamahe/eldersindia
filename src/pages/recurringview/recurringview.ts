import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ServicerequestPage } from '../../pages/servicerequest/servicerequest';
import { DashboardPage } from '../../pages/dashboard/dashboard';

import { BlogListService } from '../../providers/blog-list-service';

import moment from 'moment';
/*
  Generated class for the RecurringviewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recurringview',
  templateUrl: 'recurringview.html',
  providers:[BlogListService]
})
export class RecurringviewPagePage {
rootUrl:any;
recurringRequestinfo:any=[];
recurring_request_id:any;
recurringlist:any;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController,public storage:Storage,public navParams: NavParams,public blogListService: BlogListService,public loadingCtrl: LoadingController) {
  	this.storage.ready().then(() => {
  		storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
	  	this.recurringlist = navParams.get("recurringview");
	  	this.recurring_request_id = this.recurringlist.recurring_request_id;
	  	this.getrecurringRequestdetail();
      });  
  	
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecurringviewPagePage');
  }
    getrecurringRequestdetail(){
  	let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    loading.present();
    this.blogListService.getrecurringRequestdetail(this.rootUrl,this.recurring_request_id)
      .subscribe(data =>{ 
      	this.recurringRequestinfo = data.result;
        var dataList=data.result;
        for(let data of dataList) {
          data.created_at = moment(data.created_at).format("DD-MM-YYYY");
           }
        this.recurringRequestinfo = dataList;
        loading.dismiss();
    },
    err =>{
      this.blogListService.showErrorToast(err);     
      loading.dismiss();
    })
  }
 public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
  viewrecurring(sr_token){
    this.navCtrl.push(ServicerequestPage,{sr_token:sr_token});
  }
  dismiss(){
  	this.viewCtrl.dismiss();
  }
}
