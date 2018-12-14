import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,LoadingController,ViewController,ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PackageRequestPagePage }  from '../../pages/package-request/package-request';
import { BlogListService } from '../../providers/blog-list-service';
 import { PackagepaymentPagePage } from '../../pages/packagepayment/packagepayment';
 import { ServiceProvider } from '../../providers/service-provider';



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
service_quantity:any;
packageAvailstatus:any;
packageAvailresult:any;
coupan_code:any;
coupon_id:any;
discounted_cost:any;
final_service_cost:any;
coupandiscount:any;
wallet_value:any;
  constructor(public navParams: NavParams,public modalCtrl: ModalController,public providerService: ServiceProvider,public navCtrl: NavController,public toastCtrl: ToastController,public viewCtrl: ViewController,public storage:Storage,public loadingCtrl: LoadingController,public blogListService:BlogListService) {

  // constructor(public navParams: NavParams,public navCtrl: NavController,public toastCtrl: ToastController,public viewCtrl: ViewController,public storage:Storage,public loadingCtrl: LoadingController,public blogListService:BlogListService) {


    this.storage.ready().then(() => { 
    storage.get('user_type').then((user_type) => { 
        this.user_type=user_type;
      });    
        storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
          //this.getConnections(this.rootUrl);
      });

      
        this.service_quantity = navParams.get("service_quantity").service_quantity;
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
 packageAvail(){
         this.blogListService.packageAvailAlert(this.selectedConnections,this.packId,this.service_quantity,this.location_id).subscribe(connections => {
        this.packageAvailstatus=connections.status;
        this.packageAvailresult = connections.result;
     },
   err =>{
      this.blogListService.showErrorToast(err);
  })
 }
  getPackageselder(){
  
    if(this.paymenttype == undefined){
        this.blogListService.showToast("Please select the details");
      }
      else{
        if(this.paymenttype == "Offline Payment"){
     let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();    
      this.blogListService.getPackageselder(this.packId,this.location_id).subscribe(connections => {
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
           if(this.coupandiscount == "1"){
        this.package_amount = this.final_service_cost;
      }
      else{
        this.package_amount = this.package_amount;
      }
     this.navCtrl.push(PackagepaymentPagePage,{"packId":this.packId,"vendor_id":this.vendor_id,"package_validity":this.package_validity,"selectedConnections":this.selectedConnections,
      "package_amount":this.package_amount,"wallet_value":this.wallet_value,"coupon_id":this.coupon_id,"coupan_offer":this.discounted_cost});
      this.dismiss();
    }
  }
  }

    getPackage(){
       this.blogListService.packageAvailAlert(this.selectedConnections,this.packId,this.service_quantity,this.location_id).subscribe(connections => {
        this.packageAvailstatus=connections.status;
        this.packageAvailresult = connections.result;
     },
   err =>{
      this.blogListService.showErrorToast(err);
  })

      if(this.selectedConnections == undefined || this.paymenttype == undefined){
        this.blogListService.showToast("Please select the details");
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
      if(this.coupandiscount == "1"){
        this.package_amount = this.final_service_cost;
      }
      else{
        this.package_amount = this.package_amount;
      }
      if(this.packageAvailstatus == 0){
          this.navCtrl.push(PackagepaymentPagePage,{"packId":this.packId,"vendor_id":this.vendor_id,"package_validity":this.package_validity,"selectedConnections":this.selectedConnections,
      "package_amount":this.package_amount,"wallet_value":this.wallet_value,"coupon_id":this.coupon_id,"coupan_offer":this.discounted_cost});
     this.dismiss();
      }
    else{
      this.blogListService.showToast(this.packageAvailresult);
    }
    }
    }
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GetpackagePagePage');
  }
  applyCoupan(){

    let payment_data={"info":{"coupon_code_discount_cost":0,
    "final_service_cost_after_coupon_code_discount":0,"vendor_id":this.vendor_id,
    "packId":this.packId,"type":"package","amount":this.package_amount,"coupen_code":this.coupan_code,
    "dependentid":this.selectedConnections}}

        let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
  this.providerService.webServiceCall(`checkCoupenCodeValidity`,payment_data)
  .subscribe(
      data =>{
        this.coupon_id = data.result.coupon_id;
        this.discounted_cost = data.result.discounted_cost;
        this.final_service_cost = data.result.final_service_cost;
        this.wallet_value = data.result.wallet_value;
        this.coupandiscount = "1";
        loading.dismiss();
              },
      err =>{
        loading.dismiss();
        if(err.status===400)
      {
        this.coupon_id = "";
        this.discounted_cost = "";
        this.final_service_cost = "";
        this.coupandiscount = "0";
        this.providerService.showToast(JSON.parse(err._body).error);
      }
      else if(err.status === 401){
         this.coupon_id = "";
        this.discounted_cost = "";
        this.final_service_cost = "";
        this.coupandiscount = "0";
        this.providerService.showToast(JSON.parse(err._body).error);
      }
      else
      {
         this.coupon_id = "";
        this.discounted_cost = "";
        this.final_service_cost = "";
        this.coupandiscount = "0";
        this.providerService.showToast("Something went wrong");
      }
            })
  }

}
