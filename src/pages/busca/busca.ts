import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PesquisaCidadePage } from '../pesquisa-cidade/pesquisa-cidade';
import { VagasPage } from '../vagas/vagas';

@IonicPage()
@Component({
  selector: 'page-busca',
  templateUrl: 'busca.html'
})
export class BuscaPage {

  public lista_vagas = new Array<any>();
  public cidade : any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController){
                
    this.cidade = navParams.get('lista');   
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscaPage');
  }
  
  getCidade(){
    let modal = this.modalCtrl.create(PesquisaCidadePage);
    modal.present();
  }
  
  buscaVagas(titulo: string, cidade: string){
     console.log(titulo);
     console.log(cidade);
     
     this.navCtrl.push(VagasPage, { titulo : titulo, cidade : cidade } );
  }

}
