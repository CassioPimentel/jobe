import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PesquisaCidadePage } from './pesquisa-cidade';

@NgModule({
  declarations: [
    PesquisaCidadePage,
  ],
  imports: [
    IonicPageModule.forChild(PesquisaCidadePage),
  ],
})
export class PesquisaCidadePageModule {}
