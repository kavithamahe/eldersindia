import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { BlogListService } from '../../providers/blog-list-service';
import { DashboardPage } from '../../pages/dashboard/dashboard';
/*
  Generated class for the Singleblog page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-singleblog',
  templateUrl: 'singleblog.html'
})
export class SingleblogPage {
blogId:number;
singleBlogInfo:{};
token:string;
imageUrl:string;
commandObj:any;
comment:any;
showComment:any;
viewCommentsList:any;
user_id:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public blogListService:BlogListService,public storage:Storage,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  	this.storage.ready().then(() => {
  	  storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('id').then((id) => { this.user_id=id;});
      storage.get('token').then((token) => { this.token=token; 
       this.blogId=navParams.get("blogId");
  		this.onInit(this.blogId);
      this.viewComments(this.blogId);
      })
  	});
    this.showComment=true;
  }
  public leaveComment()
  {
    this.showComment=!this.showComment;
  }
  public onInit(blogId)
  {
  	let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.blogListService.singleBlog(blogId).subscribe(
     (singleBlog) => {
      this.singleBlogInfo=singleBlog.result;     
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
  public blogComment(blogId)
  {
  	let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.commandObj={"comment":this.comment};
    this.blogListService.blogComment(blogId,this.commandObj).subscribe(
     (blogComment) => {
       this.viewComments(this.blogId);
     this.showToaster(blogComment.result);   
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
    this.comment='';
     loader.dismiss();
  }
  public viewComments(blogId)
  {
    this.blogListService.viewComments(blogId).subscribe(
     (viewComments) => {
      this.viewCommentsList=viewComments.result;     
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
  public deleteComment(commentId)
  {
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.blogListService.deleteComment(commentId).subscribe(
     (deleteComment) => {
       this.viewComments(this.blogId);
     this.showToaster(deleteComment.result);   
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
  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
}
