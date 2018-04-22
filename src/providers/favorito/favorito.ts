import { Injectable, keyframes } from '@angular/core';
import { Storage } from '@ionic/storage';
import { resolveDefinition } from '@angular/core/src/view/util';
import { Observable } from 'rxjs/Observable';
import { AnonymousSubject } from 'rxjs/Subject';

@Injectable()
export class FavoritoProvider {

  value : any;

  constructor(private storage: Storage) {

  }

  insert(item: any){
    console.log(item);
    return this.storage.set(item._id, item);
  }

  save(item: any) {
    this.get(item._id).then(data => {
      if(data == null){
        this.insert(item);
      }else{
        this.remove(item._id);
      }
    });
  }

  remove(id: string){
    return this.storage.remove(id);
  }

  removeAll(){
    this.storage.clear();
  }

  get(key: string){
    return this.storage.get(key);
  }

  getItem(key: string) {
    return this.storage.get(key);
  }

  getAll(){
    let vagas: any[] = [];
 
    this.storage.forEach((value: any, key: string, iterationNumber: Number) => {
      let vaga: any;
      vaga = value;
      if(key != 'ultimaVaga'){
        vagas.push(vaga);
      }
    })

    return vagas;
  }

  

}
