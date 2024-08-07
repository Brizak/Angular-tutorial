import { enableProdMode, importProvidersFrom, inject } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { AuthGuard } from './app/auth.guard';
import { provideRouter, Routes } from '@angular/router';
import { InMomoryDataService } from './app/in-momory-data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AuthService } from './app/auth.service';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: '',
        canActivate: [AuthGuard],
        // canActivate: [() => inject(AuthService).isLoggedIn()]
        loadChildren: () => import("./app/pokemon/pokemon.routes"),
    },
    {
        path: 'login',
        title: 'Login',
        loadComponent: () => import("./app/login/login.component").then((module) => module.LoginComponent),
    },
    {
        path: '**',
        title: 'Page not found',
        loadComponent: () => import("./app/page-not-found/page-not-found.component").then((module) => module.PageNotFoundComponent),
    },
];


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        importProvidersFrom(BrowserModule, FormsModule, HttpClientInMemoryWebApiModule.forRoot(InMomoryDataService, {
            dataEncapsulation: false,
        })),
        provideRouter(routes)
    ]
})
  .catch(err => console.error(err));
