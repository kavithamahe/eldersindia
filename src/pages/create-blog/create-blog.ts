import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { BlogListService } from '../../providers/blog-list-service';
import { DashboardPage } from '../../pages/dashboard/dashboard';

/*
  Generated class for the CreateBlog page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-blog',
  templateUrl: 'create-blog.html'
  
})
export class CreateBlogPage {
token:string;
imageUrl:string;
blogObject:any;
categoriesList:any;

category:any;
title:any;
highlights:any;
description:any;
tags:any;
allowComments:any;
items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public blogListService:BlogListService,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
      this.tags = ['Pizza', 'Pasta', 'Parmesan'];
    this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
      // this.blogId=navParams.get("blogId");
      this.getBlogCategories();
      })
    });
  }

  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
  public getBlogCategories()
  {
    this.blogListService.getBlogCategory().subscribe(
     (getBlogCategories) => {
      this.categoriesList=getBlogCategories.result;     
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
  }
  public createBlog()
  {
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.blogObject={ "category":this.category,"allow_comment":this.allowComments,"title":this.title,"highlights":this.highlights,
        "description":this.description,"featured_image":"","banner_image":"","tags[0][id]":"2",
        "tags[0][name]":"Healthcare","tags[1][name]":"hai"};
    this.blogListService.createBlog(this.blogObject).subscribe(
     (createBlog) => {
      this.showToaster(createBlog.result);
      //console.log(createBlog.result);
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
