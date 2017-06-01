import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { BlogListService } from '../../providers/blog-list-service';
import { SingleblogPage } from '../../pages/singleblog/singleblog';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CreateBlogPage } from '../../pages/create-blog/create-blog';
import { ManageBlogsPage } from '../../pages/manage-blogs/manage-blogs';
/*
  Generated class for the Blogs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-blogs',
  templateUrl: 'blogs.html',
  providers:[BlogListService]
})
export class BlogsPage {
blogsList:any;
bloglists:any;
token:string;
imageUrl:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public blogListService:BlogListService,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  this.storage.ready().then(() => {
    storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
        this.blog();
    })

  });
  
  }
  public blog()
  { 
  	let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
   this.blogListService.blogList().subscribe(
     (blogsList) => {
      
      this.bloglists=blogsList.result.data; 
      loader.dismiss();    
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
        loader.dismiss();
      }
    );   
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
  public viewBlog(blogId)
  {
   this.navCtrl.push(SingleblogPage, {blogId});
  }
  public createBlog()
  {
   this.navCtrl.push(CreateBlogPage);
  }
  public manageBlog()
  {
   this.navCtrl.push(ManageBlogsPage);
  }
}
