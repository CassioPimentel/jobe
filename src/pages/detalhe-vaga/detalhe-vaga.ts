import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VagaProvider } from './../../providers/vaga/vaga';

@IonicPage()
@Component({
  selector: 'page-detalhe-vaga',
  templateUrl: 'detalhe-vaga.html',
  providers: [ VagaProvider ]
})
export class DetalheVagaPage {

  _id : any;
  vaga : any;

  constructor(public navCtrl: NavController, 
              private vagaProvider: VagaProvider,
              public navParams: NavParams){
    this._id = navParams.get('id');           
  }
  
  close(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    this.vagaProvider.getVaga(this._id).subscribe(
          data=>{
            const response = (data as any);
            const objeto_retorno = JSON.parse(response._body);
            console.log(objeto_retorno);
            this.vaga = objeto_retorno;
          }, error=>{
            console.log("error");
          }
      )
  }

}
