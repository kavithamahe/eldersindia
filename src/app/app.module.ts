import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';


import { IonicStorageModule  } from '@ionic/storage';
import {IonTagsInputModule} from "ionic-tags-input";
import { MyApp } from './app.component';
import { TruncateModule } from 'ng2-truncate';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { File } from '@ionic-native/file';
import * as Sentry from 'sentry-cordova';

import { Ng2CompleterModule } from "ng2-completer";
import { DatePipe } from '@angular/common';
import { Network } from '@ionic-native/network';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Device } from "@ionic-native/device";
import { GoogleAnalytics } from '@ionic-native/google-analytics';


import {BrowserModule} from '@angular/platform-browser';
import { Ng2EmojiModule } from 'ng2-emoji';
import { NativeAudio } from '@ionic-native/native-audio';

import { Geolocation } from 'ionic-native';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Diagnostic } from 'ionic-native';
import { CameraPreview } from 'ionic-native';
import {MomentModule} from 'angular2-moment';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { InAppBrowser } from 'ionic-native';


import { LoginPage } from '../pages/login/login';
import { AppConfig } from '../providers/app-config';
import { LoginUser } from '../providers/login-user';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ConnectionsPage } from '../pages/connections/connections';
import { JobboardPage } from '../pages/jobboard/jobboard';
import { SinglejobPage } from '../pages/singlejob/singlejob';
import { AppliedJobsPage } from '../pages/applied-jobs/applied-jobs';
import { MessagesPage } from '../pages/messages/messages';
import { CreateMessagePage } from '../pages/create-message/create-message';
import { ViewMessagesPage } from '../pages/view-messages/view-messages';
import { ViewpackagePagePage } from '../pages/viewpackage/viewpackage';
import { ElderservicePagePage } from '../pages/elderservice/elderservice';
import { PaymentPage } from '../pages/payment/payment';
import { PackagepaymentPagePage } from '../pages/packagepayment/packagepayment';
import { RemotemonitorPagePage } from '../pages/remotemonitor/remotemonitor';
import { VerifyotpPagePage } from '../pages/verifyotp/verifyotp';

import {PackageRequestPagePage } from '../pages/package-request/package-request';
import {PackageDetailPagePage } from '../pages/package-detail/package-detail';

import { ServiceprovidersPage } from '../pages/serviceproviders/serviceproviders';
import { ServicerequestPage } from '../pages/servicerequest/servicerequest';
import { ViewServiceRequestPage } from '../pages/view-service-request/view-service-request';
import { BlogsPage } from '../pages/blogs/blogs';
import { SingleblogPage } from '../pages/singleblog/singleblog';
import { ShareBlogPagePage } from '../pages/share-blog/share-blog';
import { CreateBlogPage } from '../pages/create-blog/create-blog';
import { NewsPage } from '../pages/news/news';
import { ViewNewsPage } from '../pages/view-news/view-news';
import { EventsPage } from '../pages/events/events';
import { ViewEventsPage } from '../pages/view-events/view-events';
import { ExternallinksPage } from '../pages/externallinks/externallinks';
import { LogoutPage } from '../pages/logout/logout';
import { JobDependentPage } from '../pages/job-dependent/job-dependent';
import { EmojiPickerPage } from '../pages/emoji-picker/emoji-picker';
import { RecurringPagePage } from '../pages/recurring/recurring';
import { RecurringviewPagePage } from '../pages/recurringview/recurringview';
import { RecurringcancelPagePage } from '../pages/recurringcancel/recurringcancel';
import { EnquiriesPagePage } from '../pages/enquiries/enquiries';
import { ViewenquiryPagePage } from '../pages/viewenquiry/viewenquiry';
import { SafemePagePage } from '../pages/safeme/safeme';
import { CancelrequestsPage } from '../pages/cancelrequests/cancelrequests';

import { CommunitylistPage } from '../pages/communitylist/communitylist';
import { CommunityPage } from '../pages/community/community';

import { CommunityPopoverPage } from '../pages/community/community';
import { CommunityprofilePage } from '../pages/communityprofile/communityprofile';
import { CommunitymessagePage } from '../pages/communitymessage/communitymessage';
import { CommunitycommentsPage } from '../pages/communitycomments/communitycomments';

import { MyprofilesettingPage } from '../pages/myprofilesetting/myprofilesetting';
import { CommunitymembersPage } from '../pages/communitymembers/communitymembers';
import { PopoverPage } from '../pages/connections/connections';
import { PackagePopoverPage } from '../pages/package-request/package-request';
import { EnquiryPopoverPage } from '../pages/enquiries/enquiries';

import { ManagePage } from '../pages/manage/manage';

import { EldersPage } from '../pages/elders/elders';
import { CommunityServices } from '../providers/community-services';

import { SubCategoryPage } from '../pages/sub-category/sub-category';
import { SubcategoryListPage } from '../pages/subcategory-list/subcategory-list';
import { InstantRequestModalPage } from '../pages/subcategory-list/subcategory-list';
import { ServiceInfoPage } from '../pages/service-info/service-info';
import { ServiceModalPage } from '../pages/service-modal/service-modal';
import { ModalContentPage } from '../pages/modal-page/modal-page';
import { Modelpage1PagePage } from '../pages/modelpage1/modelpage1';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { SettingsPage } from '../pages/settings/settings';
import { SubCategoryServicePage } from '../pages/sub-category-service/sub-category-service';
import { TermsModalPage } from '../pages/terms-modal/terms-modal';
import { GetpackagePagePage } from '../pages/getpackage/getpackage';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ServiceProvider } from '../providers/service-provider';
import { BlogListService } from '../providers/blog-list-service';
import { NetworkProvider } from '../providers/network/network';

