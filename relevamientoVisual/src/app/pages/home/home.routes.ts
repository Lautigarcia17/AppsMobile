import { Routes } from '@angular/router';
import { HomeLayoutPage } from './home-layout/home-layout.page';



export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutPage,
    children: [
      {
        path: '',
        loadComponent: () => import('./home/home.page').then((m)=>m.HomePage),
      },
      {
        path: 'statistics',
        loadComponent: () => import('../statistics/statistics.page').then((m)=>m.StatisticsPage),
      },
      {
        path: 'user-photos',
        loadComponent: () => import('../user-photos/user-photos.page').then((m)=>m.UserPhotosPage),
      }
    ]
  },


];