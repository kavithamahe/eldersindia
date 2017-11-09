import {Component} from '@angular/core'
// {BrowserModule} from '@angular/platform-browser'
// import { Device, LocalNotifications } from 'ionic-native';
import { Platform, NavController,LoadingController,ModalController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { SubCategoryPage } from '../sub-category/sub-category';
import { ServiceProvider } from '../../providers/service-provider';
// import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { PackageDetailPagePage } from '../../pages/package-detail/package-detail';
/*
  Generated class for the Serviceproviders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-serviceproviders',
  templateUrl: 'serviceproviders.html'
})
export class ServiceprovidersPage {
 services:any = [];
   passwordCode:any;
    imageUrl:any;
   mailID:any;
   newPassword:any;
   token:any;
   packages:any;
   packageCount;
   serviceLocation:any;
  constructor(public alertCtrl: AlertController, public modalCtrl:ModalController,public loadingCtrl: LoadingController, public platform: Platform, public navCtrl: NavController, public providerService: ServiceProvider, public storage:Storage) {
    console.log("this is service provider page");
   this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('service_location').then((service_location) => { this.serviceLocation=service_location;});
      storage.get('token').then((token) => { this.token=token; 
      this.loadServiceProvider();
      this.loadLocations();
      this.loadPackages();
      })
    });
  }
  locationChanged(){
    console.log("this.serviceLocation4",this.serviceLocation);
     this.storage.ready().then(() => {
      this.storage.set('service_location',this.serviceLocation);
      console.log("change location"+this.serviceLocation);     
      this.loadPackagesByLocationID(this.serviceLocation);
    });
   
  }
  loadServiceProvider(){
    let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    loading.present();
    // this.providerService.loadServiceOffered()
    this.providerService.webServiceCall(`getCategory`,{"location":""})
      .subscribe(data =>{
      this.services = data.result.info.category;
      loading.dismiss();
      console.log("Recieved filtered data :"+this.services);
    },
    err =>{
      this.providerService.showErrorToast(err);
      console.log("Response for get service offered: "+err);
      this.services=[];
      loading.dismiss();
    })      
  }
  viewPackage(vendor_id){
    // console.log(this.serviceLocation);
    // console.log(vendor_id);
    this.navCtrl.push(PackageDetailPagePage,{"vendor_id":vendor_id,'location_id':this.serviceLocation});
  }
  loadPackagesByLocationID(locationId){
    this.providerService.webServiceCall(`getPackage`,{"locationId":locationId})
      .subscribe(data =>{
        //console.log(data);
       this.packages =  data.result;
       //console.log(this.packages.length);
       this.packageCount = this.packages.length;
    },
    err =>{
      this.providerService.showErrorToast(err);
      console.log("Response for get service offered: "+err);
      this.services=[];      
    })
  }
  loadPackages(){
    this.providerService.webServiceCall(`getPackage`,{"locationId":""})
      .subscribe(data =>{
        //console.log(data);
       this.packages =  data.result;
       //console.log(this.packages.length);
       this.packageCount = this.packages.length;
    },
    err =>{
      this.providerService.showErrorToast(err);
      console.log("Response for get service offered: "+err);
      this.services=[];      
    }) 
  }
  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }

locations:any;

  loadLocations(){
  
  this.providerService.webServiceCall(`getLocations`,"")
          .subscribe(data =>{
                            this.locations = data.result.info;
                            console.log("Location data : "+this.locations);
                            },
                      err =>{                       
                            this.providerService.showErrorToast(err);
                            console.log("Response for Location data: "+err);
                            });
}

  subCategory(subcategory){
    this.navCtrl.push(SubCategoryPage,{"subcategory":subcategory,'locations':this.locations});
  }

  // forgotPassword(){
  //   this.passwordCode ="";
  //   this.createModal("forgotPassword");
  // }

  // resetPassword(){
  //     this.passwordCode = "1234";
  //     this.createModal("passwordReset");
  // }

  // createModal(requestData){
  //       let requestType = {modalType:requestData,passCode:this.passwordCode};
  //       let passwordModal = this.modalCtrl.create(ForgotPasswordPage,requestType);

  //   passwordModal.onDidDismiss(data =>{
  //     if(data == "dismiss"){
  //       console.log(" Forgot Password modal dismissed..!");
  //     }else{
  //           if(data.modalType == "forgotPassword"){
  //               this.mailID = data.modalData.emailId;
  //               alert(this.mailID);
  //               // this.serviceRequestCall(data);

  //                 if(this.platform.is('cordova')){
  //                     LocalNotifications.schedule({
  //                             title: "Password Reset",
  //                             text: "password Reset code is 1234",
  //                             at: new Date(new Date().getTime() + 2 * 1000),
  //                             // sound: null
  //                         });
  //                   console.log("forgot Password modal submitted..!");

  //                   LocalNotifications.on("click", (notification, state) => {
  //                   let alert = this.alertCtrl.create({
  //                       title: "Notification Clicked",
  //                       subTitle: "You just clicked the scheduled notification",
  //                       buttons: ["OK"]
  //                       });
  //                     alert.present();
  //                     });
                      
  //                   }else{
  //                     console.log("current platform is not cordova..");
  //                   }
  //                   this.resetPassword();
  //           }else{
  //               this.newPassword = data.modalData.newPassword;
  //               this.providerService.showToast("Password Reset Successful..!")
  //           }
  //       }
  //     })  
  //   passwordModal.present();


  // }

ionViewDidLoad() {
    console.log('ionViewDidLoad DependentsPage');
  }

}
