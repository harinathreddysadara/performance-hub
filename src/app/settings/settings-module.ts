import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing-module';
import { Settings } from './settings/settings';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    Settings
  ]
})
export class SettingsModule {}
