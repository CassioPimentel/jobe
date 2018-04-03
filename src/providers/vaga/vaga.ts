//import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class VagaProvider {

  constructor(private http: Http) {
    console.log('Hello VagaProvider Provider');
  }
  
  getVagas(){
    return this.http.get('https://apinodeempregos.herokuapp.com/vagas');
  }
  
  getVaga(id: string){
    return this.http.get('https://apinodeempregos.herokuapp.com/vaga/' + id);
  }
  
  buscaVagas(titulo: string, cidade: string){
    return this.http.get('https://apinodeempregos.herokuapp.com/busca/' + titulo + '/' + cidade);
  }

}
