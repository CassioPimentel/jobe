import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class BuscaProvider {

  constructor(private storage: Storage) {}

  insert(item: any){
    console.log(item);

    return this.storage.set('ultimaVaga', item);
  }

  save(item: any) {
    var result;
    return this.get('ultimaVaga');
    
  }

  remove(id: string){
    return this.storage.remove(id);
  }

  get(key: string){
    return this.storage.get(key);
  }
}
