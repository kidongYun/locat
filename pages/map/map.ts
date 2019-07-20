import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ElementRef, ViewChild } from '@angular/core';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';

declare var google;
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  id:any;
  options : GeolocationOptions;
  infowindow: any;
  currentPos : Geoposition;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  geocoder: any;

  @ViewChild('address') address: ElementRef;
  @ViewChild('submit') submit;

  constructor(private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
    this.getUserPosition();
  }

  getUserPosition() {
    this.options = {
        enableHighAccuracy : false
    };
    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
        this.currentPos = pos;
        this.ionViewDidLoad(pos.coords.latitude,pos.coords.longitude);
    },(err : PositionError)=>{
        console.log("error : " + err.message);
    });
  }

  ionViewDidLoad(lat,lng) {
    this.id = this.navParams.get('id');
    let latLng =  new google.maps.LatLng(lat, lng);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      panControl: true,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: true,
      rotateControl: true
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.geocoder = new google.maps.Geocoder();

    var marker = new google.maps.Marker({
      position: latLng,
      animation: google.maps.Animation.BOUNCE
          // icon:'cat.png'
    });
    marker.setMap(this.map);
  }

  geocodeAddress() {
    var resultsMap = this.map;
    var geocoder = this.geocoder;
    var address = this.address.nativeElement.value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

}
