import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultadoBuscaPage } from './resultado-busca';

@NgModule({
  declarations: [
    ResultadoBuscaPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultadoBuscaPage),
  ],
})
export class ResultadoBuscaPageModule {}
