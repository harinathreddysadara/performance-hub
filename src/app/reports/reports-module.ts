import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing-module';
import { Reports } from './reports/reports';

@NgModule({
  imports: [CommonModule, ReportsRoutingModule, Reports]  
})
export class ReportsModule {}
