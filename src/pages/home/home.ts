import {Component, NgZone} from "@angular/core";
import {BeaconModel} from "../../app/shared/models/beacon.model";
import {NavController, Platform, Events} from "ionic-angular";
import {BeaconDetectionService} from "../../app/shared/beacon-detection.service";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {HTTP, HTTPResponse} from "@ionic-native/http";
import {RouteResponse} from "../../app/shared/models/route-response.model";
import {HttpClient} from "@angular/common/http";
import {RouteRetrievalService} from "../../app/shared/route-retrieval.service";

@Component({
  selector: 'page-home',
templateUrl: 'home.html'
})
export class HomePage {

  beacons: BeaconModel[] = [];

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public beaconDetector: BeaconDetectionService,
              public events: Events,
              public iab: InAppBrowser,
              public http: HttpClient,
              public zone: NgZone,
              public routeRetriever: RouteRetrievalService) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.beaconDetector.initialise().then((isInitialised) => {
        if (isInitialised) {
          this.listenToBeaconEvents();
        }
      });
    });
  }

  listenToBeaconEvents() {
    this.events.subscribe('didRangeBeaconsInRegion', this.onBeaconDetected.bind(this));
    // this.onBeaconDetected({beacons: [{
    //   uuid: 'b99143e5-ebfd-4fdf-bbc0-739473fd05f7',
    //   major: '12345',
    //   minor: '67890',
    //   rssi: '90'
    // }]});
  }

  public onBeaconDetected(data) {

    // update the UI with the beacon list
    this.zone.run(() => {

      this.beacons = [];

      let beaconList = data.beacons;
      beaconList.forEach((beacon) => {
        let beaconObject = new BeaconModel(beacon);
        this.beacons.push(beaconObject);
      });
      if (beaconList.length) {
        console.log('beaconList',beaconList[0].uuid);
        this.routeRetriever.getRoute('b99143e5-ebfd-4fdf-bbc0-739473fd05f7')
          .subscribe((res) => {
            console.log('Response',res);
            // let route: RouteResponse = res.data;
            // if (route && route.results) {
            //   this.iab.create(route.results[0]);
            // }
          });
      }
    });
  }
}
