var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
//import { ManagePage } from '../manage/manage';
import { FormBuilder, Validators } from '@angular/forms';
import { CommunityServices } from '../../providers/community-services';
//import { Elderform } from '../validators/elderform';
var EldersPage = (function () {
    function EldersPage(nav, formBuilder, navParams, communityServices, loadingCtrl) {
        this.nav = nav;
        this.formBuilder = formBuilder;
        this.navParams = navParams;
        this.communityServices = communityServices;
        this.loadingCtrl = loadingCtrl;
        this.gender = "f";
        this.datas = [{ name: "" }];
        this.lists = [{ name: "" }];
        this.items = [{ name: "" }];
        this.experience = [];
        this.elderName = "";
        this.contactNumber = "";
        this.city = "";
        this.state = "";
        this.services = "";
        this.address = "";
        this.graduation = "";
        this.elderGraduation = "";
        this.elderSpecialization = "";
        this.relation = "";
        this.years = "";
        this.college = "";
        this.number = "";
        this.emergency = "";
        this.fuctionality = "";
        this.email = "";
        this.password = "";
        this.functional_area = [{ functional_id: "" }];
        this.elderExperience = { year: "" };
        this.getElderMasterDetails();
        this.today = "";
        this.sponser_id = "4";
        this.authForm = formBuilder.group({
            elderName: ['', Validators.compose([Validators.required])],
            number: ['', Validators.compose([Validators.required])],
            address: ['', Validators.compose([Validators.required])],
            dob: ['', Validators.compose([Validators.required])],
            email: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required])],
            city: ['', Validators.compose([Validators.required])],
            state: ['', Validators.compose([Validators.required])],
            numbers: ['', Validators.compose([Validators.required])],
            experienceYears: ['', Validators.compose([Validators.required])],
            college: ['', Validators.compose([Validators.required])],
            elderGraduation: ['', Validators.compose([Validators.required])],
            elderSpecialization: ['', Validators.compose([Validators.required])],
            functional_area: ['', Validators.compose([Validators.required])]
        });
        this.fuctionality = navParams.get("fuctionality");
        if (this.fuctionality == 'edit') {
            if (navParams.get("editData") != null) {
                this.elderId = navParams.get("editData").id;
                this.elderName = navParams.get("editData").name;
                this.contactNumber = navParams.get("editData").mobile;
                this.dob = navParams.get("editData").dob;
                this.email = navParams.get("editData").email;
                this.password = navParams.get("editData").password;
                this.city = navParams.get("editData").city_name;
                this.location = navParams.get("editData").city;
                this.relation = navParams.get("editData").relation;
                this.services = navParams.get("editData").service;
                this.address = navParams.get("editData").address;
                if (navParams.get("editData").education[0] === undefined || navParams.get("editData").education[0] == "undefined") {
                    this.graduation = null;
                }
                else {
                    this.elderGraduation = navParams.get("editData").education;
                    this.elderSpecialization = navParams.get("editData").education[0].specialization;
                    this.college = navParams.get("editData").education[0].university;
                }
                if (navParams.get("editData").experience[0] === undefined || navParams.get("editData").experience[0] == "undefined") {
                    this.graduation = null;
                }
                else {
                    this.elderExperience.pop();
                    this.elderExperience.push(navParams.get("editData").experience);
                    console.log(this.elderExperience);
                    this.functional_area.pop();
                    for (var i = 0; i < this.elderExperience.length; i++) {
                        this.functional_area.push({ functional_id: this.elderExperience[i].functional_id });
                        console.log(this.functional_area[0].functional_id);
                    }
                }
                if (navParams.get("editData").emergency[0] === undefined || navParams.get("editData").emergency[0] == "undefined") {
                    this.graduation = null;
                }
                else {
                    this.emergency = navParams.get("editData").emergency[0].person;
                    this.number = navParams.get("editData").emergency[0].mobile;
                }
            }
        }
        this.nav = nav;
    }
    EldersPage.prototype.getElderMasterDetails = function () {
        var _this = this;
        this.communityServices.getElderMasterDetails()
            .subscribe(function (masterData) {
            _this.functionalArea = masterData.result.FunctionalArea;
            _this.educational = masterData.result.Educational;
            _this.specializations = masterData.result.Specialization;
            _this.locations = masterData.result.Locations;
            _this.areaOfInterest = masterData.result.AreaofInterest;
            _this.skills = masterData.result.Skills;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    EldersPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EldersPage');
    };
    EldersPage.prototype.addMores = function () {
        this.lists.push({ name: "" });
    };
    EldersPage.prototype.addMore = function () {
        this.elderExperience.push({ year: "", functional_id: "10" });
    };
    EldersPage.prototype.Add = function () {
        this.items.push({});
    };
    EldersPage.prototype.removes = function () {
        this.lists.pop({ name: "" });
    };
    EldersPage.prototype.remov = function () {
        this.elderExperience.pop({ name: "" });
    };
    EldersPage.prototype.remove = function () {
        this.items.pop({ name: "" });
    };
    EldersPage.prototype.Submit = function () {
        var _this = this;
        alert("Success" + this.authForm.value.elderName);
        if (this.fuctionality == "edit") {
            // alert("Success"+this.authForm.value.years);
            this.communityServices.editSubmit().subscribe(function (elders) {
                console.log(elders);
            }, function (err) {
                _this.communityServices.showErrorToast(err);
            });
        }
        else {
            alert("Success" + this.authForm.value.elderName);
            this.communityServices.addSubmit().subscribe(function (elders) {
                console.log(elders);
            }, function (err) {
                _this.communityServices.showErrorToast(err);
            });
        }
        this.nav.pop();
    };
    EldersPage.prototype.cancel = function () {
        this.nav.pop();
    };
    return EldersPage;
}());
EldersPage = __decorate([
    Component({
        selector: 'page-elders',
        templateUrl: 'elders.html'
    }),
    __metadata("design:paramtypes", [NavController, FormBuilder, NavParams, CommunityServices, LoadingController])
], EldersPage);
export { EldersPage };
//# sourceMappingURL=elders.js.map