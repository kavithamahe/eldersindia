import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { ViewenquiryPagePage } from '../../pages/viewenquiry/viewenquiry';

import { ServiceProvider } from '../../providers/service-provider';

import moment from 'moment';

/*
  Generated class for the EnquiriesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-enquiries',
  templateUrl: 'enquiries.html'
})
export class EnquiriesPagePage {
nextPageURL:any='';
serviceRequestScrollLists:any=[];
enquiriesList:any=[];
category_details:any=[];
vendor_details:any=[];
category:any="";
vendor:any="";
searchText:any="";
enquiry_date:any;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public loadingCtrl: LoadingController,public navParams: NavParams,public _provider:ServiceProvider) {
  	this.getenquiryList();
    this.getcategoryList();
    this.getvendorList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnquiriesPagePage');
  }
  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
      getcategoryList(){
    let service_data = {};
   this._provider.webServiceCall(`get_category_details`,service_data)
      .subscribe(data =>{ 
    this.category_details = data.category_details;
    },
    err =>{
      this._provider.showErrorToast(err);     
    })
  }
   getvendorList(){
    let service_data = {};
   this._provider.webServiceCall(`get_vendor_details`,service_data)
      .subscribe(data =>{ 
   this.vendor_details = data.vendor_details;
    },
    err =>{
      this._provider.showErrorToast(err);     
    })
  }
    getenquiryList(){
  	let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    loading.present();
    this.enquiriesList = [];
    let service_data = {"info":{"list":true,"search":this.searchText,"status":"","vendor_id":this.vendor,"category_id":this.category}};
   this._provider.webServiceCall(`getEnquiryList`,service_data)
      .subscribe(data =>{ 
		this.enquiriesList = data.result.info.data;
    var dataList=data.result.info.data;
        for(let data of dataList) {
          this.enquiry_date = moment(data.preferred_datetime).format("DD-MM-YYYY");
        }
        this.nextPageURL=data.result.info.next_page_url;  
        loading.dismiss();
    },
    err =>{
      this.enquiriesList = [];
      this._provider.showErrorToast(err);     
      loading.dismiss();
    })
  }
   inputSearch(searchEvent){
   this.searchText = searchEvent;
   this.getenquiryList();
   if(this.searchText.length == 0){
    this.getenquiryList();
   }
  }
  doInfinite(infiniteScroll) {
    setTimeout(() => {      
      if(this.nextPageURL!=null && this.nextPageURL!='')
      {
       this.enquiryRequestScroll();
      }
      else{
        infiniteScroll.enable(false);
      }
      infiniteScroll.complete();
    }, 500);
  }
  enquiryRequestScroll()
  {
    this._provider.enquiryRequestScroll(this.nextPageURL,this.searchText,this.vendor,this.category).subscribe(
     (serviceRequestScroll) => {
   
      this.serviceRequestScrollLists=serviceRequestScroll.result.info.data;
       var dataList=serviceRequestScroll.result.info.data;
        for(let data of dataList) {
          this.enquiry_date = moment(data.preferred_datetime).format("DD-MM-YYYY");
        } 
       for (let i = 0; i < Object.keys(this.serviceRequestScrollLists).length; i++) {
        this.enquiriesList.push(this.serviceRequestScrollLists[i]);
        }
      
       this.nextPageURL=serviceRequestScroll.result.info.next_page_url;     
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
  viewenquiry(enquiries){
  	this.navCtrl.push(ViewenquiryPagePage,{"enquiries":enquiries});
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
