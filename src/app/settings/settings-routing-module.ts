import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Settings } from './settings/settings';

const routes: Routes = [
  { path: '', component: Settings }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
