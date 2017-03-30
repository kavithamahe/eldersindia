import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';



import { DashboardPage } from '../../pages/dashboard/dashboard';
import { MessagesService } from '../../providers/messages-service';

/*
  Generated class for the CreateMessage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-message',
  templateUrl: 'create-message.html'
})
export class CreateMessagePage {
jobId:number;
imageUrl:any;
token:any;
messageObj:any;
toAddress:any;
subject:any;
message:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage,public loadingCtrl: LoadingController,public toastCtrl: ToastController,public messagesService:MessagesService) {
    this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; })
    });
  }

  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
  public sendMessage()
  {
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.messageObj= {"message":{"attachments":[],"to":{"title":"saran dad","description":"sarandad@gmail.com","image":"","originalObject":{"id":5,"avatar":"","email":"sarandad@gmail.com","user_type":"elder","friend_name":"saran dad"}},"subject":this.subject,"message":this.message}};
    this.messagesService.sendMessage(this.messageObj).subscribe(
     (sendMessage) => { 
       this.toAddress='';
       this.subject='';
       this.message='';
      this.showToaster(sendMessage.result); 
      //console.log(singleJob);
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

}
