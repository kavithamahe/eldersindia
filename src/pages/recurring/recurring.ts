import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { RecurringviewPagePage } from '../../pages/recurringview/recurringview';

import { BlogListService } from '../../providers/blog-list-service';

/*
  Generated class for the RecurringPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recurring',
  templateUrl: 'recurring.html',
  providers:[BlogListService]
})
export class RecurringPagePage {
recurringRequest:any=[];
rootUrl:any;
searchText:any;
nextPageURL:any='';
serviceRequestScrollLists:any=[];
  constructor(public navCtrl: NavController,public blogListService: BlogListService,public storage:Storage, public navParams: NavParams,public loadingCtrl: LoadingController) {
  	this.storage.ready().then(() => {
  		storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
	    
	  	this.getrecurringRequest();
      });  
  	
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecurringPagePage');
  }
  inputSearch(searchEvent){
   this.searchText = searchEvent.target.value;
   this.getrecurringRequest();
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
  getrecurringRequest(){
  	let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    loading.present();
    this.blogListService.getrecurringRequest(this.rootUrl)
      .subscribe(data =>{ 
      	this.recurringRequest = data.result.data;
        this.nextPageURL=data.result.next_page_url;  
        loading.dismiss();
    },
    err =>{
      this.blogListService.showErrorToast(err);     
      loading.dismiss();
    })
  }
  doInfinite(infiniteScroll) {
    setTimeout(() => {      
      if(this.nextPageURL!=null && this.nextPageURL!='')
      {
       this.recurringRequestScroll();
      }
      else{
        infiniteScroll.enable(false);
      }
      infiniteScroll.complete();
    }, 500);
  }
  recurringRequestScroll()
  {
    this.blogListService.recurringRequestScroll(this.nextPageURL).subscribe(
     (serviceRequestScroll) => {
      this.serviceRequestScrollLists=serviceRequestScroll.result.data; 
       for (let i = 0; i < Object.keys(this.serviceRequestScrollLists).length; i++) {
        this.recurringRequest.push(this.serviceRequestScrollLists[i]);
        }
      
       this.nextPageURL=serviceRequestScroll.result.list.next_page_url;     
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
     
  }
  viewrecurring(recurring){
    this.navCtrl.push(RecurringviewPagePage,{recurringview:recurring});
  	
  }
 dashboardPage(){
    this.navCtrl.setRoot(DashboardPage);
  }
  
}
