import { Component } from '@angular/core';
import { ModalController, ToastController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PesquisaCidadePage } from '../pesquisa-cidade/pesquisa-cidade';
import { PesquisaVagaPage } from '../pesquisa-vaga/pesquisa-vaga';
import { VagasPage } from '../vagas/vagas';
import { ResultadoBuscaPage } from '../resultado-busca/resultado-busca';
import { Network } from '@ionic-native/network';
import { ConfiguracoesPage } from '../configuracoes/configuracoes';

@IonicPage()
@Component({
  selector: 'page-busca',
  templateUrl: 'busca.html'
})
export class BuscaPage {

  public lista_vagas = new Array<any>();
  public cidade : any;
  public titulo : any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private toast: ToastController){

    let cidade = navParams.get('cidade');  
    let titulo = navParams.get('titulo');  
                
    this.cidade = cidade;
    this.titulo = titulo;  
  }

  getCidade(){
    this.navCtrl.push(PesquisaCidadePage, { titulo: this.titulo });
  }
  
  buscaVagas(titulo: string, cidade: string){
    console.log(titulo);
    if(titulo == undefined){
      this.toast.create({ message: 'Digite a vaga', duration: 3000, position: 'botton' }).present();
      return;
    }

    if(cidade == undefined){
      this.toast.create({ message: 'Digite a cidade', duration: 3000, position: 'botton' }).present();
      return;
    }

     if(cidade.indexOf(',') != -1){
      cidade = cidade.substring(0, cidade.indexOf(','));
     }     

     this.navCtrl.push(ResultadoBuscaPage, { titulo : titulo, cidade : cidade });
  }

  getVaga(){
    this.navCtrl.push(PesquisaVagaPage, { cidade: this.cidade });
  }

  Configuracoes(){
    this.navCtrl.push(ConfiguracoesPage);
  }

}
