import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Device } from "@ionic-native/device";


import { DashboardPage } from '../../pages/dashboard/dashboard';

import { ServiceProvider } from '../../providers/service-provider';


/*
  Generated class for the SafemePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-safeme',
  templateUrl: 'safeme.html'
})
export class SafemePagePage {
  user_type_id:any;
  user_type:any;
  sponsor_id:any;
  elder_id:any;
  apilog_list:any =[];
  api_data:any;
  vendor_id:any;
  sponsorid:any;

  constructor(public navCtrl: NavController, private device: Device,public loadingCtrl: LoadingController,public navParams: NavParams,public storage:Storage,public providerService: ServiceProvider) {
          console.log("Device UUID is: " + this.device.uuid);
          storage.get('user_type_id').then((user_type_id) => { this.user_type_id=user_type_id; 
          storage.get('user_type').then((user_type) => { this.user_type=user_type;
          storage.get('sponsor_id').then((sponsor_id) => { this.sponsorid=sponsor_id;}) 
       this.apiLogList(this.user_type_id);
        })
        })
          this.api_data = navParams.get("apiData");
          console.log(this.api_data);
          storage.get('vendor_id').then((vendor_id) => { this.vendor_id=vendor_id;})
          
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SafemePagePage');
  }
 public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
apiLogList(user_type_id){
  if(this.user_type == "elder"){
    this.sponsor_id = "";
    this.elder_id = user_type_id;
  }
  else{
    this.sponsor_id = user_type_id;
    this.elder_id = "";
  }
        let servieListData = {"info":{"elder_id":this.elder_id,"sponsor_id":this.sponsor_id}};
      this.providerService.webServiceCall(`apiLogsList`,servieListData)
        .subscribe(
          data =>{
                this.apilog_list = data.result.info;
                  },
          err =>{
                   this.providerService.showErrorToast(err);
                })
}
close(call_id,api_name,imei_number){
      let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
      let servieListData = {"call_id":call_id,"vendor_id":this.vendor_id,"sponsor_id":this.sponsorid,"elder_id":this.user_type_id,"imei":imei_number,"requestName":api_name};
      this.providerService.webServiceCall(`getApiIntegrationCancel`,servieListData)
        .subscribe(
          data =>{
                this.apiLogList(this.user_type_id);
                if(data.result.success_msg != ""){
                  this.providerService.showToast(data.result.success_msg);
                }
                else{
                   this.providerService.showToast(data.result.error_msg);
                 }
                loading.dismiss();
                  },
          err =>{
            loading.dismiss();
                   this.providerService.showErrorToast(err);
                })
}
  
}
