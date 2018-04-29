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
                
    let cidade = navParams.get('cidade');  
    let titulo = navParams.get('titulo');  
                
    this.cidade = cidade;
    this.titulo = titulo;  
  }

  getCidade(){
    this.navCtrl.push(PesquisaCidadePage, { titulo: this.titulo });
  }
  
  buscaVagas(titulo: string, cidade: string){
     if(cidade.indexOf(',') != -1){
      cidade = cidade.substring(0, cidade.indexOf(','));
     } 

     this.navCtrl.push(VagasPage, { titulo : titulo, cidade : cidade } );
     this.navCtrl.parent.select(1);
  }

  getVaga(){
    this.navCtrl.push(PesquisaVagaPage, { cidade: this.cidade });
  }

}
