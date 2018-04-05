import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PesquisaCidadePage } from '../pesquisa-cidade/pesquisa-cidade';
import { PesquisaVagaPage } from '../pesquisa-vaga/pesquisa-vaga';
import { VagasPage } from '../vagas/vagas';

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
              public modalCtrl: ModalController){
                
    this.cidade = navParams.get('cidade');  
    this.titulo = navParams.get('titulo');    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscaPage');
  }
  
  getCidade(){
    this.navCtrl.push(PesquisaCidadePage);
  }
  
  buscaVagas(titulo: string, cidade: string){
     console.log(titulo);
     console.log(cidade);
     
     this.navCtrl.push(VagasPage, { titulo : titulo, cidade : cidade } );
  }

  getVaga(){
    this.navCtrl.push(PesquisaVagaPage);
  }

}
