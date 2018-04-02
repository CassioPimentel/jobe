import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VagaProvider } from './../../providers/vaga/vaga';
import { ModalController } from 'ionic-angular';
import { DetalheVagaPage } from "../detalhe-vaga/detalhe-vaga";

@IonicPage()
@Component({
  selector: 'page-vagas',
  templateUrl: 'vagas.html',
  providers: [ VagaProvider ]
})
export class VagasPage {
  
  public lista_vagas = new Array<any>();

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private vagaProvider: VagaProvider,
              public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VagasPage');
    
    this.vagaProvider.getVagas().subscribe(
          data=>{
            const response = (data as any);
            const objeto_retorno = JSON.parse(response._body);
            console.log(objeto_retorno);
            this.lista_vagas = objeto_retorno;
          }, error=>{
            console.log("error");
          }
      )
  }
  
  detalhe(id: string){
    let modal = this.modalCtrl.create(DetalheVagaPage, {id: id});
    modal.present();
  }

}
