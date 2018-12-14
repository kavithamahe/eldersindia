import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ToastController,ViewController,PopoverController,AlertController  } from 'ionic-angular';

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
error:any;
searchaction:any;
packageName:boolean = false;
packageEmail:boolean = false;
packagetransId:boolean = false;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,private popoverCtrl: PopoverController, public loadingCtrl: LoadingController,public navParams: NavParams,public _provider:ServiceProvider,private alertCtrl: AlertController) {
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
          data.preferred_datetime = moment(data.preferred_datetime).format("DD-MM-YYYY");
        }
        this.enquiriesList = dataList;
        this.nextPageURL=data.result.info.next_page_url;  
        loading.dismiss();
    },
    err =>{
       if(err.status==401)
      {
        this.error = JSON.parse(err._body).error;
        this._provider.showToast(JSON.parse(err._body).error);
      }
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
          data.preferred_datetime = moment(data.preferred_datetime).format("DD-MM-YYYY");
        } 
       for (let i = 0; i < Object.keys(this.serviceRequestScrollLists).length; i++) {
        this.enquiriesList.push(dataList[i]);
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
          this.showToaster("Something went wrong");
        }
      }
    );
     
  }
  deletepresentConfirm(id) {
  let alert = this.alertCtrl.create({
    title: 'Delete Confirmation',
    message: 'Are you sure you want to delete this record ?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {
          console.log('yes clicked');
          this.deleteEnquiery(id);
        }
      }
    ]
  });
  alert.present();
}
deleteEnquiery(id){
   let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
  let data = {"info":{"temp_id":id}};
  this._provider.webServiceCall(`deleteEnquiry`,data)
  .subscribe(
      data =>{
        this.showToaster(data.result);
        this.getenquiryList();
        loading.dismiss();
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
      })
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
      presentPopover(ev) {
    let popover = this.popoverCtrl.create(EnquiryPopoverPage, {
    });
    popover.present({
      ev: ev
    });
    popover.onDidDismiss((popoverData) => {
      this.searchaction = popoverData;
      if(this.searchaction == "name"){
        this.packageName = true;
        this.packageEmail = false;
        this.packagetransId = false;
      }
     if(this.searchaction == "email"){
      this.packageEmail = true;
      this.packageName = false;
      this.packagetransId = false;
     }
     if(this.searchaction == "id"){
      this.packagetransId = true;
      this.packageName = false;
      this.packageEmail = false;
     }

    })
  }
}

@Component({
  template: `<ion-list class='send-req'>
  <ion-item style="color:blue !important">
Search By
</ion-item>
<ion-item (click)="requests('name')">
Name
</ion-item>
<ion-item (click)="requests('email')">
Category
</ion-item>
<ion-item (click)="requests('id')">
Vendor
</ion-item>
</ion-list>
  `
})
export class EnquiryPopoverPage {
  constructor(private viewCtrl: ViewController) {
   }
 requests(data){
   this.viewCtrl.dismiss(data);
 }
 
}