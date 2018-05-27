import { Component } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Market } from '@ionic-native/market';

@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage {

  public version: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private appVersion: AppVersion,
              private market: Market) {
    //this.version = this.getAppVersion();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracoesPage');
  }

  getAppVersion(){
    this.appVersion.getVersionNumber().then(function(result) {
      return result;
   })    
  }

  abrirAplicativo(){
    this.market.open('io.jobe');
  }

  close(){
    this.navCtrl.pop();
  }

}
