import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,LoadingController,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
packId:any;
rootUrl:any;
  constructor(public navParams: NavParams,public toastCtrl: ToastController,public viewCtrl: ViewController,public storage:Storage,public loadingCtrl: LoadingController,public blogListService:BlogListService) {
  	// this.storage.ready().then(() => {     
   //      storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
   //        this.getConnections(this.rootUrl);
   //    });
   //      this.packId = navParams.get("packID");
   //      console.log(this.packId);
   // });

  }
  dismiss(){
  	this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GetpackagePagePage');
  }

}
