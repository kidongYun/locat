import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { ScrollHideConfig } from "../../directives/scroll-hide/scroll-hide";
import 'rxjs/add/operator/map';

import { CommentPage } from "../comment/comment";
import { MapPage } from '../map/map';
import { WritePage } from '../write/write';

/**
 * Generated class for the NotifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notify',
  templateUrl: 'notify.html',
})
export class NotifyPage {
  data: any;
  url: string;
  notifys: any;
  id: any;

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

  doRefresh(refresher) {
    this.id = this.navParams.get('id');
    var headers = new Headers();
     headers.append("Accept", 'application/json');
     headers.append('Content-Type', 'application/json' );
     let options = new RequestOptions({ headers: headers });
     let body = {
       id: this.id
     };
    this.http.post('http://localhost/locat/notify_fetch.php', body, options)
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
    this.http.post('http://localhost/locat/notify_fetch.php', body, options)
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
    let data = {
      id: this.id
    };
    this.http.post('http://localhost/locat/notify_fetch.php', data, options)
    .map(res => res.json())
    .subscribe(res => {
      this.notifys = res.server_response;
    });
  }
}
