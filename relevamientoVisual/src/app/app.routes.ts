import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.Login),
  },
  {
    path: 'splash',
    loadComponent: () => import('./pages/splash/splash.page').then((m) => m.SplashPage),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.routes').then((m) => m.routes),
  },
  {
    path: 'statistics',
    loadComponent: () => import('./pages/statistics/statistics.page').then( m => m.StatisticsPage)
  },
  {
    path: 'user-photos',
    loadComponent: () => import('./pages/user-photos/user-photos.page').then( m => m.UserPhotosPage)
  },
];