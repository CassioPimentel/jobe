import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class VagaProvider {

  constructor(public http: HttpClient) {
    console.log('Hello VagaProvider Provider');
  }
  
  getVagas(){
    return this.http.get('https://apinodeempregos.herokuapp.com/vagas');
  }

}
