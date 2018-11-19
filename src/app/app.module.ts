import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {IBeacon} from "@ionic-native/ibeacon";
import {BeaconDetectionService} from "./shared/beacon-detection.service";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {HTTP} from "@ionic-native/http";
import {HttpClientModule} from "@angular/common/http";
import {RouteRetrievalService} from "./shared/route-retrieval.service";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IBeacon,
    BeaconDetectionService,
    InAppBrowser,
    HTTP,
    RouteRetrievalService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
