// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// 3rd Party
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxCurrencyModule } from 'ngx-currency';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
} from 'angularx-social-login';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Layouts
import { AppComponent } from './app.component';
import { AnonymousComponent } from './layouts/anonymous/anonymous.component';
import { AuthenticatedComponent } from './layouts/authenticated/authenticated.component';

// Views
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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    NgApexchartsModule,
    NgxCurrencyModule,
    SocialLoginModule,

    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '491837092561-ak236loph6jtnf0beh307e2724feq2s1.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
