import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VagaProvider } from './../../providers/vaga/vaga';
import { FavoritoProvider } from './../../providers/favorito/favorito';
import { ModalController } from 'ionic-angular';
import { DetalheVagaPage } from '../detalhe-vaga/detalhe-vaga';
import { FiltroPage } from '../filtro/filtro';
import { PaginaCompartilharPage } from '../pagina-compartilhar/pagina-compartilhar';
import { reorderArray } from 'ionic-angular';
import { Vaga } from './vaga';

@IonicPage()
@Component({
  selector: 'page-vagas',
  templateUrl: 'vagas.html',
  providers: [ VagaProvider, FavoritoProvider ]
})
export class VagasPage {
  
  public lista_vagas = new Array<any>();
  titulo: string;
  cidade: string;
  salvo: any;
  vaga: Vaga;
  public vagas = new Array<Vaga>();
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private vagaProvider: VagaProvider,
              private favoritoProvider: FavoritoProvider,
              public modalCtrl: ModalController
              ) {
                
    this.titulo = this.navParams.get('titulo');
    this.cidade = this.navParams.get('cidade');
  }

  public sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 0 : 1));
    });
  }

  reorderItems(indexes) {
    let element = this.lista_vagas[indexes.from];
    this.lista_vagas.splice(indexes.from, 1);
    this.lista_vagas.splice(indexes.to, 0, element);
  }

  ionViewDidLoad() {
    if(this.titulo != undefined && this.cidade != undefined){
      this.vagaProvider.buscaVagas(this.titulo, this.cidade).subscribe(
          data=>{
            const response = (data as any);
            const objeto_retorno = JSON.parse(response._body);

            for(var item in objeto_retorno) {

              //this.favoritoProvider.get(item["_id"]).then(data => {
              //  if(data == null){
              //    console.log('entrou data null');
              //    this.vaga.salvo = 1;
              //  }else{
              //    this.vaga.salvo = 0;
              //    console.log('entrou data null');
              //  }
              //});

              this.vaga.userId = item["_id"];
              this.vaga.titulo = item["titulo"];
              this.vaga.setor = item["setor"];
              this.vaga.salario = item["salario"];
              this.vaga.link = String(item["link"]);
              this.vaga.estado = item["estado"];
              this.vaga.cidade = item["cidade"];
              this.vaga.data = item["data"];
              this.vaga.descricao = item["descricao"];
              this.vaga.email = item["email"];
              this.vaga.empresa = item["empresa"];
              this.vaga.escolaridade = item["escolaridade"];

              this.vagas.push(this.vaga);
          }   

          console.log(this.vagas);
          this.lista_vagas = this.vagas;  

          }, error=>{
            console.log("error");
          }
      )  
    }else{
      this.vagaProvider.getVagas().subscribe(
        data=>{
          const response = (data as any);
          const objeto_retorno = JSON.parse(response._body);
          this.lista_vagas = objeto_retorno;

          for(var item in objeto_retorno) {
              console.log(objeto_retorno[item]["_id"]);
              var vaga = new Vaga();

              this.favoritoProvider.get(objeto_retorno[item]["_id"]).then(data => {
                console.log(data);
                if(data == null){
                  //console.log('entrou data 1');
                  vaga.salvo = 1;
                }else{
                  vaga.salvo = 0;
                 // console.log('entrou data 2');
                }
              });

              vaga.userId = objeto_retorno[item]["_id"];
              vaga.titulo = objeto_retorno[item]["titulo"];
              vaga.setor = objeto_retorno[item]["setor"];
              vaga.salario = objeto_retorno[item]["salario"];
              vaga.link = String(objeto_retorno[item]["link"]);
              vaga.estado = objeto_retorno[item]["estado"];
              vaga.cidade = objeto_retorno[item]["cidade"];
              vaga.data = objeto_retorno[item]["data"];
              vaga.descricao = objeto_retorno[item]["descricao"];
              vaga.email = objeto_retorno[item]["email"];
              vaga.empresa = objeto_retorno[item]["empresa"];
              vaga.escolaridade = objeto_retorno[item]["escolaridade"];

              this.vagas.push(vaga);
          }   

          this.favoritoProvider.getAll();

          //console.log(this.vagas);
          this.lista_vagas = this.vagas; 

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

  PaginaCompartilhar(){
    let modal = this.modalCtrl.create(PaginaCompartilharPage);
    modal.present();
  }
 
  salvarFavorito(item: any){
    this.salvo = this.favoritoProvider.save(item);
  }

}