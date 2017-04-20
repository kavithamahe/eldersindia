import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ServiceProvider } from '../../providers/service-provider';
import { DashboardPage } from '../../pages/dashboard/dashboard';
/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  settings:string="paginate";
  records:number = 5;

	privacy_name:any;
	privacy_email:any;
	privacy_mobile:any;
	privacy_location:any;
	privacy_birthday:any;
	privacy_avatar:any;
	status:any;
	user_uid:any;
	user_id:any;


  constructor(public storage:Storage, public serviceProvider:ServiceProvider, public navCtrl: NavController, public navParams: NavParams) {}

  update(){
    if(this.settings=="paginate"){
      this.setPageCount();
    }else{
      this.privacy_submit();
    }
  }
  change(){
    console.log("record count updated");
  }
  getPageCount(){
    this.serviceProvider.webServiceCall('getPageCount',"")
    .subscribe(data=>{
      this.records = data.result;
      console.log("get page count: ",data);
    },
    error=>{
        if(error.status===401)
        {
        this.serviceProvider.showToast(JSON.parse(error._body).error);
        }
        else
        {
          this.serviceProvider.showToast("Error while fetching results");
        }
    });
  }

  setPageCount(){
    let pageCount= {pageCount:this.records};

    this.serviceProvider.webServiceCall('setPageCount',pageCount)
    .subscribe(data=>{
      this.records = data.paginate_value;
      this.serviceProvider.showToast(data.result);
    },
    error=>{
            if(error.status===401)
        {
        this.serviceProvider.showToast(JSON.parse(error._body).error);
        }
        else
        {
          this.serviceProvider.showToast("Error while fetching results");
        }
    });
  }


  getPrivacy(){
  	let requestId = {"user_id":this.user_uid};
  	this.serviceProvider.webServiceCall('getPrivacy',requestId)
  	.subscribe(data=>{
  		let [info] = data.result;
  		this.user_id = info.id;
  		this.user_uid = info.uid;
  		this.privacy_name = info.privacy_name;
  		this.privacy_email = info.privacy_email;
  		this.privacy_mobile = info.privacy_mobile;
  		this.privacy_location = info.privacy_location;
  		this.privacy_birthday = info.privacy_birthday;
  		this.privacy_avatar = info.privacy_avatar;
  		this.status = info.status;
  	},
  	error=>{
      if(error.status===401)
        {
        this.serviceProvider.showToast(JSON.parse(error._body).error);
        }
        else
        {
          this.serviceProvider.showToast("Error while fetching results");
        }
  	});
  }


  privacy_submit(){
  	let data = {"info":{
  		"id":this.user_id,
  		"uid":this.user_uid,
  		"privacy_name":String(this.privacy_name),
  		"privacy_email":String(this.privacy_email),
  		"privacy_mobile":String(this.privacy_mobile),
  		"privacy_location":String(this.privacy_location),
  		"privacy_birthday":String(this.privacy_birthday),
  		"privacy_avatar":String(this.privacy_avatar),
  		"status":this.status}}
  	this.serviceProvider.webServiceCall('setPrivacy',data)
  	.subscribe(data=>{
  		this.serviceProvider.showToast(data.result);
  		console.log(data);
  		this.getPrivacy();
  	},
  	error=>{
  		if(error.status===401){
      this.serviceProvider.showToast(JSON.parse(error._body).error);  
      }
      else{
       this.serviceProvider.showToast("Server Error..!");   
      }
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  ionViewWillEnter(){
     this.storage.ready().then(() => {
      this.storage.get('id').then((id) => { this.user_uid=id;
      this.getPrivacy();
      this.getPageCount(); 
  		});
      })  
  }

  dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }

}
