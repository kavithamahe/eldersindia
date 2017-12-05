import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,LoadingController,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PackageRequestPagePage }  from '../../pages/package-request/package-request';
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
connectionInfo:any;
rootUrl:any;
packId:any;
user_type:any;
selectedConnections:any;
dependentLists:any=[];
  constructor(public navParams: NavParams,public navCtrl: NavController,public toastCtrl: ToastController,public viewCtrl: ViewController,public storage:Storage,public loadingCtrl: LoadingController,public blogListService:BlogListService) {

  	this.storage.ready().then(() => { 
    storage.get('user_type').then((user_type) => { 
        this.user_type=user_type;
      });    
        storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
          //this.getConnections(this.rootUrl);
      });

      
      
   
        this.packId = navParams.get("packID");
        this.dependentLists = navParams.get("dependents");
   });
  }
  dismiss(){
  	this.viewCtrl.dismiss();
  }

    getPackage(){
  let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();    
      this.blogListService.getPackage(this.selectedConnections,this.packId).subscribe(connections => {
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad GetpackagePagePage');
  }

}
