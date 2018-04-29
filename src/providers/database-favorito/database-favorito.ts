import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { Vaga } from '../../pages/vagas/vaga';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseFavoritoProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(vaga: Vaga) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into favorito (_id , titulo , descricao , link, email, data, empresa, cidade, estado, setor, salario, escolaridade, salvo, dias) values (?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?,?, ?)';
        let data = [vaga._id, vaga.titulo, vaga.descricao, vaga.link, vaga.email, vaga.data, vaga.empresa, vaga.cidade,, vaga.estado, vaga.setor, vaga.salario, vaga.escolaridade, vaga.salvo, vaga.dias];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from favorito where _id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from favorito where _id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let vaga = new Vaga();
              vaga._id = item._id;
              vaga.titulo = item.titulo;
              vaga.descricao = item.descricao;
              vaga.link = item.link;
              vaga.email = item.email;
              vaga.data = item.data;

              vaga.empresa = item.empresa;
              vaga.cidade = item.cidade;
              vaga.estado = item.estado;
              vaga.setor = item.setor;

              vaga.salario = item.salario;
              vaga.escolaridade = item.escolaridade;
              vaga.salvo = item.salvo;
              vaga.dias = item.dias;

              return vaga;
            }
 
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM favorito';
        var data: any[];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let vagas: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var vaga = data.rows.item(i);
                vagas.push(vaga);
              }
              return vagas;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}
