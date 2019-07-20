import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ScrollHideDirective } from '../directives/scroll-hide/scroll-hide';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer'
import { File } from '@ionic-native/file';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';


import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { NotifyPage } from '../pages/notify/notify';
import { RankPage } from '../pages/rank/rank';
import { TabsPage } from '../pages/tabs/tabs';
import { MapPage } from '../pages/map/map';
import { CommentPage } from "../pages/comment/comment";
import { WritePage } from '../pages/write/write';
import { SettingPage } from '../pages/setting/setting';
import { ViewPage } from '../pages/view/view';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    ProfilePage,
    NotifyPage,
    RankPage,
    TabsPage,
    MapPage,
    WritePage,
    CommentPage,
    SettingPage,
    ViewPage,
    ScrollHideDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    RankPage,
    ProfilePage,
    NotifyPage,
    TabsPage,
    MapPage,
    WritePage,
    SettingPage,
    CommentPage,
    ViewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
   
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
