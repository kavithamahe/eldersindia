import { Component } from '@angular/core';
import { NavController,LoadingController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';

import { CommunityServices } from '../../providers/community-services';
import { DashboardPage } from '../../pages/dashboard/dashboard';

@Component({
  selector: 'page-elders',
  templateUrl: 'elders.html'
})
export class EldersPage {
authForm : FormGroup;

  functionalArea:any;
  educations:any;
  specializations:any;
  locations:any;
  areaOfInterest:any;
  // skills:any;
  in_service:any;
  relations:any;
 

  gender: string = "f";
  service:string;
  education:any;
  adds:any;
  elder:any;
  datas:any=[{name:""}];
  lists:any=[{name:""}];
  items:any=[{name:""}];
  experience:any=[];
  
  elderId:any;
  elderName:String="";
  contactNumber:String="";
  city:String="";
  state:String="";
  services:String="";
  address:String="";
  graduation:String = "";
  elderSpecialization:String = "";
  relation:String = "";
  years:String = "";
  college:String = "";
  number:String = "";
  
  fuctionality:String = "";
  dob:any;
  email:String = "";
  password:String = "";
  today:any;
  sponser_id:any;
  educationDetails:any;
  location:any;
  functional_area:any = [{functional_id:""}];
  elderExperience:any = [{year:""}];


  //---------------edit start-----------------------//

  emergency_name:any = [];
  emergency_no:any =[];
  elderGraduation:any=[];
  
  area_interest:any;
  tags:any;
  industry_experience:any = [{year:""}];
  functional_duration:any ="";
  sponsor_id:any;
  elder_relation:any="";
  elder_name:any="";
  elder_service:any="";
  elder_number:any="";
  elder_dob:any="";
  elder_address:any="";
  elder_location:any="";
  emergency_numbers:any;
  job_interest:boolean;
  area_of_interest:any="";
  job_type:any="";
  skill_set:any=[];
  skills:any=[];
  experience_industry:any=[];
  experience_years:any=[];
  experience_duration:any=[];

  education_graduation:any=[];
  education_specialization:any=[];
  education_college:any=[];
  

  emergency_list:any=[{emergency:""}];
  experience_list:any=[{experience:""}];
  education_list:any=[{education:""}];


  industry_set:any=[];
  elder_skills:any=[];
  elder_emergency:any=[];
  elder_experience:any=[];
  elder_education:any=[];
  imageUrl:any;
  user_id:any;
  token:any;
//-------------------END---------------------------------//

  constructor(public nav: NavController, public storage:Storage, public formBuilder: FormBuilder, public navParams: NavParams, public communityServices: CommunityServices,public loadingCtrl: LoadingController ) {

      // this.getElderMasterDetails();

    this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('id').then((id) => { this.user_id=id;});
      storage.get('token').then((token) => { this.token=token; 
      this.sponsor_id=this.user_id;
      })
    }); 
    this.today = "";
     
     this.job_interest=false;

        this.authForm = formBuilder.group({
        elder_name : ['', Validators.compose([Validators.required])],
        elder_number : ['', Validators.compose([Validators.required])],
        elder_address: ['', Validators.compose([Validators.required])],
        elder_dob : ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required])],
        password:['', Validators.compose([Validators.required])],
        elder_location: ['', Validators.compose([Validators.required])],
        emergency_numbers: ['', Validators.compose([Validators.required])],
        experienceYears: ['', Validators.compose([Validators.required])],
        college: ['', Validators.compose([Validators.required])],
        elderGraduation: ['', Validators.compose([Validators.required])],
        elderSpecialization: ['', Validators.compose([Validators.required])],
        functional_area: ['', Validators.compose([Validators.required])],
        functional_duration: ['', Validators.compose([Validators.required])]
              });

      this.fuctionality=navParams.get("fuctionality");
      
  //     if(this.fuctionality == 'edit'){

  //         if(navParams.get("editData")!= null){
  //         this.elderId = navParams.get("editData").id;
  //         this.elderName=navParams.get("editData").name;
  //         this.contactNumber=navParams.get("editData").mobile;
  //         this.dob=navParams.get("editData").dob;
  //         this.email=navParams.get("editData").email;
  //         this.password=navParams.get("editData").password;
  //         this.city=navParams.get("editData").city_name;
  //         this.location=navParams.get("editData").city;
  //         this.relation=navParams.get("editData").relation;
  //         this.services=navParams.get("editData").service;
  //         this.address=navParams.get("editData").address;   
  //         if(navParams.get("editData").education[0] === undefined || navParams.get("editData").education[0] == "undefined"){
  //         this.graduation = null;  
  //         }
  //         else{
  //         this.elderGraduation=navParams.get("editData").education;  
  //         this.elderSpecialization=navParams.get("editData").education[0].specialization;
  //         this.college=navParams.get("editData").education[0].university;
  //         }
  //         if(navParams.get("editData").experience[0] === undefined || navParams.get("editData").experience[0] == "undefined"){
  //         this.graduation = null;  
  //         }
  //         else{
  //         this.elderExperience.pop();
  //         this.elderExperience.push(navParams.get("editData").experience); 
  //         console.log(this.elderExperience);
  //         this.functional_area.pop();
  //         for(let i=0; i < this.elderExperience.length; i++){
  //            this.functional_area.push({functional_id:this.elderExperience[i].functional_id});
  //            console.log(this.functional_area[0].functional_id);
  //         }
         
  //         }
  //        if(navParams.get("editData").emergency[0] === undefined || navParams.get("editData").emergency[0] == "undefined"){
  //         this.graduation = null;  
  //         }
  //         else{
  //            this.emergency=navParams.get("editData").emergency[0].person;
  //         this.number=navParams.get("editData").emergency[0].mobile; 
  //         }
  //       }
  // }
  this.nav=nav;
}


 getElderMasterDetails(){
     this.communityServices.getElderMasterDetails()
       .subscribe(masterData =>{
                    this.functionalArea=masterData.result.FunctionalArea;
                    this.educations=masterData.result.Educational;
                    this.specializations=masterData.result.Specialization;
                    this.locations=masterData.result.Locations;
                    this.areaOfInterest=masterData.result.AreaofInterest;

                    let skillset =masterData.result.Skills;
                    for(let i=0;i<skillset.length;i++){
                      this.skills.push(skillset[i].skill)
                    }

                    this.relations=masterData.result.Relations;
                    this.in_service=masterData.result.InService;
                     },
                     err =>{
                    this.communityServices.showErrorToast(err);
                  })

   }

   ngOnInit() {
     this.getElderMasterDetails();
        }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EldersPage');
  }

  addEmergency(){
    this.emergency_list.push({emergency:""});
  }
  removeEmergency(){
    this.emergency_list.pop({emergency:""});
  }

  addExperience(count){
    // this.getElderMasterDetails();
    this.experience_list.push({experience:""});
  }
  removeExperience(){
    this.experience_list.pop({experience:""});
  }

  addEducation(){
    this.education_list.push({education:""});
  }
  removeEducation(){
   this.education_list.pop({education:""}); 
  }

  getElderSkills(){
// [{"skill":"account"},{"skill":"maths"}]
    for(let i=0;i<this.skill_set.length;i++){
      this.elder_skills.push({"skill":this.skill_set[i]})  
    }
  }

  getEmergencyNumber(){
// [{"id":1,"person":"police","mobile":"100"}]
      for(let i=0;i<this.emergency_no.length;i++){
            this.elder_emergency.push({"id":(i+1),"person":this.emergency_name[i],"mobile":this.emergency_no[i]})  
          }
  }

  getElderExperience(){
    // [{"industry":1,"year":"5","duration":"2010-2015"}]
    for(let i=0;i<this.experience_industry.length;i++){
      // alert(this.experience_industry[i]);
            this.elder_experience.push({"industry":this.experience_industry[i],"year":this.experience_years[i],"duration":this.experience_duration[i]})  
          }
  }

  getElderEducation(){
    // [{"graduation":"B.A","specialization":"Maths","university":"KLU"}]
    for(let i=0;i<this.education_graduation.length;i++){
            this.elder_education.push({"graduation":this.education_graduation[i],"specialization":this.education_specialization[i],"university":this.education_college[i]})  
          }
  }

  addDependent(){


    //---------------------------------edited-------------------------------//

    // alert(this.job_interest);

    this.getElderSkills();
    let skill_data= this.elder_skills;

    this.getEmergencyNumber();
    let emergency_data = this.elder_emergency;

    this.getElderExperience();
    let experience_data = this.elder_experience;

    this.getElderEducation();
    let education_data = this.elder_education;

    let dependentData = {"info":
                          [{"email":this.authForm.value.email,
                          "relation":this.elder_relation,
                          "password":this.authForm.value.password,
                          "name":this.authForm.value.elder_name,
                          "dob":this.elder_dob,
                          "mobile":this.authForm.value.elder_number,
                          "in_service":this.elder_service,
                          "address":this.authForm.value.elder_address,
                          "location":this.elder_location,
                          "area_interest":this.area_of_interest,
                          "job_type":this.job_type,
                          "skills":skill_data,
                          "emergency":emergency_data,
                          "experience":experience_data,
                          "education":education_data,
                          "sponsor_id":this.sponsor_id,
                          "job_interested":this.job_interest
                          }]
                        }
    console.log("elder details:",dependentData);







                        //-------------------modified----------------------------//

      // if(this.fuctionality=="edit")
      // {
      //         this.communityServices.editSubmit().subscribe(elders =>{
      //           console.log(elders);    
      //    },
      //    err =>{
      //           this.communityServices.showErrorToast(err);
      //     })
   
      // }
      // else
      //   {
         this.communityServices.addSubmit(dependentData).subscribe(
           elders=>{
              console.log(elders);
              },
           err =>{
              this.communityServices.showErrorToast(err);
              })
        // }
    this.nav.pop();
  }

 cancel(){
   this.nav.pop();
 }    
public dashboardPage()
  {
    this.nav.setRoot(DashboardPage);
  }
}






