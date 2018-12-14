import { Component,ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { ViewNewsPage } from '../../pages/view-news/view-news';
import { NewsService } from '../../providers/news-service';
import moment from 'moment';

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
  @ViewChild(Content) content: Content;
token:string;
imageUrl:string;
newsLists:any[]=[];
nextPageURL:any='';
newsScrollLists:any;
emptyRecord:any;
scrollTop:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public newsService:NewsService,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  this.storage.ready().then(() => {
    storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
        this.newsList();
    })

  });
  
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
  scrollToBottom(){
    this.content.scrollToBottom();
  }
  public newsList()
  { 
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
   this.newsService.newsList().subscribe(
     (newsList) => {
      this.newsLists=newsList.result.data;
      var dataList=newsList.result.data; 
        for(let data of dataList) {
            data.post_date = moment(data.post_date).format("DD MMM YYYY");
          } 
          this.newsLists = dataList;
      this.nextPageURL=newsList.result.next_page_url;  
      loader.dismiss(); 
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
        loader.dismiss();
      }
    );   
    
  }
   public newssearch(searchEvent) {
    let term = searchEvent.target.value;
      this.newsService.searchConnection(term).subscribe(searchConnection => {
        this.newsLists= searchConnection.result.data;
         var dataList=searchConnection.result.data; 
        for(let data of dataList) {
            data.post_date = moment(data.post_date).format("DD MMM YYYY");
          } 
          this.newsLists = dataList;
      });
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
    this.scrollTop = true;
     this.newsService.newsscroll(this.nextPageURL).subscribe(
     (newsscroll) => {
      this.newsScrollLists=newsscroll.result.data;
       var dataList=newsscroll.result.data; 
        for(let data of dataList) {
            data.post_date = moment(data.post_date).format("DD MMM YYYY");
          } 
          this.newsScrollLists = dataList;
      for (let i = 0; i < Object.keys(this.newsScrollLists).length; i++) {
        this.newsLists.push(dataList[i]);
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
          this.showToaster("Something went wrong");
        }
      }
    );
  }
}
