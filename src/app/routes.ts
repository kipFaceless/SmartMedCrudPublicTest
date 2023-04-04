import { Route } from '@angular/router';

export const ROUTES: Route[] = [
{ path: 'customer', loadChildren: () => import ('./components/customer/customer.module').then(m => m.CustomerModule)},
{ path: '', loadChildren: () => import ('./components/customer/customer.module').then(m => m.CustomerModule)}
];
