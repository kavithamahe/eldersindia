import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,LoadingController,ViewController,ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PackageRequestPagePage }  from '../../pages/package-request/package-request';
import { BlogListService } from '../../providers/blog-list-service';
 import { PaymentPage } from '../../pages/payment/payment';
 import { PackagepaymentPagePage } from '../../pages/packagepayment/packagepayment';


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
paymenttype:any;
dependentLists:any=[];
vendor_id:any;
package_validity:any;
package_amount:any;
location_id:any;
  constructor(public navParams: NavParams,public modalCtrl: ModalController,public navCtrl: NavController,public toastCtrl: ToastController,public viewCtrl: ViewController,public storage:Storage,public loadingCtrl: LoadingController,public blogListService:BlogListService) {

  // constructor(public navParams: NavParams,public navCtrl: NavController,public toastCtrl: ToastController,public viewCtrl: ViewController,public storage:Storage,public loadingCtrl: LoadingController,public blogListService:BlogListService) {


  	this.storage.ready().then(() => { 
    storage.get('user_type').then((user_type) => { 
        this.user_type=user_type;
      });    
        storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
          //this.getConnections(this.rootUrl);
      });

      
      
        this.location_id = navParams.get("location_id");
        this.packId = navParams.get("packID");
        this.vendor_id = navParams.get("vendor_id");
        this.package_validity = navParams.get("package_validity");
        this.package_amount = navParams.get("package_amount");
        this.dependentLists = navParams.get("dependents");
   });
  }
  dismiss(){
  	this.viewCtrl.dismiss();
  }

    getPackage(){
      if(this.selectedConnections == undefined || this.paymenttype == undefined){
        this.blogListService.showToast("Please select above details");
      }
      else{
        if(this.paymenttype == "Offline Payment"){
  let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();    
      this.blogListService.getPackage(this.selectedConnections,this.packId,this.location_id).subscribe(connections => {
        this.connectionInfo=connections.result;
        this.blogListService.showToast(this.connectionInfo);

        this.dismiss();
        loader.dismiss();
        this.navCtrl.push(PackageRequestPagePage);
     },
   err =>{
    loader.dismiss();
      this.blogListService.showErrorToast(err);
  })
    }
    else{
     let serviceModal = this.modalCtrl.create(PackagepaymentPagePage,{"packId":this.packId,"vendor_id":this.vendor_id,"package_validity":this.package_validity,"selectedConnections":this.selectedConnections,
      "package_amount":this.package_amount});
      serviceModal.present();
    }
    }
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GetpackagePagePage');
  }

}
