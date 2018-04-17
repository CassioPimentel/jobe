import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class FavoritoProvider {

  constructor(private storage: Storage) {

  }

  insert(item: any){
    return this.storage.set(item._id, item);
  }

  save(item: any) {
    this.get(item._id).then(data => {
      if(data == null){
        this.insert(item);
        return 1;
      }else{
        this.remove(item._id);
        return 0;
      }
    });
  }

  remove(id: string){
    return this.storage.remove(id);
  }

  get(key: string){
    this.storage.get(key).then((val) => {
      console.log('Your age is', val);
    });
    //console.log(this.storage.get(key));
    return this.storage.get(key);
  }

  getAll(){
    let vagas: any[] = [];
 
    this.storage.forEach((value: any, key: string, iterationNumber: Number) => {
      let vaga: any;
      vaga = value;
      vagas.push(vaga);
    })

    return vagas;
  }

  

}
