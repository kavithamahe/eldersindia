import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BlogsPage } from '../../pages/blogs/blogs';
import { CreateBlogPage } from '../../pages/create-blog/create-blog';
import { ManageBlogsPage } from '../../pages/manage-blogs/manage-blogs';
import { DashboardPage } from '../../pages/dashboard/dashboard'

@Component({
  selector: 'page-blogtabs',
  templateUrl: 'blogtabs.html'
})
export class BlogtabsPage {
  tab1Root = BlogsPage;
  tab2Root  = ManageBlogsPage;
  tab3Root = CreateBlogPage;
  constructor(public navParams: NavParams, public nav: NavController) {
  	this.nav=nav;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlogtabsPage');
  }
 public dashboardPage()
  {
    this.nav.setRoot(DashboardPage);
  }

}
