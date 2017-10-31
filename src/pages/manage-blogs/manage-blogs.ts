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
categoryLists:any;
emptyRecord:any;
searchText:any="";
searchCategory:any = "";
searchstatus:any="";

  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public blogListService:BlogListService,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  this.storage.ready().then(() => {
    storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
        // this.manageblogs();
        // this.getCategory();
    })

  });
  
  }
  ionViewDidEnter() {
      this.storage.ready().then(() => {
    this.storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      this.storage.get('token').then((token) => { this.token=token; 
        this.manageblogs();
        this.getCategory();
    })

  });
  }
  //  inputSearch(searchEvent){
  //  this.searchText = searchEvent.target.value;
  //  this.manageblogs();
  // }
    getItems(searchEvent){
   this.searchText = searchEvent;

  this.manageblogs();
  }
  public manageblogs()
  { 
  	let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
   this.blogListService.manageblogs(this.searchCategory,this.searchText,this.searchstatus).subscribe(
     (manageblogs) => {      
      this.manageblogsLists=manageblogs.result.list.data;  
       this.blogStatus=manageblogs.result.status; 
       this.nextPageURL=manageblogs.result.list.next_page_url;
       loader.dismiss();
    },
    (err) => { 
      this.manageblogsLists =[];
        if(err.status===401)
        {
          this.emptyRecord = (JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Try again later");
          this.emptyRecord = "No Records Found"
        }
        loader.dismiss();
      }
    );   
  }
     public getCategory(){
    this.blogListService.getBlogCategories().subscribe(mycategory => {
      this.categoryLists=mycategory.result; 
  },
    err =>{
  });

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
     let confirm = this.alertCtrl.create({
      title: 'Are you sure to delete this blog',
     // message: '',
      cssClass:'alertbox',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
           let loader = this.loadingCtrl.create({ content: "Please wait..." });     
            loader.present();
           this.blogListService.deleteBlog(blogId).subscribe(
             (manageblogs) => {  
              this.showToaster(manageblogs.result);
              this.manageblogs();
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
        }
      ]
    });
  	confirm.present();
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
     this.blogListService.manageBlogscroll(this.nextPageURL,this.searchCategory,this.searchText,this.searchstatus).subscribe(
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
