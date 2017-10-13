import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { BlogListService } from '../../providers/blog-list-service';
import { Storage } from '@ionic/storage';

import { DashboardPage } from '../../pages/dashboard/dashboard';

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
	rootUrl:any;
	packageRequest:any;
	nextPageURL:any='';
	searchText:any="";
eventScrollLists:any;
packstatus:any="";
  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public storage:Storage,public loadingCtrl: LoadingController, public navParams: NavParams, public blogListService:BlogListService) {
  	 this.storage.ready().then(() => {      
    	storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
      console.log(this.rootUrl);
      this.getPackageRequests();
      });     
   });
  	
  }
  getPackageRequests(){
  	let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    loading.present();
    // this.providerService.loadServiceOffered()
    this.blogListService.getPackageRequest(this.rootUrl,this.searchText,this.packstatus)
      .subscribe(data =>{
      	console.log(data);
        this.packageRequest = data.result.data;
        this.nextPageURL = data.result.next_page_url;
       loading.dismiss();
      console.log("Recieved filtered data :"+this.packageRequest);
    },
    err =>{
      this.blogListService.showErrorToast(err);     
      loading.dismiss();
    }) 
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PackageRequestPagePage');
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
     this.blogListService.eventscrolls(this.nextPageURL,this.searchText,this.packstatus).subscribe(
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
   this.searchText = searchEvent.target.value;
   this.getPackageRequests();
  }
  onSelectChange(selectedValue: any) {
    this.packstatus = selectedValue;
    this.getPackageRequests();
  }
public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
}