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
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder } from '@angular/forms';
import { BlogListService } from '../../providers/blog-list-service';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { BlogsPage } from '../../pages/blogs/blogs';
/*
  Generated class for the CreateBlog page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var CreateBlogPage = (function () {
    function CreateBlogPage(formBuilder, navCtrl, navParams, storage, blogListService, loadingCtrl, toastCtrl) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.blogListService = blogListService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.tags = [];
        this.tagsModel = [];
        this.submitAttempt = false;
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('token').then(function (token) {
                _this.token = token;
                // this.blogId=navParams.get("blogId");
                _this.getBlogCategories();
            });
        });
        this.blogForm = formBuilder.group({
            title: ['', Validators.compose([Validators.required])],
            category: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.required])]
        });
    }
    CreateBlogPage.prototype.dashboardPage = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    CreateBlogPage.prototype.getBlogCategories = function () {
        var _this = this;
        this.blogListService.getBlogCategory().subscribe(function (getBlogCategories) {
            _this.categoriesList = getBlogCategories.result;
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
    };
    CreateBlogPage.prototype.getTagsList = function ($event) {
        var _this = this;
        var tagsInput = $event.target.value;
        if (tagsInput != '') {
            this.blogListService.getTagsList(tagsInput).subscribe(function (getTagsList) {
                _this.tags = [];
                for (var i = 0; i < Object.keys(getTagsList).length; i++) {
                    _this.tags.push(getTagsList[i].name);
                }
            }, function (err) {
                if (err.status === 401) {
                    // this.showToaster(JSON.parse(err._body).error);
                }
                else {
                    _this.showToaster("Try again later");
                }
            });
        }
    };
    CreateBlogPage.prototype.createBlog = function () {
        var _this = this;
        if (!this.blogForm.valid) {
            this.submitAttempt = true;
        }
        else {
            this.submitAttempt = false;
            var loader = this.loadingCtrl.create({ content: "Please wait..." });
            loader.present();
            var tagsObj = [];
            if (this.tagsModel.length > 0) {
                for (var j = 0; j < this.tagsModel.length; j++) {
                    tagsObj.push({ "name": this.tagsModel[j] });
                }
            }
            this.blogObject = { "app": '', "category": this.blogForm.value.category, "allow_comment": this.allowComments, "title": this.blogForm.value.title, "highlights": this.highlights,
                "description": this.blogForm.value.description, "featured_image": "", "banner_image": "", "tags": tagsObj,
            };
            this.blogListService.createBlog(this.blogObject).subscribe(function (createBlog) {
                _this.navCtrl.setRoot(BlogsPage);
                _this.showToaster(createBlog.result);
                //console.log(createBlog.result);
            }, function (err) {
                if (err.status === 401) {
                    _this.showToaster(JSON.parse(err._body).error);
                }
                else {
                    _this.showToaster("Try again later");
                }
            });
            loader.dismiss();
        }
    };
    CreateBlogPage.prototype.showToaster = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    return CreateBlogPage;
}());
CreateBlogPage = __decorate([
    Component({
        selector: 'page-create-blog',
        templateUrl: 'create-blog.html',
        providers: [BlogListService]
    }),
    __metadata("design:paramtypes", [FormBuilder, NavController, NavParams, Storage, BlogListService, LoadingController, ToastController])
], CreateBlogPage);
export { CreateBlogPage };
//# sourceMappingURL=create-blog.js.map