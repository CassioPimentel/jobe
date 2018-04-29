import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }

  public getDB() {
    return this.sqlite.create({
      name: 'favoritos.db',
      location: 'default'
    });
  }

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
 
        // Criando as tabelas
        this.createTables(db);
 
        // Inserindo dados padrão
        this.insertDefaultItems(db);
 
      })
      .catch(e => console.log(e));
  }

  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS favorito _id TEXT, titulo TEXT, descricao TEXT, link TEXT, email TEXT, data TEXT, empresa TEXT, cidade TEXT, estado TEXT, setor TEXT, salario TEXT, escolaridade TEXT, salvo NUMBER, dias TEXT']
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  private insertDefaultItems(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from categories', {})
    .then((data: any) => {
      //Se não existe nenhum registro
      if (data.rows.item(0).qtd == 0) {
 
        // Criando as tabelas
        db.sqlBatch([
          ['insert into categories (name) values (?)', ['Hambúrgueres']],
          ['insert into categories (name) values (?)', ['Bebidas']],
          ['insert into categories (name) values (?)', ['Sobremesas']]
        ])
          .then(() => console.log('Dados padrões incluídos'))
          .catch(e => console.error('Erro ao incluir dados padrões', e));
 
      }
    })
    .catch(e => console.error('Erro ao consultar a qtd de categorias', e));
  } 

}
