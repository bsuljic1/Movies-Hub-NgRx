import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { HeaderComponent } from './components/header/header.component';
import { MegaMenuModule } from 'primeng/megamenu';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MegaMenuModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}