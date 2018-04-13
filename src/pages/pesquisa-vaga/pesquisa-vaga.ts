import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VagaProvider } from './../../providers/vaga/vaga';
import { BuscaPage } from '../busca/busca';

@IonicPage()
@Component({
  selector: 'page-pesquisa-vaga',
  templateUrl: 'pesquisa-vaga.html',
  providers: [ VagaProvider ]
})
export class PesquisaVagaPage {

  public lista_vagas = new Array<any>();
  public cidade : any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private vagaProvider: VagaProvider) {
    this.cidade = navParams.get('cidade');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PesquisaVagaPage');
  }

  getItems(ev: any){
    let val = ev.target.value;
    
    this.vagaProvider.getNomeVaga(val).subscribe(
          data=>{
            const response = (data as any);
            const objeto_retorno = JSON.parse(response._body);
            console.log(objeto_retorno);
            this.lista_vagas = objeto_retorno;
            return this.lista_vagas;
          }, error=>{
            console.log("error");
          }
      )
  }

  close(){
    this.navCtrl.pop();
  }
  
  SelectVaga(titulo: string){
    this.navCtrl.push(BuscaPage, {
      titulo: titulo,
      cidade: this.cidade
    });
  }

}
