import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ToastController,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { BlogListService } from '../../providers/blog-list-service';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CreateBlogPage } from '../../pages/create-blog/create-blog';
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
blogStatus:any=[];
nextPageURL:any='';
manageBlogscrollLists:any=[];
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
      
      this.manageblogsLists=manageblogs.result.list.data;  
       this.blogStatus=manageblogs.result.status; 
       this.nextPageURL=manageblogs.result.list.next_page_url;
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
  deleteBlog(blogId)
  {
  	let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
   this.blogListService.deleteBlog(blogId).subscribe(
     (manageblogs) => {  
      this.showToaster(manageblogs.result);
      this.manageblogs();
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
  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
  doInfinite(infiniteScroll) {
    setTimeout(() => {      
      if(this.nextPageURL!=null && this.nextPageURL!='')
      {
       this.manageBlogscroll();
      }
      else{
        infiniteScroll.enable(false);
      }
      infiniteScroll.complete();
    }, 500);
  }
  manageBlogscroll()
  {
     this.blogListService.manageBlogscroll(this.nextPageURL).subscribe(
     (manageBlogscroll) => {
      this.manageBlogscrollLists=manageBlogscroll.result.list.data; 
      for (let i = 0; i < Object.keys(this.manageBlogscrollLists).length; i++) {
        this.manageblogsLists.push(this.manageBlogscrollLists[i]);
        }
      
       this.nextPageURL=manageBlogscroll.result.list.next_page_url;  
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
  editBlog(blogId,action)
  {
  	let editObj={"blogId":blogId,"action":action};
   this.navCtrl.push(CreateBlogPage, editObj);
  }
}
