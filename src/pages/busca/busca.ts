import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PesquisaCidadePage } from '../pesquisa-cidade/pesquisa-cidade';

@IonicPage()
@Component({
  selector: 'page-busca',
  templateUrl: 'busca.html',
})
export class BuscaPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController){
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscaPage');
  }
  
  getCidade(){
    let modal = this.modalCtrl.create(PesquisaCidadePage);
    modal.present();
  }

}
