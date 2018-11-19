import { Injectable } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { IBeacon } from '@ionic-native/ibeacon';
/*
 Generated class for the BeaconProvider provider.

       See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class BeaconDetectionService {

  delegate: any;
  region: any;

  constructor(public platform: Platform, public events: Events, public iBeacon: IBeacon) {
  }

  initialise(): any {
    let promise = new Promise((resolve, reject) => {
      // we need to be running on a device
      if (this.platform.is('cordova')) {

        // Request permission to use location on iOS
        this.iBeacon.requestAlwaysAuthorization();

        // create a new delegate and register it with the native layer
        this.delegate = this.iBeacon.Delegate();

        // Subscribe to some of the delegate's event handlers
        this.delegate.didRangeBeaconsInRegion()
          .subscribe(
            data => {
              this.events.publish('didRangeBeaconsInRegion', data);
            },
            error => console.error()
          );

        // setup a beacon region – CHANGE THIS TO YOUR OWN UUID
        this.region = this.iBeacon.BeaconRegion('deskBeacon', 'b99143e5-ebfd-4fdf-bbc0-739473fd05f7');

        // start ranging
        this.iBeacon.startRangingBeaconsInRegion(this.region)
          .then(
            () => {
              console.log('Start Ranging');
              resolve(true);
            },
            error => {
              console.error('Failed to begin monitoring: ', error);
              resolve(false);
            }
          );
      } else {
        console.error('This application needs to be running on a device');
        resolve(false);
      }
    });

    return promise;
  }
}

