import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VagaProvider } from './../../providers/vaga/vaga';
import { ModalController } from 'ionic-angular';
import { DetalheVagaPage } from '../detalhe-vaga/detalhe-vaga';
import { FiltroPage } from '../filtro/filtro';
//import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-vagas',
  templateUrl: 'vagas.html',
  providers: [ VagaProvider ]
})
export class VagasPage {
  
  public lista_vagas = new Array<any>();
  titulo: string;
  cidade: string;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private vagaProvider: VagaProvider,
              public modalCtrl: ModalController,
              //private nativeStorage: NativeStorage
              ) {
                
    this.titulo = this.navParams.get('titulo');
    this.cidade = this.navParams.get('cidade');
  }

  ionViewDidLoad() {
    console.log(this.titulo);
    console.log(this.cidade);
    if(this.titulo != undefined && this.cidade != undefined){
      this.vagaProvider.buscaVagas(this.titulo, this.cidade).subscribe(
          data=>{
            const response = (data as any);
            const objeto_retorno = JSON.parse(response._body);
            this.lista_vagas = objeto_retorno;
            console.log(objeto_retorno);
          }, error=>{
            console.log("error");
          }
      )  
    }else{
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

  }
  
  detalhe(id: string){
    let modal = this.modalCtrl.create(DetalheVagaPage, {id: id});
    modal.present();
  }
  
  filtro(){
    let modal = this.modalCtrl.create(FiltroPage);
    modal.present();
  }
 
  salvarFavorito(item: any){
    console.log(item);
    /*this.nativeStorage.setItem('vaga', {item: item})
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
      
    this.nativeStorage.getItem('vaga')
      .then(
        data => console.log(data),
        error => console.error(error)
      );
    */
  }

}