import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera } from 'ionic-native';


import { BlogListService } from '../../providers/blog-list-service';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { BlogsPage } from '../../pages/blogs/blogs';
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
highlights:any;
tags:any=[];
allowComments:any;
items:any;
base64Image:any;
tagsModel:any=[];
blogForm: FormGroup;
submitAttempt: boolean = false;
  constructor(public formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public blogListService:BlogListService,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
    this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
      // this.blogId=navParams.get("blogId");
      this.getBlogCategories();
      })
    });
    this.blogForm = formBuilder.group({
        title: ['', Validators.compose([Validators.required])],
        category:['', Validators.compose([Validators.required])],
        description: ['', Validators.compose([Validators.required])]
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

   accessGallery(){
   Camera.getPicture({
     sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
     destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
     }, (err) => {
      console.log(err);
    });
  }


  public createBlog()
  { 
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
        "description":this.blogForm.value.description,"featured_image":"","banner_image":"","tags":tagsObj,
        };
        
    this.blogListService.createBlog(this.blogObject).subscribe(
     (createBlog) => {
      this.navCtrl.setRoot(BlogsPage);
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
