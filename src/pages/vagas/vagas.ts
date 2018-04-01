import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VagaProvider } from './../../providers/vaga/vaga';

@IonicPage()
@Component({
  selector: 'page-vagas',
  templateUrl: 'vagas.html',
   providers: [ VagaProvider ]
})
export class VagasPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private vagaProvider: VagaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VagasPage');
    
    this.vagaProvider.getVagas().subscribe(
          data=>{
            const response = (data as any);
            const objeto_retorno = JSON.parse(response._body);
            console.log(objeto_retorno);
          }, error=>{
            console.log("error");
          }
      )
  }

}
