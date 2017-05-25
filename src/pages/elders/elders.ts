import { Component } from '@angular/core';
import { NavController,LoadingController, NavParams} from 'ionic-angular';
import { Camera } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { ServiceProvider } from '../../providers/service-provider';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';

import { CommunityServices } from '../../providers/community-services';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { ManagePage } from '../../pages/manage/manage';


@Component({
  selector: 'page-elders',
  templateUrl: 'elders.html'
})
export class EldersPage {
authForm : FormGroup;
base64Image:any;
avatar:any='';
title:any;
submitAttempt:any;
  //---------------add functionality start-----------------------//

functionalArea:any;
educations:any=[];
specializations:any=[];
locations:any=[];
areaOfInterest:any;
in_service:any;
relations:any=[];
functionality:String = "";
sponser_id:any;

  emergency_name:any = [];
  emergency_no:any =[];
  elderGraduation:any=[];
  
  area_interest:any;
  tags:any;
  industry_experience:any = [{year:""}];
  functional_duration:any ="";
  sponsor_id:any;
  mobile:any="";
  elder_email:any="";
  elder_password:any="";
  elder_id:any="";
  elder_relation:any="";
  elder_name:any="";
  elder_service:any="";
  elder_number:any="";

  elder_dob:any="1977-01-01";
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
  elderInfo:any;
//-------------------END---------------------------------//


//------------------Edit Functionality start------------------------//
manageDependentData:any=[];

education_data:any;
experience_data:any;
emergency_data:any;
skill_data:any;

//-----------------------END-------------------//

