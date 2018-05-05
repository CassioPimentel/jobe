import { Component } from '@angular/core';
import { ToastController, NavController  } from 'ionic-angular';
import { FavoritosPage } from '../favoritos/favoritos';
import { VagasPage } from '../vagas/vagas';
import { BuscaPage } from '../busca/busca';
import { Network } from '@ionic-native/network';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = BuscaPage;
  tab2Root = VagasPage;
  tab3Root = FavoritosPage;

  connected: Subscription
  disconnected: Subscription;

  constructor(public network: Network,
              private toast: ToastController,
              public navCtrl: NavController) {

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
