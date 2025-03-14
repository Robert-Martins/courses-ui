import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, provideNativeDateAdapter } from '@angular/material/core';

export const CUSTOM_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'YYYY-MM-DD HH:mm:ss',
  },
  display: {
    dateInput: 'YYYY-MM-DD HH:mm:ss',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ]
};
