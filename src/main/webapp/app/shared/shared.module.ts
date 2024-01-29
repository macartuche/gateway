import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import FindLanguageFromKeyPipe from './language/find-language-from-key.pipe';
import TranslateDirective from './language/translate.directive';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';

import { JhMaterialModule } from './jh-material.module';
import { TreeModule } from '@odymaui/angular-tree-component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { NgxFileDropModule } from 'ngx-file-drop';

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
import { IconModule } from '@coreui/icons-angular';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getEspaniolPaginadorIntl } from './pagination/espaniol-paginador-intl';

/**
 * Application wide Module
 */
@NgModule({
  imports: [
    JhMaterialModule,
    AlertComponent,
    AlertErrorComponent,
    FindLanguageFromKeyPipe,
    TranslateDirective,
    TreeModule,
    NgxSpinnerModule,
    FullCalendarModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxMatSelectSearchModule,
    NgxMatTimepickerModule,
    NgxFileDropModule,
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
    NgScrollbarModule,
    IconModule,
  ],
  exports: [
    JhMaterialModule,
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    AlertComponent,
    AlertErrorComponent,
    TranslateModule,
    FindLanguageFromKeyPipe,
    TranslateDirective,
    TreeModule,
    NgxSpinnerModule,
    FullCalendarModule,
    NgMultiSelectDropDownModule,
    NgxMatSelectSearchModule,
    NgxMatTimepickerModule,
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
    NgScrollbarModule,
    IconModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: getEspaniolPaginadorIntl() }],
})
export default class SharedModule {}
