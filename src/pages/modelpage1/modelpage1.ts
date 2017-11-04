import { Component } from '@angular/core';
import { NavController,NavParams, ViewController,LoadingController,ModalController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ServiceProvider } from '../../providers/service-provider';
import { SubcategoryListPage } from '../../pages/subcategory-list/subcategory-list';


import { Storage } from '@ionic/storage';

/*
  Generated class for the Modelpage1Page page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modelpage1',
  templateUrl: 'modelpage1.html'
})
export class Modelpage1PagePage {

  serviceDatas:any;
  name:any;
  serviceType:any;
  datetime:any;
  preferred_time:any;
  serviceTitle:any;
  constructor(public modalCtrl: ModalController,public nav: NavController,public navParams: NavParams, public formBuilder: FormBuilder, public storage:Storage ,public loadingCtrl: LoadingController,public providerService: ServiceProvider,public params: NavParams,public viewCtrl: ViewController)
   {  
    this.serviceDatas =  navParams.get("serviceDatas");
    this.serviceType = this.serviceDatas.serviceType;
    this.datetime = this.serviceDatas.datetime;
    this.preferred_time = this.serviceDatas.preferred_time;
    this.name = navParams.get("name"); 
    this.serviceTitle = navParams.get("serviceTitle"); 
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Modelpage1PagePage');
  }
  submit() {
    let seviceCheck = "1";
   this.viewCtrl.dismiss(seviceCheck);
   console.log(seviceCheck);
    
}
edit(){
  let seviceCheck = "0";
  this.viewCtrl.dismiss(seviceCheck);
   console.log(seviceCheck);
}
 dismiss(){
      this.viewCtrl.dismiss("dismiss");
  }
}
