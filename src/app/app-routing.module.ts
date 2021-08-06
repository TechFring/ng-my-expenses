import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Layouts
import { AnonymousComponent } from './layouts/anonymous/anonymous.component';
import { AuthenticatedComponent } from './layouts/authenticated/authenticated.component';

// Views
import { ExpensesHomeComponent } from './views/expenses/expenses-home/expenses-home.component';
import { ExpensesFormComponent } from './views/expenses/expenses-form/expenses-form.component';
import { SettingsComponent } from './views/settings/settings.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'expenses', pathMatch: 'full' },
  {
    path: '',
    component: AuthenticatedComponent,
    children: [
      { path: 'expenses', component: ExpensesHomeComponent },
      { path: 'expenses/new', component: ExpensesFormComponent },
      { path: 'expenses/edit/:id', component: ExpensesFormComponent },
      { path: 'settings', component: SettingsComponent },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: AnonymousComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
