import { ConcursosPage } from './../concursos/concursos';
import { Component } from '@angular/core';
import { ToastController, NavController  } from 'ionic-angular';
import { FavoritosPage } from '../favoritos/favoritos';
import { VagasPage } from '../vagas/vagas';
import { BuscaPage } from '../busca/busca';
import { Network } from '@ionic-native/network';
import { Subscription } from 'rxjs/Subscription';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = BuscaPage;
  tab2Root = VagasPage;
  tab3Root = FavoritosPage;
  tab4Root = ConcursosPage;

  connected: Subscription
  disconnected: Subscription;

  constructor(public network: Network,
              private toast: ToastController,
              public navCtrl: NavController,
              private adMob: AdMobFree) {
    this.showBanner();
  }

  showBanner(){
    const bannerConfig: AdMobFreeBannerConfig = {
      id: 'ca-app-pub-7878454572934961~6204894083',

      isTesting: true,
      autoShow: true
     };
     this.adMob.banner.config(bannerConfig);
     
     this.adMob.banner.prepare()
       .then(() => {
         // banner Ad is ready
         // if we set autoShow to false, then we will need to call the show method here
       })
       .catch(e => console.log(e));
  }

  displayNetworkUpdate(connectionState: string){
    let networkType = this.network.type
    console.log(connectionState);
    this.toast.create({
      message: 'Você esta ' + connectionState,
      duration: 3000
    }).present();
  }

  ionViewWillLeave(){
   this.connected.unsubscribe();
   this.disconnected.unsubscribe();
  }

  ionViewDidEnter(){
   this.connected = this.network.onConnect().subscribe(data => {
     console.log(data);
     this.displayNetworkUpdate(data.type);
   }, error => console.error(error));

   this.disconnected = this.network.onDisconnect().subscribe(data => {
     console.log(data);
     this.displayNetworkUpdate(data.type);
   }, error => console.log(error));
  }
}
