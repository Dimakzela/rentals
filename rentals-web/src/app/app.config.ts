import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient} from "@angular/common/http";
import {environment} from "./environments/environment";
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {provideAuth, getAuth, connectAuthEmulator} from '@angular/fire/auth';
import {FIREBASE_OPTIONS} from '@angular/fire/compat';


export const appConfig: ApplicationConfig = {
    providers: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => {
            const auth = getAuth();
            if (!environment.production) {
                connectAuthEmulator(auth, 'http://localhost:9099/', {
                    disableWarnings: true,
                });
            }
            return auth;
        }),
        {provide: FIREBASE_OPTIONS, useValue: environment.firebase},
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideAnimationsAsync(),
        provideHttpClient(),
    ]
};

