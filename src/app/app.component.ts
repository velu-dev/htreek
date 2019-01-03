import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DashboardPage } from '../pages/dashboard/dashboard';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { CalendarPage } from '../pages/calendar/calendar';
import { PropertiesPage } from '../pages/properties/properties';
import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  user: any =''
  rootPage: any;

  pages: Array<{title: string, component: any, icon: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public loadingCtrl: LoadingController,) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', component: DashboardPage, icon:'md-timer' },
      { title: 'Calendar', component: CalendarPage, icon:'md-calendar' },
      { title: 'Properties', component: PropertiesPage, icon:'md-stats' },
      { title: 'Profile', component: ProfilePage, icon:'md-person' }
    ];

  }

  initializeApp() {
      this.user = localStorage.getItem("is_login");
      if (this.user == undefined){ 
        this.user = false;
      }
    if (this.user == 'true') {
      // if (!localStorage.getItem("is_first")) {
        this.rootPage = DashboardPage;
      // } else {
      //   this.rootPage = LoginPage;
      // }
    } else {
      this.rootPage = LoginPage;
    }
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout(){
    let loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Please wait."
    });

    loading.present();

    setTimeout(() => {
      localStorage.clear();
      this.nav.setRoot(LoginPage);
    }, 1000);

    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }
}
