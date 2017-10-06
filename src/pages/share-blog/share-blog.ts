import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ViewController,ToastController } from 'ionic-angular';
import { BlogListService } from '../../providers/blog-list-service';
import { Storage } from '@ionic/storage';
import { BlogsPage } from '../../pages/blogs/blogs';
/*
  Generated class for the ShareBlogPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-share-blog',
  templateUrl: 'share-blog.html',
  providers:[BlogListService]
})
export class ShareBlogPagePage {
connectionInfo:any;
rootUrl:any;
BlogId:any;
friendsId:any;
selectedConnections:any;
  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public viewCtrl: ViewController,public storage:Storage, public navParams: NavParams,public loadingCtrl: LoadingController,public blogListService:BlogListService) {  
      this.storage.ready().then(() => {     
        storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
          this.getConnections(this.rootUrl);
      });
        this.BlogId = navParams.get("blogID");
        //console.log(this.BlogId);
   });


  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  getConnections(rootUrl){
  let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();    
      this.blogListService.getConnections(rootUrl).subscribe(connections => {
        this.connectionInfo=connections.result;
        //console.log(this.connectionInfo);
        loader.dismiss();
     },
   err =>{
    loader.dismiss();
      this.blogListService.showErrorToast(err);
  })
 }
 shareBlogToFriends(){
 //console.log(this.selectedConnections); 
 if(this.selectedConnections != undefined){
 this.friendsId={};
 for (var i = 0; i < this.selectedConnections.length; i++) {
   this.friendsId[i]= {"id":this.selectedConnections[i]};
   //console.log(this.friendsId);
 };
 console.log(this.friendsId);
 let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();    
      this.blogListService.shareBlog(this.BlogId,this.friendsId).subscribe(connections => {
       //this.connectionInfo=connections.result;
        loader.dismiss();

        this.showToaster(connections.result);
        //this.navCtrl.push(BlogsPage);

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
      });
      }else{
        this.showToaster("Please Select atleast one ");
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShareBlogPagePage');
  }

}
