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
    //this.storage.get(key).then(function(value) {
      // This code runs once the value has been loaded
      // from the offline store.
    //  console.log(value);
    //  return value;
    //}).catch(function(err) {
      // This code runs if there were any errors
    //  console.log(err);
    //});

    return this.storage.get(key);
    
    //return new Promise(resolve => {
    // this.storage.get(key).then((data) => {
    //    if(data == null){
    //      resolve(1);
    //    }else{
    //      resolve(0);
    //    }
        
    //  });
    //})
  }

  getAll(){
    let vagas: any[] = [];
 
    this.storage.forEach((value: any, key: string, iterationNumber: Number) => {
      let vaga: any;
      vaga = value;
      console.log(value);
      vagas.push(vaga);
    })

    return vagas;
  }

  

}
