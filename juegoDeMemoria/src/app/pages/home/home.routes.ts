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
        path: 'juego/:mode',
        loadComponent: () => import('../game/game.page').then((m)=>m.GamePage),
      }
    ]
  },


];