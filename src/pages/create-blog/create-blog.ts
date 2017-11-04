import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera } from 'ionic-native';


import { BlogListService } from '../../providers/blog-list-service';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { BlogsPage } from '../../pages/blogs/blogs';
import { ManageBlogsPage } from '../../pages/manage-blogs/manage-blogs';

/*
  Generated class for the CreateBlog page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-blog',
  templateUrl: 'create-blog.html',
  providers:[BlogListService]
  
})
export class CreateBlogPage {
token:string;
imageUrl:string;
blogObject:any;
categoriesList:any;
highlights:any='';
tags:any=[];
allowComments:any=1;
items:any;
featuredImage:any='';
tagsModel:any=[];
bannerImage:any='';
blogForm: FormGroup;
submitAttempt: boolean = false;
blogTitle:any="Create Blog";
blogId:any=0;
action:any="add";
title:any='';
category:any='';
description:any='';
user_id:any=0;
user_type:any='';
actionUrl:any='addBlog';
  constructor(public formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public blogListService:BlogListService,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
    this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('id').then((id) => { this.user_id=id;});
      storage.get('user_type').then((user_type) => { this.user_type=user_type;});
      storage.get('token').then((token) => { this.token=token; 
       this.blogId=navParams.get("blogId");
       this.action=navParams.get("action");     
       if(this.blogId>0 && this.action=='edit')
       {
         this.blogTitle="Edit Blog";
         this.getEditBlog(this.blogId);
       }
     // this.getBlogCategories();      
      })
    });
    this.blogForm = formBuilder.group({
        title: ['', Validators.compose([Validators.required])],
        category:['', Validators.compose([Validators.required])],
        description: ['', Validators.compose([Validators.required])]
         });
  }
ionViewDidEnter() {
     this.storage.ready().then(() => {
      this.storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      this.storage.get('id').then((id) => { this.user_id=id;});
      this.storage.get('user_type').then((user_type) => { this.user_type=user_type;});
      this.storage.get('token').then((token) => { this.token=token; 
       this.blogId=this.navParams.get("blogId");
       this.action=this.navParams.get("action");     
       if(this.blogId>0 && this.action=='edit')
       {
         this.blogTitle="Edit Blog";
         this.getEditBlog(this.blogId);
       }
      this.getBlogCategories();      
      })
    });  
  }
  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
  getEditBlog(blogId)
  {
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.blogListService.getEditBlog(blogId).subscribe(
     (getEditBlog) => {
      this.title=getEditBlog.result.title; 
      this.category =getEditBlog.result.category;   
      this.highlights= getEditBlog.result.highlights; 
      this.description= getEditBlog.result.description;
      if(getEditBlog.result.featured_image!='')
      {     
      this.featuredImage= this.imageUrl+getEditBlog.result.featured_image;  
      }
      if(getEditBlog.result.banner_image!='')
      {
      this.bannerImage= this.imageUrl+getEditBlog.result.banner_image;
      }
      let tagsObject=getEditBlog.result.tags;
      for(let i=0; Object.keys(tagsObject).length>i;i++)
      {
      this.tagsModel[i]=tagsObject[i].name;  
      }  
      this.allowComments=getEditBlog.result.allow_comment;  
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
  public getBlogCategories()
  {
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.blogListService.getBlogCategory().subscribe(
     (getBlogCategories) => {
      this.categoriesList=getBlogCategories.result;  
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
  getTagsList($event)
  {

    let tagsInput=$event.target.value;
    if(tagsInput!='')
    {
    this.blogListService.getTagsList(tagsInput).subscribe(
     (getTagsList) => {
       this.tags=[];
       for (let i = 0; i < Object.keys(getTagsList).length; i++) {
        this.tags.push(getTagsList[i].name);
       
        }         
    },
    (err) => { 
        if(err.status===401)
        {
       // this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Try again later");
        }
      }
    );
    }
  }

   accessGallery(type){
   Camera.getPicture({
     sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
     destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
      if(type == 'banner'){
      this.bannerImage = 'data:image/jpeg;base64,'+imageData;  
    }else{
      this.featuredImage = 'data:image/jpeg;base64,'+imageData;
    }
      
     }, (err) => {
      console.log(err);
    });
  }


  public createBlog()
  { 
    console.log(this.featuredImage);
    if(!this.blogForm.valid){
      this.submitAttempt = true;
    }else{
      this.submitAttempt = false;

    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();

    let tagsObj=[];
    if(this.tagsModel.length>0)
    {     
      for(let j=0;j<this.tagsModel.length;j++)
      {
        tagsObj.push({"name":this.tagsModel[j]})
      }
    }
   
    this.blogObject={ "category":this.blogForm.value.category,"allow_comment":this.allowComments,"title":this.blogForm.value.title,"highlights":this.highlights,
        "description":this.blogForm.value.description,"featured_image":this.featuredImage,"banner_image":this.bannerImage,"tags":tagsObj,"app":''
    };
    if(this.action=='edit') 
    {
      this.actionUrl='editBlog/'+this.blogId;
     this.blogObject.id=this.blogId;
     this.blogObject.author=this.user_id;
     this.blogObject.author_type=this.user_type;
     console.log(this.blogObject);
    }
    
    this.blogListService.createBlog(this.blogObject,this.actionUrl).subscribe(
     (createBlog) => {
      this.navCtrl.push(ManageBlogsPage);
      this.showToaster(createBlog.result);
      this.category = "";
      this.allowComments = "";
      this.title = "";
      this.highlights = "";
      this.description = "";
      loader.dismiss();
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
        loader.dismiss();
      }
    );
    
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
}
