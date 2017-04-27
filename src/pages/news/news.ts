import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { ViewNewsPage } from '../../pages/view-news/view-news';
import { NewsService } from '../../providers/news-service';

/*
  Generated class for the News page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
  providers:[NewsService]
})
export class NewsPage {
token:string;
imageUrl:string;
newsLists:any[]=[];
nextPageURL:any='';
newsScrollLists:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public newsService:NewsService,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  this.storage.ready().then(() => {
    storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
        this.newsList();
    })

  });
  
  }
  public newsList()
  { 
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
   this.newsService.newsList().subscribe(
     (newsList) => {
      this.newsLists=newsList.result.data;  
      this.nextPageURL=newsList.result.next_page_url;   
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
  public viewNews(newsId)
  {
   this.navCtrl.push(ViewNewsPage, {newsId});
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

  doInfinite(infiniteScroll) {
    setTimeout(() => {      
      if(this.nextPageURL!=null && this.nextPageURL!='')
      {
       this.newsscroll();
      }
      else{
        infiniteScroll.enable(false);
      }
      infiniteScroll.complete();
    }, 500);
  }
  newsscroll()
  {
     this.newsService.newsscroll(this.nextPageURL).subscribe(
     (newsscroll) => {
      this.newsScrollLists=newsscroll.result.data;
      for (let i = 0; i < Object.keys(this.newsScrollLists).length; i++) {
        this.newsLists.push(this.newsScrollLists[i]);
        }
      
       this.nextPageURL=newsscroll.result.next_page_url;     
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
}
