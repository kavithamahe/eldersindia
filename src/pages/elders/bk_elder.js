// import { Component } from '@angular/core';
// import { NavController,LoadingController, NavParams,Nav } from 'ionic-angular';
// import { ManagePage } from '../manage/manage';
// import {FormBuilder,FormGroup,Validators} from '@angular/forms';
// import { CommunityServices } from '../../providers/community-services';
// import { Elderform } from '../validators/elderform';
// @Component({
//   selector: 'page-elders',
//   templateUrl: 'elders.html'
// })
// export class EldersPage {
// authForm : FormGroup;
//   functionalArea:any;
//   educational:any;
//   specializations:any;
//   locations:any;
//   areaOfInterest:any;
//   skills:any;
//   gender: string = "f";
//   service:string;
//   education:any;
//   adds:any;
//   elder:any;
//   datas:any=[{name:""}];
//   lists:any=[{name:""}];
//   items:any=[{name:""}];
//   experience:any=[];
//   elderId:any;
//   elderName:String="";
//   contactNumber:String="";
//   city:String="";
//   state:String="";
//   services:String="";
//   address:String="";
//   graduation:String = "";
//   elderGraduation:any;
//   elderSpecialization:String = "";
//   relation:String = "";
//   years:String = "";
//   college:String = "";
//   number:String = "";
//   emergency:String = "";
//   fuctionality:String = "";
//   dob:any;
//   email:String = "";
//   password:String = "";
//   today:any;
//   sponser_id:any;
//   educationDetails:any;
//   functional_area:any;
//   elderExperience:any = [];
//   constructor(public nav: NavController, public formBuilder: FormBuilder, public navParams: NavParams, public communityServices: CommunityServices,public loadingCtrl: LoadingController ) {
//      this.getElderMasterDetails();
//      this.today = "";
//      this.sponser_id="4";
//         this.authForm = formBuilder.group({
//         elderName : ['', Validators.compose([Validators.required])],
//         number : ['', Validators.compose([Validators.required])],
//         address: ['', Validators.compose([Validators.required])],
//         dob : ['', Validators.compose([Validators.required])],
//         email: ['', Validators.compose([Validators.required])],
//         password:['', Validators.compose([Validators.required])],
//         city: ['', Validators.compose([Validators.required])],
//         state: ['', Validators.compose([Validators.required])],
//         numbers: ['', Validators.compose([Validators.required])],
//         experienceYears: ['', Validators.compose([Validators.required])],
//         college: ['', Validators.compose([Validators.required])],
//         elderGraduation: ['', Validators.compose([Validators.required])],
//         elderSpecialization: ['', Validators.compose([Validators.required])],
//         functional_area: ['', Validators.compose([Validators.required])]
//               });
//       this.fuctionality=navParams.get("fuctionality");
//       if(this.fuctionality == 'edit'){
//           if(navParams.get("editData")!= null){
//           this.elderId = navParams.get("editData").id;
//           this.elderName=navParams.get("editData").name;
//           this.contactNumber=navParams.get("editData").mobile;
//           this.dob=navParams.get("editData").dob;
//           this.email=navParams.get("editData").email;
//           this.password=navParams.get("editData").password;
//           this.city=navParams.get("editData").city_name;
//           this.state=navParams.get("editData").state_name;
//           this.relation=navParams.get("editData").relation;
//           this.services=navParams.get("editData").service;
//           this.address=navParams.get("editData").address;   
//           if(navParams.get("editData").education[0] === undefined || navParams.get("editData").education[0] == "undefined"){
//           this.graduation = null;  
//           }
//           else{
//           this.elderGraduation=navParams.get("editData").education;  
//           this.elderSpecialization=navParams.get("editData").education[0].specialization;
//           this.college=navParams.get("editData").education[0].university;
//           }
//           if(navParams.get("editData").experience[0] === undefined || navParams.get("editData").experience[0] == "undefined"){
//           this.graduation = null;  
//           }
//           else{
//           this.elderExperience=navParams.get("editData").experience; 
//           this.functional_area=navParams.get("editData").experience[0].functional_id;
//           }
//          if(navParams.get("editData").emergency[0] === undefined || navParams.get("editData").emergency[0] == "undefined"){
//           this.graduation = null;  
//           }
//           else{
//              this.emergency=navParams.get("editData").emergency[0].person;
//           this.number=navParams.get("editData").emergency[0].mobile; 
//           }
//         }
//   }
//   this.nav=nav;
// }
//  getElderMasterDetails(){
//      this.communityServices.getElderMasterDetails()
//        .subscribe(masterData =>{
//                     this.functionalArea=masterData.result.FunctionalArea;
//                     this.educational=masterData.result.Educational;
//                     this.specializations=masterData.result.Specialization;
//                     this.locations=masterData.result.Locations;
//                     this.areaOfInterest=masterData.result.AreaofInterest;
//                     this.skills=masterData.result.Skills;
//                      },
//                      err =>{
//                     this.communityServices.showErrorToast(err);
//                   })
//    }
//   ionViewDidLoad() {
//     console.log('ionViewDidLoad EldersPage');
//   }
//   addMores(){
//     this.lists.push({name:""});
//   }
//    addMore(){
//     // this.nav.push(EldersPage);
//     this.elderExperience.push({name:""});
//   }
//   Add(){
//     this.items.push({name:""});
//   }
//   removes(){
//      this.lists.pop({name:""});
//   }
//   remov(){
//      this.elderExperience.pop({name:""});
//   }
//   remove(){
//      this.items.pop({name:""});
//   }
//   Submit(){
//     if(this.fuctionality=="edit"){
//       alert("Success"+this.authForm.value.years);
//       let edit={"info":[{"id":17,"sponsor_id":this.sponser_id,"name":this.authForm.value.elderName,"avatar":null,
//       "relation":this.authForm.value.relation,"gender":"","dob":this.authForm.value.dob,"mobile":this.authForm.value.contactNumber,
//       "mobile_verified":1,"email":this.authForm.value.email,"email_verified":1,"in_service":0,
//       "job_interested":1,"address":this.authForm.value.address,"city":this.authForm.value.city,"state":this.authForm.value.state,
//       "status":1,"created_at":"2017-03-06 13:06:59","updated_at":"2017-03-06 18:36:59",
//       "city_name":"chennai","state_name":"Tamilnadu","service":this.authForm.value.services,
//       "experience":[{"id":13,"elder_id":17,"functional_id":8,"functional_other":"","year":this.authForm.value.years,
//       "duration":"","status":1,"created_at":"2017-03-06 13:06:59",
//       "updated_at":"2017-03-06 13:06:59"}],"education":[{"id":12,"elder_id":17,
//       "graduation":this.authForm.value.graduation,"graduation_other":"","specialization":this.authForm.value.specializations,
//       "specialization_other":"","university":this.authForm.value.college,"status":1,
//       "created_at":"2017-03-06 13:06:59","updated_at":"2017-03-06 13:06:59"}],
//       "emergency":[{"id":16,"elder_id":17,"person":this.authForm.value.person,"mobile":this.authForm.value.number,
//       "status":1,"created_at":"2017-03-06 13:06:59","updated_at":"2017-03-06 13:06:59"}]}]}
//           this.communityServices.editSubmit(edit).subscribe(elders =>{
//             console.log(elders);    
//      },
//      err =>{
//     this.communityServices.showErrorToast(err);
//   })
//     }
//      else{
//        // alert("Success"+this.authForm.value.years);
//        let add={"info":[{"relation":this.authForm.value.relation,"name":this.authForm.value.elderName,
//        "dob":this.authForm.value.dob,"mobile":this.authForm.value.contactNumber,
//        "address":this.authForm.value.address,"city":this.authForm.value.city,
//        "state":this.authForm.value.state,"in_service":this.authForm.value.services,
//        "email":this.authForm.value.email,"password":this.authForm.value.password,
//        "emergency":[{"id":1,"mobile":this.authForm.value.number,"person":this.authForm.value.person}],
//        "experience":[{"industry":this.authForm.value.experience,"year":this.authForm.value.years,"duration":"APRIL 2001-2017"}],
//        "education":[{"graduation":this.authForm.value.graduation,"specialization":this.authForm.value.specializations,
//        "university":this.authForm.value.college}],"sponsor_id":this.sponser_id,"job_interested":1}]}
//        this.communityServices.addSubmit(add).subscribe(elders=>{
//             console.log(elders);
//             },
//      err =>{
//     this.communityServices.showErrorToast(err);
//   })
//      }
//     this.nav.pop();
//   }
//  cancel(){
//    this.nav.pop();
//  }
// }
// /*
// {"info":[
// {"id":this.elderId,
// "sponsor_id":this.sponser_id,
// "name":this.elderName,
// "avatar":null,
// "relation":this.relation,
// "gender":"",
// "dob":this.dob,
// "mobile":this.contactNumber,
// "mobile_verified":1,
// "email":this.email,
// "email_verified":1,
// "in_service":0,
// "job_interested":1,
// "address":this.address,
// "city":this.city,
// "state":this.state,
// "status":1,
// "created_at":"2017-03-06 13:06:59",
// "updated_at":this.currentDate,
// "city_name":this.city,
// "state_name":this.state,
// "service":this.services,
// "experience":[{"functional_id":this.authForm.value.functional_area,"year":this.authForm.value.experienceYears,"duration":""}],
// "education":[{"graduation":this.authForm.value.elderGraduation,"specialization":this.authForm.value.elderSpecialization,"university":this.authForm.value.college}],
// "emergency":[{"id":16,"elder_id":17,"person":"police","mobile":"9597009544","status":1,"created_at":"2017-03-06 13:06:59","updated_at":"2017-03-06 13:06:59"}]
// }]
// } */ 
//# sourceMappingURL=bk_elder.js.map