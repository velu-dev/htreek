import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  data: any = {};

  constructor(private toastCtrl: ToastController, public loadingCtrl: LoadingController, public navCtrl: NavController, public actionCtrl: AlertController, public menu: MenuController, private loginService: LoginProvider) {
  }

  ionViewDidLoad() {
    this.menu.swipeEnable(false);
    console.log('ionViewDidLoad LoginPage');
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
  login() {
    this.loginService.doLogin(this.data).subscribe(res => {
      console.log("login", res);
      if (res.access_token) {
        let loading = this.loadingCtrl.create({
          spinner: 'bubbles',
          content: 'Please wait.'
        });

        loading.present();

        setTimeout(() => {
          localStorage.setItem("user", JSON.stringify(res));
          localStorage.setItem("is_login", 'true');
          this.navCtrl.setRoot(DashboardPage);
        }, 1000);

        setTimeout(() => {
          loading.dismiss();
        }, 3000);
      }
      else {
        const pswdAlert = this.actionCtrl.create({
          cssClass: "custom-alert",
          title: 'Credientials are wrong!',
          subTitle: 'Please check your username and password',
          buttons: [{
            text: 'OK',
            cssClass: "custom-alert-button"
          }]
        });
        pswdAlert.present();
      }
    },
    (err) => {
      const pswdAlert = this.actionCtrl.create({
        cssClass: "custom-alert",
        title: 'Credientials are wrong!',
        subTitle: 'Please check your username and password',
        buttons: [{
          text: 'OK',
          cssClass: "custom-alert-button"
        }]
      });
      pswdAlert.present();
    });
  }
}
