import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterFeatures, TitleStrategy, provideRouter, withComponentInputBinding, withDebugTracing } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import './config/dayjs';
import { TranslationModule } from 'app/shared/language/translation.module';
import { httpInterceptorProviders } from 'app/core/interceptor/index';
import routes from './app.routes';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { NgbDateDayjsAdapter } from './config/datepicker-adapter';
import { AppPageTitleStrategy } from './app-page-title-strategy';
import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { provideToastr } from 'ngx-toastr';

const routerFeatures: Array<RouterFeatures> = [withComponentInputBinding()];
if (DEBUG_INFO_ENABLED) {
  routerFeatures.push(withDebugTracing());
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, ...routerFeatures),
    importProvidersFrom(BrowserModule),
    // Set this to true to enable service worker (PWA)
    importProvidersFrom(ServiceWorkerModule.register('ngsw-worker.js', { enabled: false })),
    importProvidersFrom(TranslationModule),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom([
      SidebarModule,
      AvatarModule,
      BadgeModule,
      BreadcrumbModule,
      ButtonGroupModule,
      ButtonModule,
      CardModule,
      DropdownModule,
      FooterModule,
      FormModule,
      GridModule,
      HeaderModule,
      ListGroupModule,
      NavModule,
      ProgressModule,
      TabsModule,
      UtilitiesModule,
    ]),
    importProvidersFrom(NgScrollbarModule),
    provideToastr(), // Toastr providers
    Title,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: NgbDateAdapter, useClass: NgbDateDayjsAdapter },
    httpInterceptorProviders,
    { provide: TitleStrategy, useClass: AppPageTitleStrategy },
    // jhipster-needle-angular-add-module JHipster will add new module here
  ],
};
