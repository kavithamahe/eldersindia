import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ToastController,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { BlogListService } from '../../providers/blog-list-service';
import { DashboardPage } from '../../pages/dashboard/dashboard';
/*
  Generated class for the ManageBlogs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-manage-blogs',
  templateUrl: 'manage-blogs.html',
  providers:[BlogListService]
})
export class ManageBlogsPage {
token:string;
imageUrl:string;
manageblogsLists:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public blogListService:BlogListService,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  this.storage.ready().then(() => {
    storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
        this.manageblogs();
    })

  });
  
  }
  public manageblogs()
  { 
  	let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
   this.blogListService.manageblogs().subscribe(
     (manageblogs) => {
      
      this.manageblogsLists=manageblogs.result.data;     
    },
    (err) => { 
        if(err.status===401)
        {
        this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Try again later");
        }
      }
    );
    
    loader.dismiss();
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

}