  constructor(public providerService:ServiceProvider, public nav: NavController, public storage:Storage, public formBuilder: FormBuilder, public navParams: NavParams, public communityServices: CommunityServices,public loadingCtrl: LoadingController ) {

      // this.getElderMasterDetails();
      
      this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});

      storage.get('user_type_id').then((id) => { this.sponsor_id=id;});

      storage.get('token').then((token) => { this.token=token; 
        
        this.functionality=navParams.get("fuctionality");
      if(this.functionality == 'edit'){
          this.title = "Edit Elder Details"
          if(navParams.get("editData")!= null){
            // let dependent = navParams.get("editData");
            this.loadManageDependentData(navParams.get("editData").id);
         }
        }else if(this.functionality == 'profileEdit'){
          this.title = "Profile Edit"
          console.log("....edit profile..",navParams.get('profileData'));
          this.loadForm(navParams.get('profileData'));
        }else{
          this.title = "Elder Onboarding";
        }

      })
    }); 
    // this.today = "";
     
     this.job_interest=false;
         
  // }
  if(navParams.get("fuctionality")!= "edit" && navParams.get("fuctionality") !="profileEdit"){
    
        this.authForm = formBuilder.group({
        elder_relation : ['', Validators.compose([Validators.required])],
        elder_name : ['', Validators.compose([ Validators.maxLength(30), 
              Validators.pattern('[a-zA-Z ]*'),Validators.required])],
        elder_service : ['', Validators.compose([Validators.required])],
        elder_number : ['', Validators.compose([Validators.pattern('[0-9]*'),Validators.required])],
        elder_address: ['', Validators.compose([Validators.required])],
        elder_dob : ['', Validators.compose([Validators.required])],
        elder_email: ['', Validators.compose([Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]*'),Validators.required])],
        elder_password:['', Validators.compose([Validators.required])],
        elder_location: ['', Validators.compose([Validators.required])],
       /* emergency_numbers: ['', Validators.compose([Validators.required])],
        experienceYears: ['', Validators.compose([Validators.required])],
        college: ['', Validators.compose([Validators.required])],
        elderGraduation: ['', Validators.compose([Validators.required])],
        elderSpecialization: ['', Validators.compose([Validators.required])],
        functional_area: ['', Validators.compose([Validators.required])],
        functional_duration: ['', Validators.compose([Validators.required])]*/
        emergency_numbers: ['', Validators.compose([])],
        experienceYears: ['', Validators.compose([])],
        college: ['', Validators.compose([])],
        elderGraduation: ['', Validators.compose([])],
        elderSpecialization: ['', Validators.compose([])],
        functional_area: ['', Validators.compose([])],
        functional_duration: ['', Validators.compose([])]
              });
  }
  else
  {
        this.authForm = formBuilder.group({
        elder_relation : ['', Validators.compose([Validators.required])],
        elder_name : ['', Validators.compose([ Validators.maxLength(30), 
              Validators.pattern('[a-zA-Z ]*'),Validators.required])],
        elder_service : ['', Validators.compose([Validators.required])],
        elder_number : ['', Validators.compose([Validators.pattern('[0-9]*'),Validators.required])],
        elder_address: ['', Validators.compose([Validators.required])],
        elder_dob : ['', Validators.compose([Validators.required])],
        elder_location: ['', Validators.compose([Validators.required])],
       /* emergency_numbers: ['', Validators.compose([Validators.required])],
        experienceYears: ['', Validators.compose([Validators.required])],
        college: ['', Validators.compose([Validators.required])],
        elderGraduation: ['', Validators.compose([Validators.required])],
        elderSpecialization: ['', Validators.compose([Validators.required])],
        functional_area: ['', Validators.compose([Validators.required])],
        functional_duration: ['', Validators.compose([Validators.required])]*/
        emergency_numbers: ['', Validators.compose([])],
        experienceYears: ['', Validators.compose([])],
        college: ['', Validators.compose([])],
        elderGraduation: ['', Validators.compose([])],
        elderSpecialization: ['', Validators.compose([])],
        functional_area: ['', Validators.compose([])],
        functional_duration: ['', Validators.compose([])]
              });
  }
  this.nav=nav;
}

 loadManageDependentData(elderId){

   this.communityServices.getElder(elderId).subscribe(
       elder=>{
          this.loadForm(elder.result.info[0]);
        },
         err =>{
            this.communityServices.showErrorToast(err);
            })
 }
 
imageURL:any;

 loadForm(data){
              // this.manageDependentData = data[0] ;
              this.manageDependentData = data;
          this.storage.ready().then(() => {
            this.storage.get('imageurl').then((imageurl) => { this.imageURL=imageurl;
            this.base64Image = this.imageURL+this.manageDependentData.avatar;
              });
            });
                    
          this.elder_id = this.manageDependentData.id;
          this.sponsor_id = this.manageDependentData.sponsor_id;
          this.elder_name= this.manageDependentData.name;
          this.elder_service = this.manageDependentData.in_service;
          this.elder_number= this.manageDependentData.mobile;
          this.elder_dob= this.manageDependentData.dob;//this.getDate(this.manageDependentData.dob);
          this.elder_email= this.manageDependentData.email;
          this.elder_password= this.manageDependentData.password;
          this.elder_location = this.manageDependentData.location;        
          this.elder_relation = this.manageDependentData.relation;
          this.elder_address= this.manageDependentData.address;   

          let emergency = this.manageDependentData.emergency;
          if(emergency.length != 0 ){
            this.emergency_list.pop();
            for(let i = 0; i < emergency.length;i++)
            {
              this.emergency_name.push(emergency[i].person);
              this.emergency_no.push(emergency[i].mobile);
              this.emergency_list.push({emergency:[i]});

            }
          }
          this.job_interest = this.manageDependentData.job_interested;

          if(this.job_interest){
            console.log("interested in job");
            this.area_of_interest = this.manageDependentData.area_interest;
            this.job_type = this.manageDependentData.job_type;

            let experiences = this.manageDependentData.experience;
            // console.log(this.manageDependentData.experience);
            if(experiences.length != 0)
            {
              this.experience_list.pop();
              for(let i = 0; i < experiences.length;i++)
              {
                this.experience_industry.push(experiences[i].functional_id);
                this.experience_years.push(experiences[i].year);
                this.experience_duration.push(experiences[i].duration);
                this.experience_list.push({experience:[i]});
              }  
            }

            let skills = this.manageDependentData.skills;
            if(skills.length != 0){
              for(let i=0 ; i< skills.length ; i++){
                this.skill_set.push(skills[i].skill);
              }
             }
            let educations =  this.manageDependentData.education;
            if(educations.length != 0)
            {
              this.education_list.pop();
              for(let i = 0; i < educations.length;i++)
              {
                this.education_graduation.push(educations[i].graduation);
                this.education_specialization.push(educations[i].specialization);
                this.education_college.push(educations[i].university);
                this.education_list.push({education:[i]});
              }  
            }
          }
 }

 getDate(datepar){
     var dateParts = datepar.split("-").reverse().join("-");
     // let date = dateParts[2]+"-"+dateParts[1]+"-"+dateParts[0];
     return dateParts;
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

   ionViewWillEnter(){
        this.getElderMasterDetails();
      }

  addEmergency(){
    this.emergency_list.push({emergency:""});
  }
  removeEmergency(index){
    this.emergency_list.splice(index,1);
    this.emergency_name.splice(index,1);
    this.emergency_no.splice(index,1);
  }

  addExperience(count){
    // this.getElderMasterDetails();
    this.experience_list.push({experience:""});
  }
  removeExperience(index){
    this.experience_list.splice(index,1);
    this.experience_industry.splice(index,1);
    this.experience_years.splice(index,1);
    this.experience_duration.splice(index,1);
  }

  addEducation(){
    this.education_list.push({education:""});
  }
  removeEducation(index){
   this.education_list.splice(index,1);
   this.education_graduation.splice(index,1);
   this.education_specialization.splice(index,1);
   this.education_college.splice(index,1);

   console.log(this.education_list,this.education_graduation,this.education_specialization,this.education_college)
  }

  getElderSkills(){
     if(this.functionality !="edit" && this.functionality !="profileEdit"){
      for(let i=0;i<this.skill_set.length;i++){
        this.elder_skills.push({"skill":this.skill_set[i]})  
      }
    }else{

      for(let i=0;i<this.skill_set.length;i++){
        this.elder_skills.push({"elder_id":this.elder_id,"skill":this.skill_set[i]})  
      }
    }
  }

  getEmergencyNumber(){
    if(this.functionality != "edit" && this.functionality !="profileEdit"){
      for(let i=0;i<this.emergency_no.length;i++){
            this.elder_emergency.push({"id":(i+1),"person":this.emergency_name[i],"mobile":this.emergency_no[i]})  
          }
        }
  else{
    for(let i=0;i<this.emergency_no.length;i++){
            this.elder_emergency.push({"elder_id":this.elder_id,"person":this.emergency_name[i],"mobile":this.emergency_no[i]})  
          }
       }
  }

  getElderExperience(){
    if(this.functionality != "edit" && this.functionality !="profileEdit"){
      for(let i=0;i<this.experience_industry.length;i++){
            this.elder_experience.push({"industry":this.experience_industry[i],"year":this.experience_years[i],"duration":this.experience_duration[i]})  
            }
      }else{
        for(let i=0;i<this.experience_industry.length;i++){
            this.elder_experience.push({"elder_id":this.elder_id,"functional_id":this.experience_industry[i],"year":this.experience_years[i],"duration":this.experience_duration[i]})
          }
      }
  }

  getElderEducation(){
    if(this.functionality != "edit" && this.functionality !="profileEdit"){
    for(let i=0;i<this.education_graduation.length;i++){
            this.elder_education.push({"graduation":this.education_graduation[i],"specialization":this.education_specialization[i],"university":this.education_college[i]})  
          }
       }
       else{
         for(let i=0;i<this.education_graduation.length;i++){
           console.log("data pushed..!")
            this.elder_education.push({"elder_id":this.elder_id,"graduation":this.education_graduation[i],"specialization":this.education_specialization[i],"university":this.education_college[i]})  
          }
       }
  }

  addDependent(){
    //---------------------------------edited-------------------------------//

    this.getElderSkills();
    this.skill_data= this.elder_skills;

    this.getEmergencyNumber();
    this.emergency_data = this.elder_emergency;

    this.getElderExperience();
    this.experience_data = this.elder_experience;

    this.getElderEducation();
    this.education_data = this.elder_education;

    let dependentData = {"info":
                          [{"email":this.authForm.value.elder_email,
                          "relation":this.elder_relation,
                          "password":this.authForm.value.elder_password,
                          "name":this.authForm.value.elder_name,
                          "dob":this.elder_dob,
                          "mobile":this.authForm.value.elder_number,
                          "in_service":this.elder_service,
                          "address":this.authForm.value.elder_address,
                          "location":this.elder_location,
                          "area_interest":this.area_of_interest,
                          "job_type":this.job_type,
                          "skills":this.skill_data,
                          "emergency":this.emergency_data,
                          "emergency_numbers":this.mobile,
                          "experience":this.experience_data,
                          "education":this.education_data,
                          "sponsor_id":this.sponsor_id,
                          "job_interested":this.job_interest
                          }]
                        };
    
                        //-------------------modified----------------------------//

      if(this.functionality=="edit" || this.functionality =="profileEdit")
      {
        if(this.authForm.value.elder_name != ""){
            this.elder_name = this.authForm.value.elder_name;
        }
        if(this.authForm.value.elder_number != ""){
            this.elder_number = this.authForm.value.elder_number;
        }
        if(this.authForm.value.elder_address != ""){
            this.elder_address = this.authForm.value.elder_address;
        }

        let profileEditData = {
        "id":this.elder_id,
        "area_interest":this.area_of_interest,
        "location":this.elder_location,
        "job_type":this.job_type,        
        "sponsor_id":this.sponsor_id,
        "name":this.elder_name,
        "avatar":this.manageDependentData.avatar,
        "relation":this.elder_relation,
        "gender":this.manageDependentData.gender,
        "dob":this.elder_dob,
        "mobile":this.elder_number,
        "email":this.elder_email,
        "in_service":this.elder_service,
        "job_interested":this.job_interest,
        "address":this.elder_address,
        "city":this.manageDependentData.city,
        "state":this.manageDependentData.state,
        "status":this.manageDependentData.status,
        "created_at":this.manageDependentData.created_at,
        "city_name":this.manageDependentData.city_name,
        "state_name":this.manageDependentData.state_name,
        "skills":this.skill_data,
        "emergency":this.emergency_data,
        "experience":this.experience_data,
        "education":this.education_data,
        "app":"",
        "avatar1":this.avatar
      }

        let editedData ={"info": [profileEditData]};

          if(this.functionality == "edit"){
          if(!this.authForm.valid){
            this.submitAttempt = true;
           }
          else
          {
           this.submitAttempt = false;
            this.communityServices.editSubmit(editedData).subscribe(elders =>{
                    // console.log(elders); 
                    let msg='';
              if(elders.result.updated!='')
              {
                this.nav.setRoot(ManagePage);
                msg="Elder details updated successfully.";
                this.communityServices.showToast(msg); 
              } 
              else 
              {
               msg="Elder details can not updated.";
               this.communityServices.showToast(msg); 
              } 
                      
             },
             err =>{
                    this.communityServices.showErrorToast(err);
              })
            }
          }else{

              this.providerService.webServiceCall(`myaccountEdit`,profileEditData)
                  .subscribe(data=>{
                    this.providerService.showToast(data.result);
                    console.log(data);
                  },
                  err=>{
                    this.providerService.showErrorToast(err);
                    console.log(err);
                  })
       
          }
        
      }
      else
        {
        
       // }
        if(this.functionality != "edit" && this.functionality !="profileEdit"){      
    if(!this.authForm.valid){
      this.submitAttempt = true;
    }
    else{
      this.submitAttempt = false;
       this.communityServices.addSubmit(dependentData).subscribe(
           elders=>{
              let msg='';
              if(elders.result.added!='')
              {
                 this.nav.setRoot(ManagePage);
                msg="Elder details added Successfully";
              }
              else if(elders.result.exist!='')
              {
                msg="Elder email id already exits.";
              } 
              else
              {
               msg="Elder details can not added.";
              } 
               this.communityServices.showToast(msg);
              },
           err =>{
              this.communityServices.showErrorToast(err);
              })
     // this.nav.pop();
     }
    }

  }
    
    if(this.functionality =="profileEdit")
      {
        this.nav.pop();
      }
    

}

 cancel(){
     this.nav.pop();
   }    

 dashboardPage()
    {
      this.nav.setRoot(DashboardPage);
    }

    accessGallery(){
   Camera.getPicture({
     sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
     destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
      this.avatar = this.base64Image;
     }, (err) => {
      console.log(err);
    });
  }
}






[{
"id":"1",
"sponsor_id":"1",
"name":"neduncheliyan",
"avatar":"uploads\/avatar\/1492778687usr3.jpg",
"relation":"father",
"gender":"",
"dob":"13-06-1950",
"mobile":"9874563211",
"mobile_verified":"1",
"email":"neduncheliyan@elderindia.com",
"email_verified":"1",
"in_service":"0",
"location":"3",
"job_interested":"1",
"area_interest":"Animation",
"job_type":"full time",
"address":"4\/22 Rutland Gate 4th Street, Chennai, Tamil Nadu 600034",
"city":"",
"state":"",
"status":"1",
"created_at":"2017-04-07 22:59:14",
"updated_at":"2017-04-21 18:14:47",
"city_name":"",
"state_name":"",
"experience":[{"id":"23","elder_id":"1","functional_id":"5","functional_other":"","year":"5","duration":"APRIL 2001-2017","status":"1","created_at":"2017-04-21 18:14:46","updated_at":"2017-04-21 18:14:46","$hashKey":"object:3907"}],
"education":[{"id":"23","elder_id":"1","graduation":"BCA","graduation_other":"","specialization":"Maths","specialization_other":"","university":"anna university","status":"1","created_at":"2017-04-21 18:14:46","updated_at":"2017-04-21 18:14:46","$hashKey":"object:3910"}],
"emergency":[{"id":"27","elder_id":"1","person":"police","mobile":"100","status":"1","created_at":"2017-04-21 18:14:46","updated_at":"2017-04-21 18:14:46","$hashKey":"object:3904"}],
"skills":[{"id":"68","elder_id":"1","skill":"java","status":"1","created_at":"2017-04-21 18:14:46","updated_at":"2017-04-21 18:14:46"},{"id":"69","elder_id":"1","skill":"php","status":"1","created_at":"2017-04-21 18:14:46","updated_at":"2017-04-21 18:14:46"},{"id":"70","elder_id":"1","skill":"yii","status":"1","created_at":"2017-04-21 18:14:47","updated_at":"2017-04-21 18:14:47"}],
"avatar1":"uploads\/avatar\/1492778687usr3.jpg"
}]