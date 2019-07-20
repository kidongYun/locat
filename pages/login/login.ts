import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, ToastController, ModalController } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import 'rxjs/add/operator/map';

import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild("id") id;
  @ViewChild("pw") pw;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
  private http: Http, public loading: LoadingController, public modalCtrl: ModalController) {
  }

  register() {
    let registerModal = this.modalCtrl.create(RegisterPage);
    registerModal.present();
  }

  login() {
    let url = "http://localhost/locat/login.php";
    let body = {
      id: this.id.value,
      pw: this.pw.value
    }
    var headers = new Headers();
     headers.append("Accept", 'application/json');
     headers.append('Content-Type', 'application/json' );
     let options = new RequestOptions({ headers: headers });
    let loader = this.loading.create({
        content: '진행중...',
    });
    loader.present().then(() => { // 로딩창 띄우면
      this.http.post(url,body,options) // login.php에 헤더와 id,pw를 post
      .map(res => res.json()) // res에 json 대입
      .subscribe(res => { // res 조건 함수 실행
        loader.dismiss() // 로딩창 해지
        if(res == "success") {
          let toast = this.toastCtrl.create({
            message: body.id+'님, 로그인되었습니다.',
            duration: 3000,
            position: 'top',
            showCloseButton: true,
            closeButtonText: "확인",
            cssClass: "toastCss"
          });
          toast.present();
          this.navCtrl.setRoot(TabsPage, body);
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
    });
  }
}
