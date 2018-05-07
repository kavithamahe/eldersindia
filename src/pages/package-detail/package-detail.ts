import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ModalController,ToastController } from 'ionic-angular';
import { BlogListService } from '../../providers/blog-list-service';
import { GetpackagePagePage } from  '../../pages/getpackage/getpackage';
import { Storage } from '@ionic/storage';

import { DashboardPage } from '../../pages/dashboard/dashboard';

/*
  Generated class for the PackageDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-package-detail',
  templateUrl: 'package-detail.html',
  providers:[BlogListService] 

})
export class PackageDetailPagePage {
location_id:any;
vendor_id:any;
packageData:any;
rootUrl:any;
packages:any;
dependents:any;
banner:any;
vendorname:any;
vendorDesc:any;
vendoremail:any;
vendoraddress:any;
vendorLogo:any;
 imageUrl:any;
 user_type:any;
 packages_service:any;
 dependentId:any;
  constructor(public navCtrl: NavController,public modalCtrl: ModalController, public navParams: NavParams,public storage:Storage,public toastCtrl: ToastController,public loadingCtrl: LoadingController,public blogListService: BlogListService) {
  	 this.storage.ready().then(() => {     
	  	storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
	  	storage.get('user_type').then((user_type) => { this.user_type=user_type;
	  		console.log(this.imageUrl);}); 
	    storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
	    this.vendor_id = navParams.get("vendor_id");
	    this.location_id = navParams.get("location_id");
	  	this.getVendorpackageDetail();
      });     
   });    
  }
  getVendorpackageDetail(){
  	let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    loading.present();
    // this.providerService.loadServiceOffered()
    this.blogListService.getVendorpackageDetails(this.rootUrl,this.vendor_id,this.location_id)
      .subscribe(data =>{
      	//console.log(data);
        this.packageData = data.result.info.vendorDetails;  
        this.vendorname = this.packageData.name;
    		this.vendorDesc = this.packageData.description;
    		this.vendoremail = this.packageData.email;
    		this.vendoraddress = this.packageData.address;
    		this.vendorLogo = this.packageData.logo;
        this.packages = data.result.info.packages;
        this.dependents = data.result.info.dependentLists;
        this.banner = data.result.info.banners;  
        loading.dismiss();
    },
    err =>{
      this.blogListService.showErrorToast(err);     
      loading.dismiss();
    })
  }
  openRequestPackage(id){
    if(this.dependents.length == 1){
      this.dependentId = this.dependents[0].id;
    }
    this.navCtrl.push(GetpackagePagePage,{packID:id,dependents:this.dependents,location_id:this.location_id});
  
  }
  dashboardPage(){
    this.navCtrl.setRoot(DashboardPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PackageDetailPagePage');
  }

}
