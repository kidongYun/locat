import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { ScrollHideConfig } from "../../directives/scroll-hide/scroll-hide";
import 'rxjs/add/operator/map';

import { CommentPage } from "../comment/comment";
import { MapPage } from '../map/map';
import { WritePage } from '../write/write';

/**
 * Generated class for the RankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rank',
  templateUrl: 'rank.html',
})
export class RankPage {
  item : any;
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

  listItems1: any[] = [{item: '11M 30D'}, {item: 'STEP'}, {item: 'pm.7'}];
  listItems2: any[] = [{item: 'OH'}, {item: 'CHANG'}, {item: 'YEOL'}];
  listItems3: any[] = [{item: 'L'}, {item: 'O'}, {item: 'L'}, {item: 'Akail'}];

  pictureItems1: any[] = [{item: '11M 30D'}, {item: 'STEP'}, {item: 'pm.7'}];
  pictureItems2: any[] = [{item: '11M 30D'}, {item: 'STEP'}, {item: 'pm.7'}];
  pictureItems3: any[] = [{item: '11M 30D'}, {item: 'STEP'}, {item: 'pm.7'}];
}
