import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';
import { ScrollHideConfig } from "../../directives/scroll-hide/scroll-hide";
import 'rxjs/add/operator/map';

import { CommentPage } from "../comment/comment";
import { MapPage } from '../map/map';
import { WritePage } from '../write/write';
import { SettingPage } from '../setting/setting';
import { ViewPage } from '../view/view';
declare var google;

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  data: any;
  url: string;
  profiles: any;
  profile_feeds: any;
  onsegment: any;
  id: any;
  feeds: any;

  options : GeolocationOptions;
  infowindow: any;
  currentPos : Geoposition;
  @ViewChild('map') mapElement: ElementRef;
  geocoder: any;

  idParams = {
    id: this.navParams.get('id')
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private http: Http, public loading: LoadingController, private geolocation: Geolocation) {
      this.onsegment = "map";
      this.getUserPosition();
  }

  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 70 };

  map() {
    this.navCtrl.push(MapPage, this.idParams);
  }

  write() {
    this.navCtrl.push(WritePage, this.idParams);
  }

  setting() {
    this.navCtrl.push(SettingPage);
  }

  view() {
    this.navCtrl.push(ViewPage);
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

  ngOnInit() {
    this.id = this.navParams.get('id');
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = {
      id: this.id
    };
    this.http.post('http://localhost/locat/profile_fetch.php', body, options)
    .map(res => res.json())
    .subscribe(res => {
      this.profiles = res.server_response;
    });
    this.http.post('http://localhost/locat/profile_feed_fetch.php', body, options)
    .map(res => res.json())
    .subscribe(res => {
      this.profile_feeds = res.server_response;
    });
  }

  doRefresh(refresher) {
    this.id = this.navParams.get('id');
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = {
       id: this.id
    };
    this.http.post('http://localhost/locat/profile_fetch.php', body, options)
    .map(res => res.json())
    .subscribe(res => {
    this.profiles = res.server_response;
    refresher.complete();
    });
    this.http.post('http://localhost/locat/profile_feed_fetch.php', body, options)
    .map(res => res.json())
    .subscribe(res => {
      setTimeout(() => {
        this.profile_feeds = res.server_response;
        refresher.complete();
      }, 1000);
    });
  }

  feedView(no) {
    this.id = this.navParams.get('id');
    let data = {
      id: this.id,
      no: no
    };
    this.navCtrl.push(ViewPage, data);
  }

}
