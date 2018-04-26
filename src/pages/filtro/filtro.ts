import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VagasPage } from '../vagas/vagas';

@IonicPage()
@Component({
  selector: 'page-filtro',
  templateUrl: 'filtro.html',
})
export class FiltroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltroPage');
  }
  
  close(){
    this.navCtrl.pop();
  }

  filtrar(ordenacao: any){
    console.log(ordenacao);
    this.navCtrl.push(VagasPage, { ordenecao: ordenacao });
  }

}
