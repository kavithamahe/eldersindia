import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ViewController,NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { BlogListService } from '../../providers/blog-list-service';
import { ServiceInfoPage } from '../../pages/service-info/service-info';
/*
  Generated class for the ElderservicePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-elderservice',
  templateUrl: 'elderservice.html',
  providers:[BlogListService]
})
export class ElderservicePagePage {
elder:any;
location_id:any;
pack_id:any;
packageId:any;
packageData:any;
rootUrl:any;
packageStatus:any;
vendorId:any;
common_type:any="";
commontype:any;
  constructor(public navCtrl: NavController,public viewCtrl: ViewController,public storage:Storage,public toastCtrl: ToastController,public loadingCtrl: LoadingController, public navParams: NavParams,public blogListService:BlogListService) {
  	 this.storage.ready().then(() => {      
    	storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
      this.packageId=navParams.get("pack_id");
       this.elder=navParams.get("elder");
        this.location_id=navParams.get("location_id");
        this.packageStatus = navParams.get("packbstatus");
  	this.getServicesForByElder();
      });     
   });
 }
 getServicesForByElder(){
  let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    loading.present();    
    this.blogListService.getServicesForByElders(this.rootUrl,this.packageId,this.elder,this.location_id)
      .subscribe(data =>{
        var dataList = data.result; 
        // this.packageData = data.result; 
        for(let data of dataList) {
           data.common_type=data.common_type;
         var str = data.common_type;
         data.common_type = str.replace("Per" ,"");
         console.log(data.common_type);

        }
       this.packageData = dataList; 
        loading.dismiss();
    },
    err =>{
      this.blogListService.showErrorToast(err);     
      loading.dismiss();
    }) 
}

getServicedetails(serviceId,vendor){
  this.vendorId={"id":vendor}
  let servieListData = {"vendor": this.vendorId, "subCategoryId": serviceId, "flag": "1", "location_id": this.location_id};
  this.navCtrl.push(ServiceInfoPage,servieListData);
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ElderservicePagePage');
  }

  dismiss(){
  	this.viewCtrl.dismiss();
  }

}
