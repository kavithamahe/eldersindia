import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { NewsService } from '../../providers/news-service';
import moment from 'moment';

/*
  Generated class for the ViewNews page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-news',
  templateUrl: 'view-news.html',
  providers:[NewsService]
})
export class ViewNewsPage {
token:string;
imageUrl:string;
NewsInfo:any;
newsId:number;
post_date:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public newsService:NewsService,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
    this.newsId=navParams.get("newsId");
    this.storage.ready().then(() => {
    storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
        this.viewNews(this.newsId);
    })

  });
  
  }

  public viewNews(newsId)
  { 
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
   this.newsService.viewNews(newsId).subscribe(
     (viewNews) => {
      this.NewsInfo=viewNews.result; 
      this.post_date = moment(viewNews.result.post_date).format("DD MMM YYYY HH:mm:ss");
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
}
