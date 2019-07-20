import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { Http, Headers, RequestOptions }  from "@angular/http";
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  @ViewChild("id") id;
  @ViewChild("pw_1") pw_1;
  @ViewChild("pw_2") pw_2;
  @ViewChild("name") name;
  @ViewChild("sex") sex;
  @ViewChild("birth_1") birth_1;
  @ViewChild("birth_2") birth_2;
  @ViewChild("birth_3") birth_3;
  @ViewChild("tel_1") tel_1;
  @ViewChild("tel_2") tel_2;
  @ViewChild("tel_3") tel_3;
  @ViewChild("email_1") email_1;
  @ViewChild("email_2") email_2;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController,
    private http: Http, public loading: LoadingController, public viewCtrl: ViewController) {
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  register() {
    let url = "http://localhost/locat/register.php";
    let body = {
      id: this.id.value,
      pw_1: this.pw_1.value,
      pw_2: this.pw_2.value,
      name: this.name.value,
      sex: this.sex.value,
      birth_1: this.birth_1.value,
      birth_2: this.birth_2.value,
      birth_3: this.birth_3.value,
      tel_1 : this.tel_1.value,
      tel_2 : this.tel_2.value,
      tel_3 : this.tel_3.value,
      email_1: this.email_1.value,
      email_2: this.email_2.value
    }
    var options = new Headers();
    options.append('Accept', 'application/json');
    options.append('Content-Type', 'application/json');
    let headers = new RequestOptions({ headers: options });
    this.http.post(url,body,headers)
      .map(res => res.json())
      .subscribe(res => {
        if(res=="success") {
          let toast = this.toastCtrl.create({
            message: '회원가입 되었습니다.',
            duration: 3000,
            position: 'top'
          });
          toast.present();
          this.navCtrl.push(LoginPage);
        } else {
          let toast = this.toastCtrl.create({
            message: res,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
      });
  }
}
