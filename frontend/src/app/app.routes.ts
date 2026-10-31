import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
    },
    {
        path: 'search',
        loadComponent: () => import('./features/paper-search/paper-search')
            .then(m => m.PaperSearch)
    }
];
