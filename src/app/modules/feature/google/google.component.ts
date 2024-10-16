import { Component, OnInit, ViewChild, Input, Inject, PLATFORM_ID } from '@angular/core';

import { MapsAPILoader } from '@agm/core';

import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})

/**
 * Google component
 */
export class GoogleComponent implements OnInit {
  longitude = 20.728218;
  latitude = 52.128973;
  markers: any;

  @ViewChild('streetviewMap', { static: true }) streetviewMap: any;
  @ViewChild('streetviewPano', { static: true }) streetviewPano: any;

  // bread crumb items
  constructor(@Inject(PLATFORM_ID) private platformId: any, private mapsAPILoader: MapsAPILoader) { }


  ngOnInit(): void {
    this._fetchData();
  }



  /**
   *
   * @param position position where marker added
   */
  placeMarker(position: any) {
    const lat = position.coords.lat;
    const lng = position.coords.lng;

    this.markers.push({ latitude: lat, longitude: lng });
  }

 
  private _fetchData() {
    this.markers = [
      { latitude: 52.228973, longitude: 20.728218 }
    ];
  }

}