import { HttpClientModule } from '@angular/common/http';

// Sentry.init({ dsn: 'https://c70968390e6645c4a30b0aa7462b8fc3@monitor.eldersindia.com/7' });

// export class SentryIonicErrorHandler extends IonicErrorHandler {
//   handleError(error) {
//     super.handleError(error);
//     try {
//       Sentry.captureException(error.originalError || error);
//     } catch (e) {
//       console.error(e);
//     }
//   }
// }
 
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DashboardPage,
    ConnectionsPage,
    CommunitylistPage,
    CommunityPage,
    CommunityPopoverPage,
    CommunityprofilePage,
    CommunitymessagePage,
    CommunitycommentsPage,
    MyprofilesettingPage,
    EmojiPickerPage,
    CommunitymembersPage,
    PopoverPage,
    PackagePopoverPage,
    EnquiryPopoverPage,
    ShareBlogPagePage,
    GetpackagePagePage,
    ViewpackagePagePage,
    ElderservicePagePage,
    PaymentPage,
    ManagePage,
    EldersPage,
    JobboardPage,
    SinglejobPage,
    AppliedJobsPage,
    MessagesPage,
    CreateMessagePage,
    ViewMessagesPage,
    ServiceprovidersPage,
    PackageRequestPagePage,
    PackageDetailPagePage,
    RecurringPagePage,
    RecurringviewPagePage,
    RecurringcancelPagePage,
    ServicerequestPage,
    ViewServiceRequestPage,
    BlogsPage,
    SingleblogPage,
    CreateBlogPage,
    LogoutPage,
    JobDependentPage,
    SubCategoryPage,
    SubCategoryServicePage,
    SubcategoryListPage,
    ServiceInfoPage,
    ModalContentPage,
    Modelpage1PagePage,
    InstantRequestModalPage,
    NewsPage,
    ViewNewsPage,
    EventsPage,
    ExternallinksPage,
    ViewEventsPage,
    ForgotPasswordPage,
    MyProfilePage,
    EditProfilePage,
    ChangePasswordPage,
    SettingsPage,
    ServiceModalPage,
    TermsModalPage,
    PackagepaymentPagePage,
    RemotemonitorPagePage,
    EnquiriesPagePage,
    ViewenquiryPagePage,
    SafemePagePage,
    VerifyotpPagePage,
    CancelrequestsPage
  ],
  imports: [
    IonicStorageModule.forRoot({}),
    IonicModule.forRoot(MyApp,AppConfig),
    HttpModule,
    TruncateModule,
    IonTagsInputModule,
    TagInputModule,
    BrowserAnimationsModule,
    Ionic2RatingModule,
    Ng2CompleterModule,
    BrowserModule,
    Ng2EmojiModule,
    MomentModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DashboardPage,
    ConnectionsPage,
    CommunitylistPage,
    CommunityprofilePage,
    CommunitymessagePage,
    CommunitycommentsPage,
    MyprofilesettingPage,
    EmojiPickerPage,
    CommunitymembersPage,
    ViewpackagePagePage,
    PopoverPage,
    PackagePopoverPage,
    EnquiryPopoverPage,
    ShareBlogPagePage,
    GetpackagePagePage,
    CommunityPage,
    CommunityPopoverPage,
    ElderservicePagePage,
    PaymentPage,
    ManagePage,
    EldersPage,
    JobboardPage,
    SinglejobPage,
    AppliedJobsPage,
    MessagesPage,
    CreateMessagePage,
    ViewMessagesPage,
    ServiceprovidersPage,
    PackageRequestPagePage,
    PackageDetailPagePage,
    RecurringPagePage,
    RecurringviewPagePage,
    RecurringcancelPagePage,
    ServicerequestPage,
    ViewServiceRequestPage,
    BlogsPage,
    SingleblogPage,
    CreateBlogPage,
    LogoutPage,
    JobDependentPage,
    SubCategoryPage,
    SubCategoryServicePage,
    SubcategoryListPage,
    ServiceInfoPage,
    ModalContentPage,
    Modelpage1PagePage,
    InstantRequestModalPage,
    NewsPage,
    ViewNewsPage,
    EventsPage,
    ExternallinksPage,
    ViewEventsPage,
    ForgotPasswordPage,
    MyProfilePage,
    EditProfilePage,
    ChangePasswordPage,
    SettingsPage,
    ServiceModalPage,
    TermsModalPage,
    PackagepaymentPagePage,
    RemotemonitorPagePage,
    EnquiriesPagePage,
    ViewenquiryPagePage,
    SafemePagePage,
    VerifyotpPagePage,
    CancelrequestsPage
  ],
     providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},FileTransfer,FileChooser,FilePath,File,FileOpener,Diagnostic,CameraPreview,Geolocation,NativeGeocoder,NativeAudio,Network,Push,LoginUser,CommunityServices,ServiceProvider,BlogListService,AppConfig,IonicStorageModule,DatePipe,Device,GoogleAnalytics, 
    NetworkProvider] // Add GithubUsers provider


})
export class AppModule {}
