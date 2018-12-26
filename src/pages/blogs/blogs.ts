import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController,AlertController,Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { BlogListService } from '../../providers/blog-list-service';
import { SingleblogPage } from '../../pages/singleblog/singleblog';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CreateBlogPage } from '../../pages/create-blog/create-blog';
import moment from 'moment';

@Component({
  selector: 'page-blogs',
  templateUrl: 'blogs.html',
  providers:[BlogListService]
})
export class BlogsPage {
  viewblog:string;
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
searchButton:boolean=false;
manageblogsLists:any=[];
blogStatus:any=[];
manageBlogscrollLists:any=[];
searchCategory:any = "";
searchstatus:any="";
create_blog:any;

  constructor(public alertCtrl: AlertController,public platform:Platform,public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public blogListService:BlogListService,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  this.viewblog="view_blog";
  this.create_blog = navParams.get("create_blog");
  if(this.create_blog == "1"){
    this.viewblog="manage_blog";
      this.storage.ready().then(() => {
    storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
    this.manageblogs();
      })
  });
    }
  this.storage.ready().then(() => {
    storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
        // let loader = this.loadingCtrl.create({ content: "Please wait..." });     
        // loader.present();
        this.blog();
        this.getCategory();
        // loader.dismiss(); 
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
   searchCall(searchValue){
     this.searchButton=!searchValue;
   }
  onSelectChange(selectedValue: any) {
   // if(this.searchCategory1 == "All"){
   //  this.searchCategory1 = "";
   //  this.blog();
   // }
   // else{
      this.searchCategory1 = selectedValue;
    this.blog();
  // }
  
  }
  public blog()
  { 
   this.blogListService.blogList(this.searchCategory1,this.searchText).subscribe(
     (blogsList) => {
      
      this.bloglists=blogsList.result.data;
      var dataList=blogsList.result.data;
        for(let data of dataList) {
          data.created_at = moment(data.created_at).format("DD MMM YYYY HH:mm:ss");
        }
        this.bloglists = dataList;
      this.nextPageURL=blogsList.result.next_page_url; 
         
    },
    (err) => { 
        if(err.status===401)
        {
          this.emptyRecord = (JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
          this.emptyRecord = "No Records Found"
        }
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
       var dataList=eventsscroll.result.data;
        for(let data of dataList) {
          data.created_at = moment(data.created_at).format("DD MMM YYYY HH:mm:ss");
        }
        this.eventScrollLists = dataList;
      for (let i = 0; i < Object.keys(this.eventScrollLists).length; i++) {
        this.bloglists.push(dataList[i]);
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
          this.showToaster("Something went wrong");
        }
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
  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
  public viewBlog(blogId,allow_comment,created_at)
  {
   this.navCtrl.push(SingleblogPage, {blogId,allow_comment,created_at});
  }
   public createBlog()
  {
   this.navCtrl.push(CreateBlogPage);
  }
  public manageblogs()
  {
      let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
   this.blogListService.manageblogs(this.searchCategory,this.searchText,this.searchstatus).subscribe(
     (manageblogs) => {      
      this.manageblogsLists=manageblogs.result.list.data;
      var dataList=manageblogs.result.list.data;
        for(let data of dataList) {
          data.created_at = moment(data.created_at).format("DD MMM YYYY HH:mm:ss");
           }
        this.manageblogsLists = dataList;
       this.blogStatus=manageblogs.result.status; 
       this.nextPageURL=manageblogs.result.list.next_page_url;
       loader.dismiss();
    },
    (err) => { 
      this.manageblogsLists =[];
        if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
          this.emptyRecord = (JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
          this.emptyRecord = "No Records Found"
        }
        loader.dismiss();
      }
    );   
  }

     getItemss(searchEvent){
   this.searchText = searchEvent;

  this.manageblogs();
  }
 doInfinites(infiniteScroll) {
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
      var dataList=manageBlogscroll.result.list.data;
        for(let data of dataList) {
          data.created_at = moment(data.created_at).format("DD MMM YYYY HH:mm:ss");
           }
        this.manageBlogscrollLists = dataList;
      for (let i = 0; i < Object.keys(this.manageBlogscrollLists).length; i++) {
        this.manageblogsLists.push(dataList[i]);
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
          this.showToaster("Something went wrong");
        }
      }
    );
  }
  editBlog(blogId,action)
  {
    let editObj={"blogId":blogId,"action":action};
   this.navCtrl.push(CreateBlogPage, editObj);
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
                  this.showToaster("Something went wrong");
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
}
