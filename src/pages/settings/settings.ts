import { Component, ViewChild } from '@angular/core';
import { Slides, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
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
  @ViewChild(Slides) slides: Slides;
  settings:string="privacy";
  records:number = 5;
   alert:any;
	privacy_name:any;
	privacy_email:any;
	privacy_mobile:any;
	privacy_location:any;
	privacy_birthday:any;
	privacy_avatar:any;
  privacy_connection:any;
  privacy_profile:boolean;
	status:any;
	user_uid:any;
	user_id:any;
  prev_index:any = 0;


  constructor(public storage:Storage,public loadingCtrl: LoadingController,public alertCtrl: AlertController, public serviceProvider:ServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
  console.log(this.privacy_email);
  }

  update(){
    if(this.settings=="paginate"){
      this.setPageCount();
    }else{
      this.privacy_submit();
    }
  }
  slideChanged() {
    let currentIndex = this.prev_index;
    if(currentIndex == 1){
      this.settings = "paginate";
    }else{
      this.settings = "privacy";
    }
    this.prev_index = this.slides.getActiveIndex();
  }
  changeSlide(){
    this.slides.freeMode = true;
    if(this.settings == 'privacy'){
    this.slides.slideTo(1);  
    }else{
      this.slides.slideTo(0);  
    }
    
  }
notify() {
  console.log("Toggled: "+ this.privacy_profile); 
}
  change(){
    console.log("record count updated");
  }
  getPageCount(){    
    this.serviceProvider.webServiceCall('getPageCount',"")
    .subscribe(data=>{
      this.records = data.result;      
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

  toggle(privacy){
    switch (privacy) {
      
       case "privacy_name": {
                              if(this.privacy_name == true){
                                this.privacy_name = false;
                              }else{
                                this.privacy_name = true;
                              }
                              break;
                            }
      
       case "privacy_email": {
                             if(this.privacy_email == true){
                                this.privacy_email = false;
                              }else{
                                this.privacy_email = true;
                              }
                              break;  
                             }

      case "privacy_mobile": {
                             if(this.privacy_mobile == true){
                                this.privacy_mobile = false;
                              }else{
                                this.privacy_mobile = true;
                              }
                              break;  
                             }

      case "privacy_location": {
                             if(this.privacy_location == true){
                                this.privacy_location = false;
                              }else{
                                this.privacy_location = true;
                              }
                              break;  
                             }

      case "privacy_birthday": {
                             if(this.privacy_birthday == true){
                                this.privacy_birthday = false;
                              }else{
                                this.privacy_birthday = true;
                              }
                              break;  
                             }

      case "privacy_connection": {
                             if(this.privacy_connection == true){
                                this.privacy_connection = false;
                              }else{
                                this.privacy_connection = true;
                              }
                              break;  
                             }
      case "privacy_profile": {
                             if(this.privacy_profile == true){
                                this.privacy_profile = false;
                              }else{
                                this.privacy_profile = true;
                              }
                              break;  
                             }
    }
  }


  getPrivacy(){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
  	let requestId = {"user_id":this.user_uid};
  	this.serviceProvider.webServiceCall('getPrivacy',requestId)
  	.subscribe(data=>{
      console.log("JSON.parse('true')",JSON.parse("true"));
  		let [info] = data.result;
  		this.user_id = info.id;
  		this.user_uid = info.uid;
  		this.privacy_name = JSON.parse(info.privacy_name || false);
  		this.privacy_email = JSON.parse(info.privacy_email || false);
  		this.privacy_mobile = JSON.parse(info.privacy_mobile || false);
  		this.privacy_location = JSON.parse(info.privacy_location || false);
  		this.privacy_birthday = JSON.parse(info.privacy_birthday || false);
  		// this.privacy_avatar = JSON.parse(info.privacy_avatar);
      this.privacy_connection = JSON.parse(info.privacy_connection || false);
      this.privacy_profile = JSON.parse(info.privacy_profile || false);
  		this.status = info.status;
      loader.dismiss();
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
        loader.dismiss();
  	});
  }


  privacy_submit(){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
  	let data = {"info":{
  		"id":this.user_id,
  		"uid":this.user_uid,
  		"privacy_name":this.privacy_name,
  		"privacy_email":this.privacy_email,
  		"privacy_mobile":this.privacy_mobile,
  		"privacy_location":this.privacy_location,
  		"privacy_birthday":this.privacy_birthday,
  		// "privacy_avatar":this.privacy_avatar,
      "privacy_connection":this.privacy_connection,
      "privacy_profile":this.privacy_profile,
  		"status":this.status}}
  	this.serviceProvider.webServiceCall('setPrivacy',data)
  	.subscribe(data=>{
  		this.serviceProvider.showToast(data.result);
  		this.getPrivacy();
      loader.dismiss();
  	},
  	error=>{
  		if(error.status===401){
      this.serviceProvider.showToast(JSON.parse(error._body).error);  
      }
      else{
       this.serviceProvider.showToast("Server Error..!");   
      }
      loader.dismiss();
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  ionViewWillEnter(){
     this.storage.ready().then(() => {
      this.storage.get('id').then((id) => { this.user_uid=id;
      this.getPrivacy();
      // this.getPageCount(); 
  		});
      })  
  }
  
  dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }

}
