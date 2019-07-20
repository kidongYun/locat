import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { NotifyPage } from '../notify/notify';
import { RankPage } from '../rank/rank';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  idParams = {
    id: this.navParams.get('id')
  };

  HomePage = HomePage;
  RankPage = RankPage;
  NotifyPage = NotifyPage;
  ProfilePage = ProfilePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
