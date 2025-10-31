import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { Dashboard } from './dashboard/dashboard';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    Dashboard
  ]
})
export class DashboardModule {}
