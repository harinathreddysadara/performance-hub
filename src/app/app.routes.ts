import { Route } from '@angular/router';

export const routes: Route[] = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard-module').then((m) => m.DashboardModule),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports/reports-module').then((m) => m.ReportsModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings-module').then((m) => m.SettingsModule),
  },
];
