import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { ScrollHideConfig } from '../../directives/scroll-hide/scroll-hide';
import 'rxjs/add/operator/map';

import { CommentPage } from "../comment/comment";
/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {
  views: any;
  no: any;
  id: any;

  public like_btn = {
    color: 'primary',
    icon_name: 'ios-heart-outline'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private http: Http, public loading: LoadingController) {
  }

  ngOnInit() {
    this.no = this.navParams.get('no');
    var headers = new Headers();
     headers.append("Accept", 'application/json');
     headers.append('Content-Type', 'application/json' );
     let options = new RequestOptions({ headers: headers });
     let body = {
       no: this.no
     };
     this.http.post('http://localhost/locat/view_fetch.php', body, options)
     .map(res => res.json())
     .subscribe(res => {
     this.views = res.server_response;
     });
  }

  comment() {
    this.navCtrl.push(CommentPage);
  }

  like(getter_id) {
    if (this.like_btn.color  === 'primary') {
      this.like_btn.icon_name = 'ios-heart';
      this.like_btn.color = 'danger';
    }
    else {
      this.like_btn.icon_name = 'ios-heart-outline';
      this.like_btn.color = 'primary';
    }
    this.id = this.navParams.get('id');
    this.no = this.navParams.get('no');
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let data = {
      sender_id: this.id,
      no: this.no,
      getter_id: getter_id
    };
    this.http.post('http://localhost/locat/like.php', data, options)
    .map(res => res.json())
    .subscribe(res => {
      if(res == "success") {
        this.no = this.navParams.get('no');
        var headers = new Headers();
         headers.append("Accept", 'application/json');
         headers.append('Content-Type', 'application/json' );
         let options = new RequestOptions({ headers: headers });
         let body = {
           no: this.no
         };
        this.http.post('http://localhost/locat/view_fetch.php', body, options)
        .map(res => res.json())
        .subscribe(res => {
        this.views = res.server_response;
        });
      }
    });
  }

}
