import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InformationComponent } from './pages/information/information.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ParametreComponent } from './pages/parametre/parametre.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'information',component:InformationComponent, canActivate:[AuthGuard] },
    {path:'login',component:SigninComponent},
    {path:'profile',component:ProfileComponent, canActivate:[AuthGuard]},
    {path:'parametre',component:ParametreComponent, canActivate:[AuthGuard]},
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
        , canActivate:[AuthGuard]
    }
];
