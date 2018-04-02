import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CidadeProvider } from './../../providers/cidade/cidade';

@IonicPage()
@Component({
  selector: 'page-pesquisa-cidade',
  templateUrl: 'pesquisa-cidade.html',
  providers: [ CidadeProvider ]
})
export class PesquisaCidadePage {

  public lista_cidades = new Array<any>();

  constructor(public navCtrl: NavController,
              private cidadeProvider: CidadeProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PesquisaCidadePage');
  }
  
  getItems(ev: any){
    let val = ev.target.value;
    
    this.cidadeProvider.getCidade(val).subscribe(
          data=>{
            const response = (data as any);
            const objeto_retorno = JSON.parse(response._body);
            console.log(objeto_retorno.predictions);
            this.lista_cidades = objeto_retorno.predictions;
            return this.lista_cidades;
          }, error=>{
            console.log("error");
          }
      )
  }

}
