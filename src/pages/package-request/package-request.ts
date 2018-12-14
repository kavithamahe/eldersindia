import { Component,ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController, NavParams,ModalController,LoadingController,ToastController,PopoverController,ViewController } from 'ionic-angular';
import { BlogListService } from '../../providers/blog-list-service';
import { Storage } from '@ionic/storage';
import { ViewpackagePagePage } from '../../pages/viewpackage/viewpackage';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import {ElderservicePagePage } from '../../pages/elderservice/elderservice';
import moment from 'moment';
/*
  Generated class for the PackageRequestPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-package-request',
  templateUrl: 'package-request.html',
  providers:[BlogListService]
})
export class PackageRequestPagePage {
  @ViewChild(Content) content: Content;
	rootUrl:any;
	packageRequest:any;
	nextPageURL:any='';
	searchText:any="";
eventScrollLists:any;
packstatus:any="";
packbstatus:any;
packageId:any;
id:any;
locationId:any;
elderId:any;
searchemail:any="";
searchid:any="";
paystatus:any;
results:any;
service_avail_date:any;
scrollTop:boolean = false;
searchaction:any;
packageName:boolean = false;
packageEmail:boolean = false;
packagetransId:boolean = false;
  constructor(public navCtrl: NavController,private popoverCtrl: PopoverController,public modalCtrl: ModalController,public toastCtrl: ToastController,public storage:Storage,public loadingCtrl: LoadingController, public navParams: NavParams, public blogListService:BlogListService) {
      this.paystatus = navParams.get("status");
       this.results = navParams.get("result");
    if(this.paystatus == "1"){
      this.blogListService.showToaster(this.results);
    }
  	 this.storage.ready().then(() => {      
    	storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
     
      this.getPackageRequests();
      });     
   });
  	
  }
   scrollToTop() {
    this.content.scrollToTop();
  }
  scrollToBottom(){
    this.content.scrollToBottom();
  }
  getPackageRequests(){
     if(this.packstatus == "All"){
      this.packstatus = "";
    }
  	let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    loading.present();
    this.blogListService.getPackageRequest(this.rootUrl,this.searchText,this.searchemail,this.searchid,this.packstatus)
      .subscribe(data =>{
        this.packageRequest = data.result.data;
         var dataList=data.result.data;
        for(let data of dataList) {
          data.service_avail_date = moment(data.service_avail_date).format("DD-MM-YYYY HH:mm:ss");
        }
        this.packageRequest=dataList;
        this.nextPageURL = data.result.next_page_url;
       loading.dismiss();
    },
    err =>{
      this.packageRequest= [];
      this.blogListService.showErrorToast(err);     
      loading.dismiss();
    }) 
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PackageRequestPagePage');
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
doInfinite(infiniteScroll) {
    setTimeout(() => {      
      if(this.nextPageURL!=null && this.nextPageURL!='')
      {
       this.packagescroll();
      }
      else{
        infiniteScroll.enable(false);
      }
      infiniteScroll.complete();
    }, 500);
  }
  packagescroll()
  {
    this.scrollTop = true;
     this.blogListService.eventscrolls(this.nextPageURL,this.searchText,this.searchemail,this.searchid,this.packstatus).subscribe(
     (eventsscroll) => {
      this.eventScrollLists=eventsscroll.result.data;
        var dataList=eventsscroll.result.data;
        for(let data of dataList) {
          data.service_avail_date = moment(data.service_avail_date).format("DD-MM-YYYY HH:mm:ss");
        }
      for (let i = 0; i < Object.keys(this.eventScrollLists).length; i++) {
        this.packageRequest.push(dataList[i]);
        }
      
       this.nextPageURL=eventsscroll.result.next_page_url;     
    },
    err =>{
   
    if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
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
  inputSearch(searchEvent){
   this.searchText = searchEvent;
   this.getPackageRequests();
  }
    searchemails(searchEvent){
   this.searchemail = searchEvent;
   this.getPackageRequests();
  }
    searchids(searchEvent){
   this.searchid = searchEvent;
   this.getPackageRequests();
  }
  onSelectChange(selectedValue: any) {
   if(this.packstatus == "All"){
    this.packstatus = "";
    this.getPackageRequests();
   }
   else{
      this.packstatus = selectedValue;
    this.getPackageRequests();
   }
  
  }
  pressview(packageId){
    this.getPackageRequestBy(packageId);
  }
  getPackageRequestBy(packageId){
  	 this.navCtrl.push(ViewpackagePagePage,{packageId:packageId});
  }
  pressservices(id,locationId,elderId,status){
  this.getServicesForByElders(id,locationId,elderId,status);
  }
  getServicesForByElders(id,locationId,elderId,status){
  	 // let modal1 = this.modalCtrl.create(ElderservicePagePage,{pack_id: id, elder: elderId, location_id: locationId,packbstatus:status});
    // modal1.present();
     this.navCtrl.push(ElderservicePagePage,{pack_id: id, elder: elderId, location_id: locationId,packbstatus:status});

  }
public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
    presentPopover(ev) {
      console.log("PackagePopoverPage");
    let popover = this.popoverCtrl.create(PackagePopoverPage, {
    });
    popover.present({
      ev: ev
    });
    popover.onDidDismiss((popoverData) => {
      console.log(popoverData);
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
Service Provider Name
</ion-item>
<ion-item (click)="requests('email')">
Email
</ion-item>
<ion-item (click)="requests('id')">
Transaction Id
</ion-item>
</ion-list>
  `
})
export class PackagePopoverPage {
  constructor(private viewCtrl: ViewController) {
   }
 requests(data){
   this.viewCtrl.dismiss(data);
 }
 
}