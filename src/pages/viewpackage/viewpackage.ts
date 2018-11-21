import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ViewController,NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { BlogListService } from '../../providers/blog-list-service';
import { DashboardPage } from '../../pages/dashboard/dashboard';

import moment from 'moment';
/*
  Generated class for the ViewpackagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-viewpackage',
  templateUrl: 'viewpackage.html',
  providers:[BlogListService]
})
export class ViewpackagePagePage {
	packageId:any;
	rootUrl:any;
	packageData:any;
  createt_at:any;
  constructor(public navCtrl: NavController,public viewCtrl: ViewController,public storage:Storage,public toastCtrl: ToastController,public loadingCtrl: LoadingController, public navParams: NavParams,public blogListService:BlogListService) {
  	 this.storage.ready().then(() => {      
    	storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
      this.packageId=navParams.get("packageId");
  	this.getPackageRequestBy();
      });     
   });

  }
  getPackageRequestBy(){
  	let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    loading.present();
    // this.providerService.loadServiceOffered()
    this.blogListService.getPackageRequestById(this.rootUrl,this.packageId)
      .subscribe(data =>{
        this.packageData = data.result; 
        this.createt_at = moment(data.result.createt_at).format("DD-MM-YYYY HH:mm:ss");  
        loading.dismiss();
    },
    err =>{
      this.blogListService.showErrorToast(err);     
      loading.dismiss();
    }) 
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewpackagePagePage');
  }

  dismiss(){
  	this.viewCtrl.dismiss();
  }
  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
}
