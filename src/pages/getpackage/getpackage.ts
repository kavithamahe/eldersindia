import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,LoadingController,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PackageRequestPagePage }  from '../../pages/package-request/package-request';
import { BlogListService } from '../../providers/blog-list-service';
/*
  Generated class for the GetpackagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-getpackage',
  templateUrl: 'getpackage.html',
  providers:[BlogListService]
})
export class GetpackagePagePage {
connectionInfo:any;
rootUrl:any;
packId:any;
user_type:any;
selectedConnections:any;
dependentLists:any=[];
location_id:any;
dependent_id:any;
service_quantity:any;
status:any;
  constructor(public navParams: NavParams,public navCtrl: NavController,public toastCtrl: ToastController,public viewCtrl: ViewController,public storage:Storage,public loadingCtrl: LoadingController,public blogListService:BlogListService) {

  	this.storage.ready().then(() => { 
    storage.get('user_type').then((user_type) => { 
        this.user_type=user_type;
      });    
        storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
        this.location_id = navParams.get("location_id");
        this.packId = navParams.get("packID");
        this.service_quantity = navParams.get("service_quantity");
        this.dependentLists = navParams.get("dependents");
        this.dependent_id = this.dependentLists[0].id;
         });
   });
  }
  dismiss(){
  	this.navCtrl.pop();
  }
  cancel(){
    this.navCtrl.pop();
  }
  packageavailAlert(){
         this.blogListService.packageAvailAlert(this.selectedConnections,this.packId,this.service_quantity).subscribe(connections => {
        this.connectionInfo=connections.result;
         this.status = connections.status;
        this.blogListService.showToast(this.connectionInfo);
     },
   err =>{
      this.blogListService.showErrorToast(err);
  })

  }
 getPackageelder(){
 let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();    
      this.blogListService.getPackage(this.dependent_id,this.packId,this.location_id).subscribe(connections => {
        this.connectionInfo=connections.result;
        this.blogListService.showToast(this.connectionInfo);
        loader.dismiss();
        this.navCtrl.setRoot(PackageRequestPagePage);
     },
   err =>{
    loader.dismiss();
      this.blogListService.showErrorToast(err);
  })
}
    getPackage(){
    if(this.selectedConnections == undefined){
      this.blogListService.showToast("Please select the dependent");
    }
    else{
        let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();    
        this.blogListService.getPackage(this.selectedConnections,this.packId,this.location_id).subscribe(connections => {
        this.connectionInfo=connections.result;
        this.blogListService.showToast(this.connectionInfo);
        loader.dismiss();
        this.navCtrl.setRoot(PackageRequestPagePage);
     },
   err =>{
    loader.dismiss();
      this.blogListService.showErrorToast(err);
  })
    }

 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GetpackagePagePage');
  }

}
