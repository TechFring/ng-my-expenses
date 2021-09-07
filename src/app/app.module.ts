// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// 3rd Party
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxCurrencyModule } from 'ngx-currency';
import { SocialLoginModule } from 'angularx-social-login';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Layouts
import { AppComponent } from './app.component';
import { AnonymousComponent } from './layouts/anonymous/anonymous.component';
import { AuthenticatedComponent } from './layouts/authenticated/authenticated.component';

// Views
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ExpensesHomeComponent } from './views/expenses/expenses-home/expenses-home.component';
import { ExpensesFormComponent } from './views/expenses/expenses-form/expenses-form.component';
import { SettingsComponent } from './views/settings/settings.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';

// Components
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { WhereYourMoneyGoComponent } from './components/where-your-money-go/where-your-money-go.component';
import { InputComponent } from './components/form/input/input.component';
import { SelectComponent } from './components/form/select/select.component';
import { TextareaComponent } from './components/form/textarea/textarea.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

// Pipes
import { FormatMonthPipe } from './pipes/format-month.pipe';

// Providers
import { httpInterceptorProviders } from './providers/http-interceptors';
import { socialAuthProviders } from './providers/social-auth/index';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ExpensesHomeComponent,
    FormatMonthPipe,
    WhereYourMoneyGoComponent,
    AnonymousComponent,
    AuthenticatedComponent,
    HomeComponent,
    SettingsComponent,
    ExpensesFormComponent,
    InputComponent,
    SelectComponent,
    TextareaComponent,
    NavbarComponent,
    LoginComponent,
    FooterComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,

    NgApexchartsModule,
    NgxCurrencyModule,
    SocialLoginModule,

    BrowserAnimationsModule,
  ],
  providers: [socialAuthProviders, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
