import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { BlogListService } from '../../providers/blog-list-service';
import { SingleblogPage } from '../../pages/singleblog/singleblog';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CreateBlogPage } from '../../pages/create-blog/create-blog';
import { ManageBlogsPage } from '../../pages/manage-blogs/manage-blogs';

@Component({
  selector: 'page-blogs',
  templateUrl: 'blogs.html',
  providers:[BlogListService]
})
export class BlogsPage {
blogsList:any=[];
bloglists:any=[];
token:string;
imageUrl:string;
nextPageURL:any='';
eventScrollLists:any;
emptyRecord:any;
categoryLists:any;
searchCategory1:any = "";
searchText:any="";

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public blogListService:BlogListService,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  this.storage.ready().then(() => {
    storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
        let loader = this.loadingCtrl.create({ content: "Please wait..." });     
        loader.present();
        // this.blog();
        // this.getCategory();
        loader.dismiss(); 
    })

  });
  
  }
  ionViewDidEnter() {
    this.storage.ready().then(() => {
    this.storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      this.storage.get('token').then((token) => { this.token=token; 
        let loader = this.loadingCtrl.create({ content: "Please wait..." });     
        loader.present();
        this.blog();
        this.getCategory();
        loader.dismiss(); 
    })

  });
  }
  public blog()
  { 
  	
   this.blogListService.blogList(this.searchCategory1,this.searchText).subscribe(
     (blogsList) => {
      
      this.bloglists=blogsList.result.data;
      if(this.bloglists.length<=0)
      {
        this.emptyRecord="No record found";
      }
      this.nextPageURL=blogsList.result.next_page_url; 
         
    },
    (err) => { 
        if(err.status===401)
        {
          this.emptyRecord = (JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Try again later");
          this.emptyRecord = "No Records Found"
        }
        //loader.dismiss();
      }
    );   
  }
  getItems(searchEvent){
   this.searchText = searchEvent;

  this.blog();
  }
   public getCategory(){
    this.blogListService.getBlogCategories().subscribe(mycategory => {
      this.categoryLists=mycategory.result; 
  },
    err =>{
  });

  }
  /*public blogsearch(searchEvent) {
    let term = searchEvent.target.value;
      this.blogListService.searchConnection(term).subscribe(searchConnection => {
        this.bloglists= searchConnection.result.data;
      });
  }*/
doInfinite(infiniteScroll) {
    setTimeout(() => {      
      if(this.nextPageURL!=null && this.nextPageURL!='')
      {
       this.blogscroll();
      }
      else{
        infiniteScroll.enable(false);
      }
      infiniteScroll.complete();
    }, 500);
  }
  blogscroll()
  {
     this.blogListService.eventsscroll(this.searchCategory1,this.searchText,this.nextPageURL).subscribe(
     (eventsscroll) => {
      this.eventScrollLists=eventsscroll.result.data;
      for (let i = 0; i < Object.keys(this.eventScrollLists).length; i++) {
        this.bloglists.push(this.eventScrollLists[i]);
        }
      
       this.nextPageURL=eventsscroll.result.next_page_url;     
    },
    err =>{
   
    if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Try again later");
        }
      });
  }
  // inputSearch(searchEvent){
  //  this.searchText = searchEvent.target.value;
  //  this.blog();
  // }
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
