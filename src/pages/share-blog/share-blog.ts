import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ViewController,ToastController } from 'ionic-angular';
import { BlogListService } from '../../providers/blog-list-service';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { BlogsPage } from '../../pages/blogs/blogs';
/*
  Generated class for the ShareBlogPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-share-blog',
  templateUrl: 'share-blog.html',
  providers:[BlogListService]
})
export class ShareBlogPagePage {
connectionInfo:any;
shareForm: FormGroup;
rootUrl:any;
BlogId:any;
friendsId:any;
selectedConnections:any;
selectedCommunity:any;
submitAttempt: boolean = false;
description:any;
communitylists:any=[];
friends:boolean=false;
community:boolean=false;
  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public formBuilder: FormBuilder,public viewCtrl: ViewController,public storage:Storage, public navParams: NavParams,public loadingCtrl: LoadingController,public blogListService:BlogListService) {  
      this.storage.ready().then(() => {     
        storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
          this.getConnections(this.rootUrl);
      });
        this.BlogId = navParams.get("blogID");
        this.communitylists = navParams.get("communitylists");
   });
  this.shareForm = formBuilder.group({
        description: ['', Validators.compose([Validators.required])]
         });

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  getConnections(rootUrl){
  let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();    
      this.blogListService.getConnections(rootUrl).subscribe(connections => {
        this.connectionInfo=connections.result;
        //console.log(this.connectionInfo);
        loader.dismiss();
     },
   err =>{
    loader.dismiss();
      this.blogListService.showErrorToast(err);
  })
 }
  friendslist(searchValue){
    if(this.connectionInfo.length == 0){
      this.showToaster("There is no connections");
    }
    else{
       this.selectedCommunity ="";
       this.community=false;
       this.friends=!searchValue;
    }
   }
   communitylistsss(searchValues){
    this.selectedConnections = "";
    this.friends=false;
     this.community=!searchValues;
   }
 shareBlogToFriends(){ 
 if(this.selectedConnections != undefined || this.selectedCommunity != undefined){
 this.friendsId={};
 for (var i = 0; i < this.selectedConnections.length; i++) {
   this.friendsId[i]= {"id":this.selectedConnections[i]};
 };
 if(!this.shareForm.valid){
      this.submitAttempt = true;
    }else{
      this.submitAttempt = false;
 let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();    
      this.blogListService.shareBlog(this.BlogId,this.friendsId,this.description,this.selectedCommunity).subscribe(connections => {
      
        loader.dismiss();
        this.showToaster(connections.result);
        this.navCtrl.setRoot(BlogsPage);
        this.dismiss();
     },
    (err) => { 
        if(err.status===401)
        {
        this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
        loader.dismiss();
      });
    }
      }else{
        this.showToaster("Please Select atleast one ");
      
    }
 }
  public showToaster(message)
  {
   let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
        });
   toast.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShareBlogPagePage');
  }

}
