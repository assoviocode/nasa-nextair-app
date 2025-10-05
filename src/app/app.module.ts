import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { CommonModule, registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

registerLocaleData(ptBr);

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: JwtInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
