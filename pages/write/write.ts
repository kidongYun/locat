import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';

import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';

import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { RankPage } from '../rank/rank';
import { NotifyPage } from '../notify/notify';

declare var google;
/**
 * Generated class for the WritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-write',
  templateUrl: 'write.html',
})
export class WritePage {

  data:any;
  items:any;
  photo:any;
  id:any;
  options : GeolocationOptions;
  infowindow: any;
  currentPos : Geoposition;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  lat: any;
  lng: any;
  locat: any;

  @ViewChild("content") content;

  idParams = {
    id: this.navParams.get('id')
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    private http: Http, public loading: LoadingController, private camera: Camera, private transfer: FileTransfer,
    private file: File, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) {
      this.getUserPosition();
  }




    getUserPosition() {
      this.options = {
          enableHighAccuracy : false
      };
      this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
          this.currentPos = pos;
          this.ionViewDidLoad(pos.coords.latitude,pos.coords.longitude);
      }, (err : PositionError)=>{
          console.log("error : " + err.message);
      });
    }

    ionViewDidLoad(lat,lng) {
      let latLng =  new google.maps.LatLng(lat,lng);
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

      var marker = new google.maps.Marker({
        position: latLng,
        animation: google.maps.Animation.BOUNCE
        // icon:'cat.png'
      });
      marker.setMap(this.map);





      this.geolocation.getCurrentPosition().then((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        geocodeLatLng(position.coords.latitude, position.coords.longitude, function(location) {
          console.log(location); // this is where you get the return value
        });
      //  console.log("location : " + this.locat +"\n", "lat : " + this.lat +"\n", "lng : " + this.lng+"\n","zoom : " + this.map.getZoom());;
      });

      var address;
      function geocodeLatLng(lat, lng, fn) {
       var geocoder = new google.maps.Geocoder();
       var latlng = {lat: lat, lng: lng};
       geocoder.geocode({'location': latlng}, function(results, status) {
         if (status === 'OK') {
           fn(results[0].formatted_address);
         } else {
           window.alert('Geocoder failed due to: ' + status);
         }
       });
      }

    }


    write() {
      this.id = this.navParams.get('id');
      let url = "http://localhost/locat/write.php";
      let body = {
        id: this.id,
        location: this.locat,
        lat: this.lat,
        lng: this.lng,
        zoom: this.map.getZoom(),
        content: this.content.value
      }
      var headers = new Headers();
       headers.append("Accept", 'application/json');
       headers.append('Content-Type', 'application/json' );
       let options = new RequestOptions({ headers: headers });
      this.http.post(url, body, options)
        .map(res => res.json())
        .subscribe(res => {
          if(res=="success") {
            let toast = this.toastCtrl.create({
              message: '새 피드가 작성되었습니다',
              duration: 3000,
              position: 'top',
              showCloseButton: true,
              closeButtonText: "확인",
              cssClass: "toastCss"
            });
            toast.present();
            this.navCtrl.pop();
          } else {
            let toast = this.toastCtrl.create({
              message: res,
              duration: 3000,
              position: 'top',
              showCloseButton: true,
              closeButtonText: "확인",
              cssClass: "toastCss"
            });
            toast.present();
          }
        });
      }


}
