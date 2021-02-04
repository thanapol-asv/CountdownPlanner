import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./pages/privacy/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/privacy/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'countdown',
    loadChildren: () => import('./pages/countdown/countdown.module').then( m => m.CountdownPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'feed',
    loadChildren: () => import('./pages/feed/feed.module').then( m => m.FeedPageModule)
  },
  {
    path: 'fprofile',
    loadChildren: () => import('./pages/fprofile/fprofile.module').then( m => m.FprofilePageModule)
  },
  {
    path: 'follower',
    loadChildren: () => import('./pages/follower/follower.module').then( m => m.FollowerPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
