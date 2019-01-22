import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { ProfileComponent } from './profile/profile.component';

const dashboardRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: 'overview', component: OverviewComponent },
    { path: 'profile', component: ProfileComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }