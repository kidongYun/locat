import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { ScrollHideConfig } from '../../directives/scroll-hide/scroll-hide';
import 'rxjs/add/operator/map';

import { CommentPage } from "../comment/comment";
import { MapPage } from '../map/map';
import { WritePage } from '../write/write';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  home_feeds: any;
  id: any;

  public like_btn = {
    color: 'primary',
    icon_name: 'ios-heart-outline'
  };

  idParams = {
    id: this.navParams.get('id')
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private http: Http, public loading: LoadingController) {
  }

  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 70 };

  map() {
    this.navCtrl.push(MapPage, this.idParams);
  }

  write() {
    this.navCtrl.push(WritePage, this.idParams);
  }

  comment() {
    this.navCtrl.push(CommentPage);
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
    this.http.post('http://localhost/locat/home_feed_fetch.php', body, options)
    .map(res => res.json())
    .subscribe(res => {
      setTimeout(() => {
        this.home_feeds = res.server_response;
        refresher.complete();
      }, 1000);
    });
  }

  doInfinite(infiniteScroll) {
    this.id = this.navParams.get('id');
    var headers = new Headers();
     headers.append("Accept", 'application/json');
     headers.append('Content-Type', 'application/json' );
     let options = new RequestOptions({ headers: headers });
     let body = {
       id: this.id
     };
    this.http.post('http://localhost/locat/home_feed_fetch.php', body, options)
    .map(res => res.json())
    .subscribe(res => {
      setTimeout(() => {
      this.home_feeds = this.home_feeds.concat(res.server_response);
      infiniteScroll.complete();
      }, 1000);
    });
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
     let loader = this.loading.create({
         content: '진행중…',
       });
     loader.present().then(() => {
     this.http.post('http://localhost/locat/home_feed_fetch.php', body, options)
     .map(res => res.json())
     .subscribe(res => {
      loader.dismiss();
      this.home_feeds = res.server_response;
     });
   });
  }

  like(no, getter_id) {
    if (this.like_btn.color  === 'primary') {
      this.like_btn.icon_name = 'ios-heart';
      this.like_btn.color = 'danger';
    }
    else {
      this.like_btn.icon_name = 'ios-heart-outline';
      this.like_btn.color = 'primary';
    }
    this.id = this.navParams.get('id');
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let data = {
      sender_id: this.id,
      no: no,
      getter_id: getter_id
    };
    this.http.post('http://localhost/locat/like.php', data, options)
    .map(res => res.json())
    .subscribe(res => {
      if(res == "success") {
        this.id = this.navParams.get('id');
        var headers = new Headers();
         headers.append("Accept", 'application/json');
         headers.append('Content-Type', 'application/json' );
         let options = new RequestOptions({ headers: headers });
         let body = {
           id: this.id
         };
        this.http.post('http://localhost/locat/home_feed_fetch.php', body, options)
        .map(res => res.json())
        .subscribe(res => {
        this.home_feeds = res.server_response;
        });
      }
    });
  }

}
