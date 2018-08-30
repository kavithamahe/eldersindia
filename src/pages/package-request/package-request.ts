import { Component,ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController, NavParams,ModalController,LoadingController,ToastController } from 'ionic-angular';
import { BlogListService } from '../../providers/blog-list-service';
import { Storage } from '@ionic/storage';
import { ViewpackagePagePage } from '../../pages/viewpackage/viewpackage';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import {ElderservicePagePage } from '../../pages/elderservice/elderservice';
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
  constructor(public navCtrl: NavController,public modalCtrl: ModalController,public toastCtrl: ToastController,public storage:Storage,public loadingCtrl: LoadingController, public navParams: NavParams, public blogListService:BlogListService) {
      this.paystatus = navParams.get("status");
       this.results = navParams.get("result");
    console.log(this.results);
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
    // this.providerService.loadServiceOffered()
    this.blogListService.getPackageRequest(this.rootUrl,this.searchText,this.searchemail,this.searchid,this.packstatus)
      .subscribe(data =>{
        this.packageRequest = data.result.data;
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
doInfinite(infiniteScroll) {
  console.log(this.nextPageURL);
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

     this.blogListService.eventscrolls(this.nextPageURL,this.searchText,this.searchemail,this.searchid,this.packstatus).subscribe(
     (eventsscroll) => {
      this.eventScrollLists=eventsscroll.result.data;
      for (let i = 0; i < Object.keys(this.eventScrollLists).length; i++) {
        this.packageRequest.push(this.eventScrollLists[i]);
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
          this.showToaster("Try again later");
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
  	 let modal = this.modalCtrl.create(ViewpackagePagePage,{packageId:packageId});
    modal.present();
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
}
