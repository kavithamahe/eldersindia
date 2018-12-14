import {Component} from '@angular/core'
import { Platform, NavController,LoadingController,ModalController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { SubCategoryPage } from '../sub-category/sub-category';
import { ServiceProvider } from '../../providers/service-provider';
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
   selectserviceLocation:any;
  constructor(public alertCtrl: AlertController, public modalCtrl:ModalController,public loadingCtrl: LoadingController, public platform: Platform, public navCtrl: NavController, public providerService: ServiceProvider, public storage:Storage) {

    console.log("this is service provider page");
   this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('service_location').then((service_location) => { this.serviceLocation=service_location;});
      storage.get('token').then((token) => { this.token=token; 
      this.loadServiceProvider();
      this.loadLocations();
      //this.loadPackages();
      })
    });
  }
  locationChanged(){
     this.storage.ready().then(() => {
      this.storage.set('service_location',this.serviceLocation);
    });
   
  }
  loadServiceProvider(){
    let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    loading.present();
    // this.providerService.loadServiceOffered()
    this.providerService.webServiceCall(`getCategory`,{"location":""})
      .subscribe(data =>{
      this.services = data.result.info.category;
      var dataList=data.result.info.category;
        for(let data of dataList) {
          var str = data.icon;
          data.icon = str.replace("fas" ,"fa").replace("far" ,"fa").replace("fa fa-briefcase-medical","fa fa-briefcase");
           }
        this.services = dataList;
      loading.dismiss();
    },
    err =>{
      this.providerService.showErrorToast(err);
      this.services=[];
      loading.dismiss();
    })      
  }
  viewPackage(vendor_id){
    this.navCtrl.push(PackageDetailPagePage,{"vendor_id":vendor_id,'location_id':this.serviceLocation});
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
                            },
                      err =>{                       
                            this.providerService.showErrorToast(err);
                            });
}

  subCategory(subcategory){
    this.navCtrl.push(SubCategoryPage,{"subcategory":subcategory,'locations':this.locations});
  }


ionViewDidLoad() {
    console.log('ionViewDidLoad DependentsPage');
  }

}
