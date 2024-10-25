import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { taskReducer } from '../modules/task/presentation/states-management/task.reducer';
import { TaskEffect } from '../modules/task/presentation/states-management/task.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideStore(),
    provideState({
        name: "task",
        reducer: taskReducer
    }),
    provideEffects(TaskEffect),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
