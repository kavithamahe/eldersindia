import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CompleterService } from 'ng2-completer';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { MessagesPage } from '../../pages/messages/messages';
import { MessagesService } from '../../providers/messages-service';

/*
  Generated class for the CreateMessage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-message',
  templateUrl: 'create-message.html',
  providers:[MessagesService]
})
export class CreateMessagePage {
jobId:number;
imageUrl:any;
token:any;
messageObj:any;
subject:any;
message:any;
friendsList:any=[];
toAddress:any;
getFriendsListobj:any=[];
toId:any;
toEmail:any;
user_type:any;
messageForm: FormGroup;
submitAttempt: boolean = false;
subject1:any='';
//protected captains = ['James T. Kirk', 'Benjamin Sisko', 'Jean-Luc Picard', 'Spock', 'Jonathan Archer', 'Hikaru Sulu', 'Christopher Pike', 'Rachel Garrett' ];
 constructor(public formBuilder: FormBuilder,private completerService: CompleterService,public navCtrl: NavController, public navParams: NavParams, public storage:Storage,public loadingCtrl: LoadingController,public toastCtrl: ToastController,public messagesService:MessagesService) {
  this.storage.ready().then(() => {
    storage.get('user_type').then((user_type) => { this.user_type=user_type;});
    storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
        this.getFriendsList();
    })

  });
  this.toAddress=navParams.get("to");
  this.subject1=navParams.get("subject");
   this.messageForm = formBuilder.group({
        toAddress: ['', Validators.compose([Validators.required])],
        subject: ['', Validators.compose([Validators.required])],
        message: ['', Validators.compose([Validators.required])]
         });
  }
  public getFriendsList()
  { 
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.messagesService.getFriendsList().subscribe(
     (getFriendsList) => {
       this.getFriendsListobj=getFriendsList.result;
      for(let i=0;i<getFriendsList.result.length;i++)
      {
      this.friendsList[i]=getFriendsList.result[i].friend_name; 
      }
          
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
  public sendMessage()
  {
    if(!this.messageForm.valid){
      this.submitAttempt = true;
    }else{
     let subject= this.messageForm.value.subject;
     let message= this.messageForm.value.message;
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();

     for(let i=0;i<this.getFriendsListobj.length;i++)
      {
      if(this.toAddress==this.getFriendsListobj[i].friend_name)
      {
      this.toId=this.getFriendsListobj[i].id; 
      this.toEmail=this.getFriendsListobj[i].email; 
      }
      }
    this.messageObj= {"message":{"attachments":[],"to":{"title":this.toAddress,"description":this.toEmail,"image":"","originalObject":{"id":this.toId,"avatar":"","email":this.toEmail,"user_type":this.user_type,"friend_name":""}},"subject":subject,"message":message}};
    this.messagesService.sendMessage(this.messageObj).subscribe(
     (sendMessage) => { 
       this.toAddress='';
       this.subject='';
       this.message='';
       this.navCtrl.setRoot(MessagesPage);
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
